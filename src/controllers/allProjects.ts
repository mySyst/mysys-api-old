import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Project } from '@src/models/project';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('projects')
@ClassMiddleware(authMiddleware)
export class AllProjectsController extends BaseController {
  @Get('')
  public async getAllProjectsForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    console.log(req.body.project);
    try {
      const projects: Array<Project> = await Project.find({
        userId: req.context?.userId,
      });
      console.log('The demands ', projects);
      res.status(200).send(projects);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
