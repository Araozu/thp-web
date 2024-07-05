
export function highlightOnDom() {
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

