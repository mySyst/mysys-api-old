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
            id: 1,
            title: 'Comprar leite',
            description: 'Compras para tomar café da tarde',
          },
          {
            id: 2,
            title: 'Comprar Café',
            description: 'Compras para tomar café da tarde',
          },
        ],
      },
    ]);
  }
}
