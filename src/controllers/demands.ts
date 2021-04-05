import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand'

@Controller('demands')
export class DemandsController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const demand = new Demand(req.body);
    const result = await demand.save();
    res.status(201).send(result);
  }
}