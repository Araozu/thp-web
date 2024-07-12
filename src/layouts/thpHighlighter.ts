
export function highlightOnDom() {
    const pre_elements = document.querySelectorAll("pre");
    for (const pre_el of pre_elements) {
        const language = pre_el.getAttribute("data-language");
        if (language === null) { continue; }

        // Create a visual indicador
        const indicator = document.createElement("span");
        indicator.className = `absolute top-1 right-0 inline-block text-sm select-none opacity-75 ${language === "php" ? "bg-[#4f5b93]" : ""} px-2 rounded-full`;
        indicator.innerText = language;
        pre_el.appendChild(indicator);
    }
}

