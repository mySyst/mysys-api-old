import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class AllInboxController extends BaseController {
  @Get('inbox')
  public async getInboxForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    const clarify = req.query.clarify;
    console.log(clarify);

    if (req.context?.userId) {
      try {
        const demands: Array<Demand> = await Demand.find({
          userId: req.context?.userId,
          trash: false,
          completed: false,
          project: false,
          classification: '',
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
