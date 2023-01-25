import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

// INTERFACE
import { IService } from '../@types/interfaces/IService';
import { IPost } from '../@types/interfaces/IPost';

export default class PostController {
  constructor(private _service: IService<IPost>) {}

  async create(req: Request & { body:IPost }, res: Response<IPost>) {
    const { name, src } = req.body;
    const result = await this._service.create(req.body);
    return res.status(httpStatusCode.CREATED).json(result);
  }

  async read(_req: Request, res:Response<IPost[] | null>) {
    const getCar = await this._service.read();
    return res.status(httpStatusCode.OK).json(getCar);
  }

  async readOne(req: Request, res: Response<IPost | null>) {
    const { id } = req.params;
    const findOneCar = await this._service.readOne(id);
    return res.status(httpStatusCode.OK).json(findOneCar);
  }

  async update(req: Request, res: Response<IPost | null>) {
    const { id } = req.params;
    const resultUpdate = await this._service.update(id, req.body);
    return res.status(httpStatusCode.OK).json(resultUpdate);
  }

  async delete(req: Request, res: Response<IPost | null>) {
    const { id } = req.params;
    const deleteCar = await this._service.delete(id);
    return res.status(httpStatusCode.NO_CONTENT).json(deleteCar);
  }
}
