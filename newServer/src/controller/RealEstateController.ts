import { Request, Response } from "express";
import { relative } from "path";
import { getManager, Like } from "typeorm";

import { RealEstate } from "../entity/RealEstate";

export default class RealEstateController {
  static async getAll(request: Request, response: Response) {
    const term: string = (request.query.term as string) || "";
    const repository = getManager().getRepository(RealEstate);
    const realEstates = await repository.find({
      where: [
        { name: Like(`%${term}%`) },
        { address: { street: Like(`%${term}%`) } },
        { address: { city: Like(`%${term}%`) } },
      ],
    });
    response.send({ data: realEstates, page: {} });
  }

  static async create(request: Request, response: Response) {
    const repository = getManager().getRepository(RealEstate);
    const realEstate = await repository.save(request.body);
    response.send(realEstate);
  }

  static async delete(request: Request, response: Response) {
    const repository = getManager().getRepository(RealEstate);
    const realEstate = await repository.findOne(request.params.id);
    repository.delete(realEstate);
    response.send(realEstate);
  }

  static async update(request: Request, response: Response) {
    const repository = getManager().getRepository(RealEstate);
    const id = request.params.id as string;
    const realEstate = await repository.findOne(id);
    const toUpdate = { ...realEstate, ...request.body };
    await repository.update({ id: Number.parseInt(id) }, toUpdate);
    response.send(realEstate);
  }
}
