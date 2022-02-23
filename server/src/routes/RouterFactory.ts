import { Request, Response, Router, json } from "express";
import { Collection, Document, Filter, ObjectId, OptionalUnlessRequiredId, WithId } from "mongodb";

// Global Config
export class RouterFactory {
  createRouter(): Router {
    const router = Router();
    router.use(json());
    return router;
  }

  addListResource<T extends Document>(
    router: Router,
    collection: Collection<T>,
    filter: (term: string) => Filter<T>
  ): Router {
    router.get("/", async (_req: Request, res: Response) => {
      try {
        const term: string = (_req.query.term as string) || "";
        let searchQuery = {};
        if (term) {
          searchQuery = filter(term);
        }
        const list = (await collection.find(searchQuery).toArray()) as WithId<T>[];
        res.status(200).send({ data: list, page: { totalElements: 10 } });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
    return;
  }

  addGetResource<T extends Document>(router: Router, collection: Collection<T>) {
    router.get("/:id", async (req: Request, res: Response) => {
      const id = req?.params?.id;

      try {
        const query = { _id: new ObjectId(id) } as Filter<Document>;
        const resource = (await collection.findOne(query)) as WithId<T>;

        if (resource) {
          res.status(200).send(resource);
        }
      } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
      }
    });
  }

  addPostResource<T extends Document>(router: Router, collection: Collection<T>) {
    router.post("/", async (req: Request, res: Response) => {
      try {
        const resource = req.body as OptionalUnlessRequiredId<T>;
        const result = await collection.insertOne(resource);

        result ? res.status(201).send(result) : res.status(500).send("Failed to create a new Entity.");
      } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
      }
    });
  }

  addUpdateResource<T extends Document>(router: Router, collection: Collection<T>) {
    router.put("/:id", async (req: Request, res: Response) => {
      const id = req?.params?.id;
      console.log(id);

      try {
        const updatedResource: T = req.body as T;
        console.log(updatedResource);
        delete updatedResource._id;

        const query = { _id: new ObjectId(id) } as Filter<Document>;
        const result = await collection.updateOne(query, { $set: updatedResource });

        result
          ? res.status(200).send({ ...updatedResource, _id: id })
          : res.status(304).send(`resource with id: ${id} not updated`);
      } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
      }
    });
  }

  addDeleteResource<T extends Document>(router: Router, collection: Collection<T>) {
    router.delete("/:id", async (req: Request, res: Response) => {
      const id = req?.params?.id;

      try {
        const query = { _id: new ObjectId(id) } as Filter<Document>;
        const result = await collection.deleteOne(query);

        if (result && result.deletedCount) {
          res.status(202).send(`Successfully removed entity with id ${id}`);
        } else if (!result) {
          res.status(400).send(`Failed to remove entity with id ${id}`);
        } else if (!result.deletedCount) {
          res.status(404).send(`Entity with id ${id} does not exist`);
        }
      } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
      }
    });
  }

  createCrudRouter<T extends Document>(collection: Collection<T>, listFilter: (term: string) => Filter<T>): Router {
    const router = this.createRouter();
    this.addListResource(router, collection, listFilter);
    this.addGetResource(router, collection);
    this.addPostResource(router, collection);
    this.addUpdateResource(router, collection);
    this.addDeleteResource(router, collection);
    return router;
  }
}
