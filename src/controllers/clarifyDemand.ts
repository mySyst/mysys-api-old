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

    console.log(req.body);
    console.log(req.context?.userId);
    console.log(idProject);

    if (!project && idProject === '') {
      console.log('é demanda');

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
      console.log('é um projeto');

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
        console.log('é um projeto filho');

        try {
          const parent = await Demand.findById({ _id: idProject });

          console.log(parent?.level);

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
        console.log('apenas um filho');

        try {
          const upDemand = await Demand.findOneAndUpdate(
            { _id: id },
            req.body,
            {
              new: true,
            }
          );
          res.status(200).send(upDemand);
          console.log(upDemand);
        } catch (error) {
          res.status(404).send({ code: 404, error: 'Not found' });
        }
      }
    }
  }

  //     console.log(levelOfProject);

  //     if (project && demandProject?.level < 2) {
  //       // elevando o nível do projeto pai
  //       const newLevel = demandProject?.level + 1;
  //       try {
  //         await Demand.findOneAndUpdate(
  //           { _id: id },
  //           { ...corpo, ...{ level: newLevel } },
  //           {
  //             new: true,
  //           }
  //         );
  //         res
  //           .status(200)
  //           .send({ code: 200, msg: 'Action successfully accomplished' });
  //       } catch (error) {
  //         console.log("catch1")
  //         this.sendCreateUpdateErrorResponse(res, error);
  //       }
  //     } else {
  //       res
  //         .status(203)
  //         .send({ code: 203, error: 'This action is not authorized' });
  //     }

  //   if (demand?.level) {

  //     if (project === true && levelOfProject < 2) {
  //       // elevando o nível do projeto pai
  //       const newLevel = levelOfProject + 1;
  //       try {
  //         await Demand.findOneAndUpdate(
  //           { _id: id },
  //           { level: newLevel },
  //           { new: true }
  //         );
  //         res
  //           .status(200)
  //           .send({ code: 200, msg: 'Action successfully accomplished' });
  //       } catch (error) {
  //         this.sendCreateUpdateErrorResponse(res, error);
  //       }
  //     } else {
  //       res
  //         .status(203)
  //         .send({ code: 203, error: 'This action is not authorized' });
  //     }
  //   } else {
  //     res
  //         .status(203)
  //         .send({ code: 203, error: 'hello' });
  //   }
  // }
}
