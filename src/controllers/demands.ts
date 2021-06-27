import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand, Clarify } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('demands')
@ClassMiddleware(authMiddleware)
export class DemandsController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const title = req.body.title;

    if (title) {
      try {
        const demand = new Demand({
          ...req.body,
          ...{
            trash: false,
            completed: false,
            project: false,
            classification: '',
          },
          ...{ userId: req.context?.userId },
        });
        const newDemand = await demand.save();
        res.status(201).send(newDemand);
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    } else {
      res
        .status(203)
        .send({ code: 203, error: 'The title is required' });
    }
  }
}
