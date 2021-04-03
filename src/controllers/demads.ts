import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller("demand")
export class DemandsController {
  @Get("")
  public getDemandsForLoggedUser(_: Request, res: Response): void {
    res.send([
      {
        demand: [
          {
            id: 1,
            title: "Comprar leite",
            description: "Compras para tomar café da tarde",
            time: "2021-04-02T08:00+00:00",
          },
          {
            id: 2,
            title: "Comprar Café",
            description: "Compras para tomar café da tarde",
            time: "2021-04-02T09:00+00:00",
          },
        ],
      },
    ]);
  }
}
