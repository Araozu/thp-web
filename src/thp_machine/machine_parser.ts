/*
step {
    line 1
    set "a" "b"
    unset "a"
}
*/

import { scan_number } from "../lexer/number_lexer";
import { scan_string } from "../lexer/string_lexer";
import { is_digit, is_lowercase, is_uppercase } from "../lexer/utils";

enum TokenType {
    Step,
    Line,
    Set,
    Out,
    Number,
    String,
    Unset,
    BraceOpen,
    BraceClose,
};

type Token = [TokenType, string | undefined];

// Creates a stream of tokens
function lex(input: string): Array<Token> {
    const characters = input.split("");
    const characters_len = characters.length;
    let next_p = 0;

    const tokens: Array<Token> = [];

    while (next_p < characters_len)
    {
        const c = characters[next_p]!;

        // word
        if (is_lowercase(c) || is_uppercase(c))
        {
            const [token, next] = lex_word(characters, next_p);
            tokens.push(token);
            next_p = next;
        }
        // number
        else if (is_digit(c))
        {
            const [token, next] = scan_number(input, next_p);
            tokens.push([TokenType.Number, token.v]);
            next_p = next;
        }
        // string
        else if (c === "\"")
        {
            const [token, next] = scan_string(input, next_p);
            tokens.push([TokenType.String, token.v]);
            next_p = next;
        }
        else if (c === "{")
        {
            tokens.push([TokenType.BraceOpen, undefined]);
            next_p += 1;
        }
        else if (c === "}")
        {
            tokens.push([TokenType.BraceClose, undefined]);
            next_p += 1;
        }
        else if (c === " " || c === "\n")
        {
            next_p += 1;
        }
        else
        {
            throw new Error(`Invalid character: \`${c}\``);
        }
    }

    return tokens;
}

function lex_word(input: Array<string>, pos: number): [Token, number] {
    let next_p = pos;
    let value = "";

    let c = input[next_p];
    while (c !== undefined && (is_lowercase(c) || is_uppercase(c) || is_digit(c) || c === "_"))
    {
        value += c;
        next_p += 1;
        c = input[next_p];
    }

    let token_type;
    if (value === "step")      { token_type = TokenType.Step; }
    else if (value === "line") { token_type = TokenType.Line; }
    else if (value === "set")  { token_type = TokenType.Set; }
    else if (value === "unset"){ token_type = TokenType.Unset; }
    else if (value === "out")  { token_type = TokenType.Out; }
    else
    {
        throw new Error(`Invalid word: ${value}`);
    }

    return [[token_type, value], next_p]
}

export enum InstructionType {
    Line,
    Set,
    Unset,
    Out,
}

export type Instruction = {
    t: InstructionType,
    v0: string,
    v1?: string,
}

export function parse_str(input: string): Array<Array<Instruction>> {
    return parse(lex(input));
}

// Parses the tokens into a instruction set
function parse(tokens: Array<Token>): Array<Array<Instruction>> {
    let pos = 0;
    let max = tokens.length;

    const ret = [];

    while (pos < max) {
        const [steps, next_pos] = parse_step(tokens, pos);
        pos = next_pos;
        ret.push(steps);
    }

    return ret;
}

function parse_step(tokens: Array<Token>, _pos: number): [Array<Instruction>, number] {
    let pos = _pos;

    expect(tokens, pos, TokenType.Step, "expected step");
    pos += 1;
    expect(tokens, pos, TokenType.BraceOpen, "expected opening brace");
    pos += 1;

    const instructions = [];

    while (true) {
        const [inst, next] = parse_instruction(tokens, pos);
        if (inst === null) {
            break;
        }
        instructions.push(inst);
        pos = next;
    }

    expect(tokens, pos, TokenType.BraceClose, "expected closing brace");
    pos += 1

    return [instructions, pos];
}

function parse_instruction(tokens: Array<Token>, _pos: number): [Instruction|null, number] {
    let pos = _pos;

    let instruction_type = tokens[pos]![0];
    if (instruction_type === TokenType.Line) {
        pos += 1;
        expect(tokens, pos, TokenType.Number, "expected a number after the `line` instruction");
        return [{
            t: InstructionType.Line,
            v0: tokens[pos]![1]!,
        }, pos + 1]
    }
    else if (instruction_type === TokenType.Set) {
        pos += 1;
        expect(tokens, pos, TokenType.String, "expected a string after the `set` instruction");
        pos += 1;
        expect(tokens, pos, TokenType.String, "expected a second string after the `set` instruction");

        return [{
            t: InstructionType.Set,
            v0: tokens[pos - 1]![1]!,
            v1: tokens[pos]![1]!,
        }, pos + 1]
    }
    else if (instruction_type === TokenType.Unset) {
        expect(tokens, pos + 1, TokenType.String, "expected a a string after the `unset` instruction");

        return [{
            t: InstructionType.Unset,
            v0: tokens[pos + 1]![1]!,
        }, pos + 2]
    }
    else if (instruction_type === TokenType.Out) {
        expect(tokens, pos + 1, TokenType.String, "expected a a string after the `unset` instruction");

        return [{
            t: InstructionType.Out,
            v0: tokens[pos + 1]![1]!,
        }, pos + 2]
    }

    return [null, pos];
}

function expect(t: Array<Token>, pos: number, type: TokenType, err: string) {
    const [t_type] = t[pos]!;
    if (t_type !== type) {
        console.error("`" + String(t[pos]) + "`");
        throw new Error(err + " , got " + t[pos]);
    }
}

