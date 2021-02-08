import { Request, Response } from "express";
import * as path from "path";

export default class StaticFilesController {
  static async serve(request: Request, response: Response) {
    response.sendFile(path.join(__dirname, "..", "public", "index.html"));
  }
}
