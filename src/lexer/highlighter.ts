import { lex } from "./lexer";

export function thp_highlighter(code: string) {
    let tokens = lex(code);

    let highlighted_code = "";

    for (let token of tokens) {
        highlighted_code += `<span class="token ${token.token_type}">${token.v}</span>`;
    }

    return highlighted_code;
}
