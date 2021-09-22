import {ParsedQs} from "qs";

export class UrlUtils {
    public static getSingleQueryParam(input: string | ParsedQs | string[] | ParsedQs[]): string {
        if (!input) {
            return undefined;
        }
        if (typeof input === "object") {
            return input[0];
        }

        return input.toString();
    }
}