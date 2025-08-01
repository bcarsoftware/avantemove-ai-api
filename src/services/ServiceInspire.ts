import {Inspire} from "@models/Inspire";
import {PromptDTO} from "@dtos/PromptDTO";
import {AISDKPromptDTO} from "@dtos/AISDKPromptDTO";
import {BaseException} from "@exceptions/BaseException";
import {InspireCore} from "@core/InspireCore";
import {createGoogleGenerativeAI} from '@ai-sdk/google';

export class ServiceInspire {
    private readonly inspireCore: InspireCore;

    constructor() {
        this.inspireCore = new InspireCore();
    }

    async generateInspireMessage(promptDTO: PromptDTO): Promise<Inspire> {
        await this.checkPromptDTO(promptDTO);

        const modelAI: string = process.env.MODEL_AI || "";
        const apiKey: string = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";

        const prompt = await this.createPrompt(promptDTO.beliefs);

        const google = createGoogleGenerativeAI({
            apiKey: apiKey,
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
            "Please write a motivational and inspirational message between 60-70 characters, " +
            "in brazilian portuguese, customized for someone who beliefs these values: " + values +
            ". To keep a new daily habit. Don't use emojis."
        );
    }
}
