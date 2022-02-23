import { Request, Response, Router, json } from "express";
import { ObjectId, WithId } from "mongodb";
import { collections } from "../services/database.service";
import RealEstate from "../entity/realEstate";

// Global Config
export const companyRouter = Router();
companyRouter.use(json());

// GET

companyRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req?.params?.id);

  const companies = [
    {
      id: 1,
      billNo: 1,
      logo: "logo_timm.png",
      phone: "0176 / 51 51 26 81",
      email: "timm1960@gmail.com",
      city: "Bokel",
      houseNumber: "30",
      street: "Fasanenweg",
      zipCode: "25364",
      name: "Wärmemessdienst Timm",
    },
  ];
  try {
    const company = companies.find((c) => c.id == id);

    if (company) {
      res.status(200).send(company);
    }
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
});
