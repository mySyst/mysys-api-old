import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';
import { Demand } from '@src/models/demand';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class AllProjectsController extends BaseController {
  @Get('projects')
  public async getAllProjectsForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    const info = req.body;
    console.log(info.project);
    try {
      const demands: Array<Demand> = await Demand.find({
        project: true,
        userId: req.context?.userId,
      });
      console.log('The demands the project ', demands);
      res.status(200).send(demands);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
