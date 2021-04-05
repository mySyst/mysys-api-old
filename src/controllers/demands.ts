import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
import mongoose from 'mongoose';
import { authMiddleware } from '@src/middlewares/auth';

@Controller('demands')
@ClassMiddleware(authMiddleware)
export class DemandsController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const demand = new Demand({ ...req.body, ...{ user: req.decoded?.id } });
      const result = await demand.save();
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: error.message });
      } else {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
