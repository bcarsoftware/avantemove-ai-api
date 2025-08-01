import {Inspire} from "../models/Inspire";
import {PromptDTO} from "../dtos/PromptDTO";
import {AISDKPromptDTO} from "../dtos/AISDKPromptDTO";
import {BaseException} from "../exceptions/BaseException";
import {InspireCore} from "../core/InspireCore";
import {createGoogleGenerativeAI} from '@ai-sdk/google';

export class ServiceInspire {
    private readonly inspireCore: InspireCore;

    constructor() {
        this.inspireCore = new InspireCore();
    }

    async generateInspireMessage(promptDTO: PromptDTO): Promise<Inspire> {
        await this.checkPromptDTO(promptDTO);

        const modelAI = process.env.MODEL_AI || "";

        const prompt = await this.createPrompt(promptDTO.beliefs);

        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });

        const aiSDKPrompt: AISDKPromptDTO = {
            model: google(modelAI),
            prompt: prompt
        };

        return await this.inspireCore.generateInspireMessage(aiSDKPrompt);
    }

    private async checkPromptDTO(promptDTO: PromptDTO): Promise<void> {
        if (!promptDTO || !promptDTO.beliefs)
            throw new BaseException("prompt dto invalid or beliefs empty list");

        const regex = /^[A-Za-z0-9 ]{1,32}$/;
        const spaces = / {2}/;

        promptDTO.beliefs.forEach(belief => {
            if (spaces.test(belief))
                throw new BaseException("belief can't contain following spaces");

            if (!regex.test(belief))
                throw new BaseException(
                    "belief with invalid characters - only alphanumeric and not following spaces"
                );
        });
    }

    private async createPrompt(beliefs: string[]): Promise<string> {
        const values = beliefs.join(",");

        return (
            `Escreva uma mensagem motivacional entre 40-50 caracteres, 
            em português do Brasil, 
            personalizada para alguém com valores de 
            ${values}, 
            para manter um hábito diário. Não utilize emojis.`
        );
    }
}
