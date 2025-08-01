import {Request, Response} from "express";
import {PromptDTO} from "@dtos/PromptDTO";
import {HttpUtil} from "@utils/HttpUtil";
import {Inspire} from "@models/Inspire";
import {ServiceInspire} from "@services/ServiceInspire";

export class ControllerInspire {
    private readonly service: ServiceInspire;

    constructor() {
        this.service = new ServiceInspire();
    }

    async generateInspireMessage(request: Request, response: Response): Promise<Response> {
        try {
            const promptDTO: PromptDTO = {...request.body} as PromptDTO;

            const generatedText: Inspire = await this.service.generateInspireMessage(promptDTO);

            return await HttpUtil.successResponse<Inspire>(response, generatedText);
        }
        catch (error: unknown) {
            console.error(error);

            return await HttpUtil.exceptionResponse(error, response);
        }
    }
}