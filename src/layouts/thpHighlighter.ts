import { thp_highlighter, CodeJar } from "../lexer/highlighter";

/**
 * Highlights all THP code snippets mounted in the DOM with class .language-thp
 * 
 * It assumes that the code is inside: <pre class="language-thp"><code>...
 */
export function highlightOnDom() {
    const code_elements = document.querySelectorAll("code.language-thp");

    for (const e of [...code_elements]) {
        const el = e as HTMLElement;
        // Some elements with .language-thp don't want to be processed
        if (e.getAttribute("data-disabled") !== null) {
            continue;
        }

        const pre_parent = el.parentElement!;
        const new_div = document.createElement("div");
        const code = el.innerText;

        el.parentElement!.className = "language-thp";
        pre_parent.removeChild(el);
        pre_parent.appendChild(new_div);

        // Create and append a language name indicator

        CodeJar(new_div, thp_highlighter, {
            tab: "    ",
        }).updateCode(code);
    }

    const pre_elements = document.querySelectorAll("pre");
    for (const pre_el of pre_elements) {
        const language = pre_el.getAttribute("data-language");
        if (language === null) { continue; }

        // Create a visual indicador
        const indicator = document.createElement("span");
        indicator.className = "absolute top-2 right-2 inline-block text-sm select-none opacity-75";
        indicator.innerText = language;
        pre_el.appendChild(indicator);
    }
}

