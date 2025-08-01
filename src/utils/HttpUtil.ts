import {Request, Response} from "express";
import {BaseException} from "../exceptions/BaseException";

export class HttpUtil {
    public static async successResponse<T>(response: Response, data: T, status: number = 200): Promise<Response> {
        return response.status(status).json(data);
    }

    public static async exceptionResponse(error: unknown, response: Response): Promise<Response> {
        if (error instanceof BaseException) {
            return  response.status(error.code).json({
                message: error.message
            });
        }

        return response.status(500).json({
            message: "Internal server error"
        });
    }
}
