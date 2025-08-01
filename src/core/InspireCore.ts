import {AISDKPromptDTO} from "@dtos/AISDKPromptDTO";
import {Inspire} from "@models/Inspire";
import {generateText} from "ai";

export class InspireCore {
    async generateInspireMessage(aiSDKPromptDTO: AISDKPromptDTO): Promise<Inspire> {
        const apiKey = process.env.API_KEY;

        const { text } = await generateText({...aiSDKPromptDTO});

        const inspire: Inspire = new Inspire();

        inspire.text = text.substring(0, text.length - 1);

        return inspire;
    }
}
