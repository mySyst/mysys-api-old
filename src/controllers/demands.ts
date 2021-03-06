import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('demands')
@ClassMiddleware(authMiddleware)
export class DemandsController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const demand = new Demand({
        ...req.body,
        ...{ userId: req.context?.userId },
      });
      const newDemand = await demand.save();
      res.status(201).send(newDemand);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
