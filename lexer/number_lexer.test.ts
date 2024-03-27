import { expect, test, describe } from "bun:test";
import { scan_number } from "./number_lexer";

describe("Number Lexer", () => {
    test("should return a whole number token", () => {
        const code = "1";
        const token = scan_number(code, 0);

        expect(token).toEqual([{ v: "1", token_type: "number" }, 1]);
    });

    test("should return a whole number token pt 2", () => {
        const code = "12345";
        const token = scan_number(code, 0);

        expect(token).toEqual([{ v: "12345", token_type: "number" }, 5]);
    });
});

