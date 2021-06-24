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
    const corpo = req.body;

    if (!project && idProject === '') {
      try {
        const upDemand = await Demand.findOneAndUpdate({ _id: id }, req.body, {
          new: true,
        });
        res.status(200).send(upDemand);
        console.log(upDemand);
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    } else if (project && idProject === '') {
      try {
        const project = await Demand.findOneAndUpdate({ _id: id }, req.body, {
          new: true,
        });

        res.status(200).send(project);
      } catch (error) {
        res.status(404).send({ code: 404, error: 'Not found' });
      }
    } else if (idProject !== '' && idProject !== null) {
      if (project) {
        try {
          const parent = await Demand.findById({ _id: idProject });

          if (parent?.level !== undefined && parent?.level < 2) {
            const projectOfProject = await Demand.findOneAndUpdate(
              { _id: id },
              { ...corpo, ...{ level: parent?.level + 1 } },
              { new: true }
            );
            res.status(200).send(projectOfProject);
          } else {
            res
              .status(203)
              .send({ code: 203, error: 'This action is not authorized' });
          }
        } catch (error) {
          res.status(404).send({ code: 404, error: 'Not found' });
        }
      } else {
        try {
          const upDemand = await Demand.findOneAndUpdate(
            { _id: id },
            req.body,
            {
              new: true,
            }
          );
          res.status(200).send(upDemand);
        } catch (error) {
          res.status(404).send({ code: 404, error: 'Not found' });
        }
      }
    }
  }
}
