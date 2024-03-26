import { expect, test, describe } from "bun:test";
import { lex } from "./lexer";

describe("Lexer", () => {
    test("empty program should return no tokens", () => {
        const code = "";
        const tokens = lex(code);
        expect(tokens).toEqual([]);
    });

    test("program with whitespace should return a single token", () => {
        const code = " ";
        const tokens = lex(code);
        expect(tokens).toEqual([{v: " "}]);
    })

    test("program with newlines should return a single token", () => {
        const code = "\n";
        const tokens = lex(code);
        expect(tokens).toEqual([{v: "\n"}]);
    });

    test("program with random unicode should return the same unicode", () => {
        const code = "🍕";
        const tokens = lex(code);
        expect(tokens).toEqual([{v: "🍕"}]);
    });

    test("should scan integers", () => {
        const code = "12345";
        const tokens = lex(code);
        expect(tokens).toEqual([{v: "12345"}]);
    });

    test("should scan integers and whitespace around", () => {
        const code = "   12345  \n  ";
        const tokens = lex(code);
        expect(tokens).toEqual([
            {v: "   "},
            {v: "12345"},
            {v: "  \n  "}
        ]);
    });
});

