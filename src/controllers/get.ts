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
    const clarify = req.query.clarify;
    const completed = req.query.completed == 'true';

    if (req.context?.userId) {
      try {
        const demands: Array<Demand> = await Demand.find({
          userId: req.context?.userId,
        });
        const demandsFiltered = demands.filter(
          (i) =>
            i.classification === clarify &&
            i.completed === completed &&
            i.project === false &&
            i. trash === false
        );
        res.status(200).send(demandsFiltered);
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    }
  }
}
