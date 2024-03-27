import { expect, test, describe } from "bun:test";
import { scan_identifier } from "./identifier_lexer";


describe("Identifier Lexer", () => {
    test("should return an identifier token", () => {
        const code = "a";
        const token = scan_identifier(code, 0);

        expect(token).toEqual([{ v: "a", token_type: "identifier" }, 1]);
    });

    test("should scan an underscore", () => {
        const code = "_";
        const token = scan_identifier(code, 0);

        expect(token).toEqual([{ v: "_", token_type: "identifier" }, 1]);
    });

    test("should scan an identifier with an underscore", () => {
        const code = "a_";
        const token = scan_identifier(code, 0);

        expect(token).toEqual([{ v: "a_", token_type: "identifier" }, 2]);
    });

    test("should scan an identifier that starts with an underscore", () => {
        const code = "_a";
        const token = scan_identifier(code, 0);

        expect(token).toEqual([{ v: "_a", token_type: "identifier" }, 2]);
    });

    test("should scan an identifier with numbers and uppercase letters", () => {
        const code = "aA1";
        const token = scan_identifier(code, 0);

        expect(token).toEqual([{ v: "aA1", token_type: "identifier" }, 3]);
    });

    test("should scan a keyword", () => {
        const code = "val";
        const token = scan_identifier(code, 0);

        expect(token).toEqual([{ v: "val", token_type: "keyword" }, 3]);
    });
});

