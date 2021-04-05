import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demands } from '@src/models/demands'

@Controller('demands')
export class DemandsController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const demand = new Demands(req.body);
    const result = await demand.save();
    res.status(201).send(result);
  }
}