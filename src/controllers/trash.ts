import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Demand } from '@src/models/demand';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';

@Controller('alldemands')
@ClassMiddleware(authMiddleware)
export class TrashController extends BaseController {
  @Get('trash')
  public async trashForLoggedUser(req: Request, res: Response): Promise<void> {
    if (req.context?.userId) {
      try {
        const demands: Array<Demand> = await Demand.find({
          userId: req.context?.userId,
          trash: true,
          project: false,
        });
        console.log('The Inbox', demands);
        res.status(200).send(demands);
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    } else {
      res.status(404).send({ code: 404, error: 'Not found' });
    }
  }

  @Get('trash/:id')
  public async deleteTrashForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;

    console.log(id);

    if (req.context?.userId) {
      try {
        await Demand.findOneAndDelete({
          userId: req.context?.userId,
          _id: id,
        });
        res
          .status(200)
          .json({ Massage: 'The order was successfully deleted!' });
      } catch (error) {
        this.sendCreateUpdateErrorResponse(res, error);
      }
    } else {
      res.status(404).send({ code: 404, error: 'Not found' });
    }
  }
}
