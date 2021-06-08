import { ClassMiddleware, Controller, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand, DemandsModel } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';
import { type } from 'node:os';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class ClarifyDemand extends BaseController {
  @Put(':id')
  public async editADemand(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { project, idProject } = req.body;

    if (idProject === '') {
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

      if (typeof demand?.level !== 'undefined') {
        console.log('que merda');

        const levelOfDemand = demand?.level;

        if (project === true && demand?.level < 2) {
          console.log('deu erro');
          // elevando o nível do projeto pai
          const newLevel = levelOfDemand + 1;
          try {
            const project = await Demand.findOneAndUpdate(
              { _id: id },
              { level: newLevel },
              { new: true }
            );
            res.status(200).send({ code: 200, msg: 'Action successfully accomplished' });
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
}
