import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';
import { Demand } from '@src/models/demand';

@Controller('projects')
@ClassMiddleware(authMiddleware)
export class AllDemandsOfProjectController extends BaseController {
  @Get(':id')
  public async getAllDemandsOfProjectForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const demands: Array<Demand> = await Demand.find({
        idProject: req.params.id,
        userId: req.context?.userId,
      });
      console.log('The demands the project ', demands);
      res.status(200).send(demands);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
