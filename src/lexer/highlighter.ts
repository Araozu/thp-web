import { lex } from "./lexer";
import {CodeJar as Codejar} from "codejar";

export function thp_highlighter(editor: any) {
    let code: string = editor.textContent;

    let tokens = lex(code);

    let highlighted_code = "";

    for (let token of tokens) {
        highlighted_code += `<span class="token ${token.token_type}">${token.v}</span>`;
    }

    editor.innerHTML = highlighted_code;
}

export const CodeJar = Codejar;
