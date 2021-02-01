import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ProductCatalog } from "../entity/ProductCatalog";

export async function productCatalogGetAllAction(request: Request, response: Response) {
  const catalogRepository = getManager().getRepository(ProductCatalog);
  const catalogs = await catalogRepository.find();

  response.send({ data: catalogs });
}
