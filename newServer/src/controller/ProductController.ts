import { Request, Response } from "express";
import { getManager, Like } from "typeorm";
import { Product } from "../entity/Product";

export default class ProductController {
  static async getAll(request: Request, response: Response) {
    const productRepository = getManager().getRepository(Product);
    const term: string = (request.query.term as string) || "";
    const products = await productRepository.find({
      where: [{ title: Like(`%${term}%`) }, { articleNumber: Like(`%${term}%`) }],
    });
    response.send({ data: products, page: {} });
  }

  static async create(request: Request, response: Response) {
    console.log(request.body);
    const productRepository = getManager().getRepository(Product);
    const product = await productRepository.create(request.body);
    console.log(product);
    const createdProduct = await productRepository.save(product);
    response.send(createdProduct);
  }

  static async update(request: Request, response: Response) {
    const repository = getManager().getRepository(Product);
    console.log(request.body);
    const updatedProduct = await repository.save(request.body);
    response.send(updatedProduct);
  }

  static async delete(request: Request, response: Response) {
    const id = request.params.id;
    const repository = getManager().getRepository(Product);
    const product = await repository.findOne(id);
    await repository.remove(product);
    response.send({ data: product });
  }
}
