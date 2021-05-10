import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class AllDemandsController extends BaseController {
  @Get('')
  public async getAllDemandsForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    console.log(req.context);
    try {
      const demands: Array<Demand> = await Demand.find({
        userId: req.context?.userId,
      });
      console.log('The demands ', demands);
      res.status(200).send(demands);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
