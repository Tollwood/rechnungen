import { Request, Response, Router, json } from "express";
import { Filter, ObjectId, WithId } from "mongodb";
import { collections } from "../services/database.service";
import ServiceCatalog from "../entity/ServiceCatalog";
import Service from "../entity/Service";
import { RouterFactory } from "./RouterFactory";

// Global Config

export const addServiceSubResource = (router: Router) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////// Subresource services //////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // GET
  router.get("/:catalogId/services", async (req: Request, res: Response) => {
    try {
      const term: string = (req.query.term as string) || "";
      const likeTermRegEx = new RegExp(`^${term}`, "i");
      const query = {
        serviceCatalogId: new ObjectId(req?.params?.catalogId),
        $or: [{ title: { $regex: likeTermRegEx } }, { articleNumber: { $regex: likeTermRegEx } }],
      };

      // where: [{ title: Like(`%${term}%`) }, { articleNumber: Like(`%${term}%`) }],

      const services = (await collections.services.find(query).toArray()) as WithId<Service>[];
      res.status(200).send({ data: services });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.get("/:catalogId/services/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
      const query = { _id: new ObjectId(id), serviceCatalogId: new ObjectId(req?.params?.catalogId) };
      const service = (await collections.services.findOne(query)) as WithId<Service>;

      if (service) {
        res.status(200).send(service);
      }
    } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
  });

  // POST
  router.post("/:catalogId/services", async (req: Request, res: Response) => {
    try {
      const newService = req.body as Service;
      if (newService.serviceCatalogId !== req?.params?.catalogId) {
        res.status(400).send("service catalog does not match");
        return;
      }
      const result = await collections.services.insertOne(newService);

      result
        ? res.status(201).send(`Successfully created a new service with id ${result.insertedId}`)
        : res.status(500).send("Failed to create a new service.");
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });

  // PUT
  router.put("/:catalogId/services/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
      const updatedService: Service = req.body as Service;
      const query = { _id: new ObjectId(id), serviceCatalogId: new ObjectId(req?.params?.catalogId) };

      const result = await collections.services.updateOne(query, { $set: updatedService });

      result
        ? res.status(200).send(`Successfully updated service with id ${id}`)
        : res.status(304).send(`Service with id: ${id} not updated`);
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });

  // DELETE
  router.delete("/:catalogId/services/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
      const query = { _id: new ObjectId(id), serviceCatalogId: new ObjectId(req?.params?.catalogId) };
      const result = await collections.services.deleteOne(query);

      if (result && result.deletedCount) {
        res.status(202).send(`Successfully removed service with id ${id}`);
      } else if (!result) {
        res.status(400).send(`Failed to remove service with id ${id}`);
      } else if (!result.deletedCount) {
        res.status(404).send(`service with id ${id} does not exist`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });
};
