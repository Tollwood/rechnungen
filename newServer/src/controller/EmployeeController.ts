import { Request, Response } from "express";
import { getManager } from "typeorm";
import Employee from "../entity/Employee";

export default class EmployeeController {
  static async findAll(request: Request, response: Response) {
    const repository = getManager().getRepository(Employee);
    const employees = await repository.find();
    response.send({ data: employees });
  }

  static async create(request: Request, response: Response) {
    console.log(request.body);
    const repository = getManager().getRepository(Employee);
    const employee = await repository.create(request.body);
    const createdEmployee = await repository.save(employee);
    console.log(createdEmployee);
    response.send(createdEmployee);
  }

  static async update(request: Request, response: Response) {
    const repository = getManager().getRepository(Employee);
    console.log(request.body);
    const updatedEmployee = await repository.save(request.body);
    response.send(updatedEmployee);
  }

  static async delete(request: Request, response: Response) {
    const id = request.params.id;
    const repository = getManager().getRepository(Employee);
    const employee = await repository.findOne(id);
    await repository.remove(employee);
    response.send({ data: employee });
  }
}
