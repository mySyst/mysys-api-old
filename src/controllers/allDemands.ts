import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('alldemands')
export class AllDemandsController {
  @Get('')
  public getAllDemandsForLoggedUser(_: Request, res: Response): void {
    res.send([
      {
        demands: [
          {
            title: 'Comprar leite',
            description: 'Compras para tomar café da tarde',
          },
          {
            title: 'Comprar Café',
            description: 'Compras para tomar café da tarde',
          },
        ],
      },
    ]);
  }
}
