import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Project, ProjectModel } from '@src/models/project';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';
import { Demand } from '@src/models/demand';

@Controller('projects')
@ClassMiddleware(authMiddleware)
export class DemandsOfProjectController extends BaseController {
  @Get(':idProject')
  public async getAllDemandsOfProjectsForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    const { idProject } = req.params;
    console.log(req.params);
    try {
      const thisProject: ProjectModel = await Project.findOne({
        _id: idProject
      });
      console.log(thisProject._id)
      console.log(idProject)

      const id = thisProject._id
      const user = req.context?.userId

      if (id == idProject) {
        const demands: Array<Demand> = await Demand.find({
          userId: user,
          idProject: id
        }).exec();
        console.log('The demands ', demands);
        res.status(200).send(demands);
      } else {
        res.status(500).json({error: "not found"});
      }
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
