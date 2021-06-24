import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class GetController extends BaseController {
  @Get('get')
  public async getForLoggedUser(req: Request, res: Response): Promise<void> {
    // const { clarify, completed } = req.query;
    const clarify = req.query.clarify;
    const completed = req.query.completed;

    if (req.context?.userId) {
      try {
        const demands: Array<Demand> = await Demand.find({
          userId: req.context?.userId,
          trash: false,
          project: false,
          completed: completed,
          classification: clarify,
        });
        console.log('The Inbox', demands);
        res.status(200).send(demands);
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    } else {
      res.status(404).send({ code: 404, error: 'Not found' });
    }
  }
}
