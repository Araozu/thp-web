import { expect, test, describe } from "bun:test";
import { scan_string } from "./string_lexer";

describe("String Lexer", () => {
    test("should scan an empty string", () => {
        const code = "\"\"";
        const token = scan_string(code, 0);

        expect(token).toEqual([{ v: "\"\"", token_type: "string" }, 2]);
    });

    test("should scan a string with a single character", () => {
        const code = "\"a\"";
        const token = scan_string(code, 0);

        expect(token).toEqual([{ v: "\"a\"", token_type: "string" }, 3]);
    });

    test("should scan a string with multiple characters", () => {
        const code = "\"hello\"";
        const token = scan_string(code, 0);

        expect(token).toEqual([{ v: "\"hello\"", token_type: "string" }, 7]);
    });
    
    test("should scan a string with an escape character", () => {
        const code = "\"\\n\"";
        const token = scan_string(code, 0);

        expect(token).toEqual([{ v: "\"\\n\"", token_type: "string" }, 4]);
    });
});
