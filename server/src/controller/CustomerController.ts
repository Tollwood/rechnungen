import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Customer } from "../entity/Customer";

export default class CustomerController {
  static async getAll(request: Request, response: Response) {
    const clientRepository = getManager().getRepository(Customer);
    const clients = await clientRepository.find();

    response.send({ data: clients });
  }
}
