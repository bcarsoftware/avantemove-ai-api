export class BaseException extends Error {
    public readonly name: string = "BaseException";
    private readonly _code: number;

    constructor(message: string, code: number = 400) {
        super(message);
        this._code = code;
    }

    get code(): number {
        return this._code;
    }
}
