import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Project } from '@src/models/project';
import { Demand } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('project')
@ClassMiddleware(authMiddleware)
export class ProjectsController extends BaseController {
  // @Post(':id')
  // public async create(req: Request, res: Response): Promise<void> {
  //   const { id, demands } = req.body;
  //   console.log(demands)
  //   try {
  //     const demandOfProject = new Project({
  //       ...req.body,
  //       ...{ userId: req.context?.userId },
  //     });
  //     const newDemandOfProject = await Project.findOneAndUpdate(
  //       { _id: id },
  //       { $push: { demand: Demand || ArrayOperator<(Demand || undefined)[]> | undefined = demandOfProject } }
  //     );
  //     res.status(201).send(newDemandOfProject);
  //   } catch (error) {
  //     this.sendCreateUpdateErrorResponse(res, error);
  //   }
  // }
}
