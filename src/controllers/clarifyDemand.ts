import { ClassMiddleware, Controller, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class ClarifyDemand extends BaseController {
  @Put(':id')
  public async editADemand(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { project, idProject } = req.body;

    if ((idProject !== ''|| idProject !== undefined) && project !== true)  {
      try {
        const upDemand = await Demand.findOneAndUpdate({ _id: id }, req.body, {
          new: true,
        });
        res.status(200).send(upDemand);
        console.log(upDemand);
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    } else {
      // procurando a demand_projeto
      const demand = await Demand.findById({
        _id: idProject,
      });

        if (project === true && demand?.level < 2) {
          // elevando o nível do projeto pai
          const newLevel = demand?.level + 1;
          try {
            const mostrar = await Demand.findOneAndUpdate(
              { _id: id },
              { level: newLevel },
              { new: true }
            );
            res
              .status(200)
              .send({ code: 200, msg: 'Action successfully accomplished' });
          } catch (error) {
            this.sendCreateUpdateErrorResponse(res, error);
          }
        } else {
          res
            .status(203)
            .send({ code: 203, error: 'This action is not authorized' });
        }
      
    }
  }
}
