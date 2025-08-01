import {Router, Request, Response} from "express";
import {ControllerInspire} from "../controllers/ControllerInspire";

const inspireRoutes: Router = Router();

const controller: ControllerInspire = new ControllerInspire();

inspireRoutes.post("", async (request: Request, response: Response) => {
    await controller.generateInspireMessage(request, response);
});

export default inspireRoutes;
