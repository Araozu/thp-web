import { expect, test } from 'vitest'
import { leftTrimDedent } from "./utils"

test("should trim empty string", () => {
    const input = ``;

    expect(leftTrimDedent(input)).toEqual([""]);
})

test("should work on a single line", () => {
    const input = `hello`

    expect(leftTrimDedent(input)).toEqual([
        "hello"
    ]);
})

test("should trim a single line", () => {
    const input = `  hello`

    expect(leftTrimDedent(input)).toEqual([
        "hello"
    ]);
})

test("should trim multiple lines", () => {
    const input = `  hello\n  world`

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "world"
    ]);
})

test("should trim multiple lines without indentation", () => {
    const input = `hello\nworld`

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "world"
    ]);
})

test("should consume only whitespace", () => {
    const input = `  hello\nworld`;

    try {
        const res = leftTrimDedent(input);
        expect(res).not.toEqual([
            "hello",
            "rld",
        ]);
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toHaveProperty("message", "Invalid indentation while trimming: Expected 2 spaces, got 0");
    }
})

test("should preserve deeper indentation", () => {
    const input = `  hello\n    world`

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "  world",
    ]);
})

test("should ignore empty lines", () => {
    const input = `  hello\n\n  world`

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "",
        "world",
    ]);
})

test("should ignore lines with only whitespace", () => {
    const input = `  hello\n \n      \n  world`

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "",
        "    ",
        "world",
    ]);
})

test("should trim multiple without indentation", () => {
    const input = `hello\nworld\n!`

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "world",
        "!",
    ]);
})

test("should ignore empty first line", () => {
    const input = `
hello
world`;

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "world",
    ]);
})

test("should ignore empty first line 2", () => {
    const input = `
    hello

    world`;

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "",
        "world",
    ]);
})

test("should ignore empty last line", () => {
    const input = `
    hello
    world
`;

    expect(leftTrimDedent(input)).toEqual([
        "hello",
        "world",
    ]);
});
