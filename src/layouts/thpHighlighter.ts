
export function highlightOnDom() {
    const pre_elements = document.querySelectorAll("pre");
    for (const pre_el of pre_elements) {
        const language = pre_el.getAttribute("data-language");
        if (language === null) { continue; }

        // Create a visual indicador
        const indicator = document.createElement("span");

        let indicator_bg_class = "";
        if (language === "php") { indicator_bg_class = "bg-[#4f5b93]"; }
        else if (language === "html") { indicator_bg_class = "bg-[#dc4a20]"; }

        indicator.className = `absolute top-1 right-0 inline-block text-sm select-none opacity-85 ${indicator_bg_class} px-2 rounded-full`;
        indicator.innerText = language;
        pre_el.appendChild(indicator);
    }
}
