import {LanguageModel} from "ai";

export interface AISDKPromptDTO {
    model: LanguageModel;
    prompt: string;
}
