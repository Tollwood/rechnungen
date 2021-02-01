import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Company } from "../entity/Company";

export async function companyGetByIdAction(request: Request, response: Response) {
  let id: number = Number.parseInt(request.params.id);

  const repository = getManager().getRepository(Company);
  const company = await repository.findOne(id);
  response.send(company);
}
