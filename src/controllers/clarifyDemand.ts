import { ClassMiddleware, Controller, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
// import { Project } from '@src/models/project';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class ClarifyDemand extends BaseController {
  @Put(':id')
  public async editADemand(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    // if (info.project == true) {
    //   try {
    //     const isAProject = new Project({
    //       ...req.body,
    //       ...{ userId: req.context?.userId },
    //     });
    //     const newProject = await isAProject.save();
    //     res.status(201).send(newProject);
    //     try {
    //       await Demand.findByIdAndRemove({ _id: id });
    //     } catch (error) {
    //       this.sendCreateUpdateErrorResponse(res, error);
    //     }
    //   } catch (error) {
    //     this.sendCreateUpdateErrorResponse(res, error);
    //   }
    // } else {
      try {
        const upDemand = await Demand.findOneAndUpdate({ _id: id }, req.body, {
          new: true,
        });
        res.status(200).send(upDemand);
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    // }
  }
}
