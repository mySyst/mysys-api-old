import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';
import { Demand } from '@src/models/demand';

@Controller('project')
@ClassMiddleware(authMiddleware)
export class DetailsOfProjectController extends BaseController {
  @Get(':id')
  public async getDetailsOfProjectForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const demand = await Demand.findById({    
        _id: req.params.id,
        userId: req.context?.userId,
      });
      console.log('The demands the project ', demand);
      res.status(200).send(demand);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
