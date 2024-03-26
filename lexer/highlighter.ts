import {lex} from "./lexer.ts";
import { CodeJar } from "codejar"

function thp_highlighter(editor: any) {
    let code: string = editor.textContent;

    let tokens = lex(code);

    let highlighted_code = "";

    for (let token of tokens) {
        highlighted_code += `<span class="token ${token.token_type}">${token.v}</span>`;
    }

    editor.innerHTML = highlighted_code;
}

// @ts-ignore
window.thp_highlighter = thp_highlighter;
// @ts-ignore
window.CodeJar = CodeJar;
