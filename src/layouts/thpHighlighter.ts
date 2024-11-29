export function highlightOnDom() {
  const pre_elements = document.querySelectorAll("pre");
  for (const pre_el of pre_elements) {
    const language = pre_el.getAttribute("data-language");
    if (language === null) {
      continue;
    }

    // Create a visual indicador
    const indicator = document.createElement("span");

    let indicator_bg_class = "";
    if (language === "php") {
      indicator_bg_class = "bg-[var(--c-php)] text-white";
    } else if (language === "html") {
      indicator_bg_class = "bg-[var(--c-html)] text-white";
    } else if (language === "zig") {
      indicator_bg_class = "bg-[var(--c-zig)] text-black";
    }

    indicator.className = `absolute top-0 right-0 inline-block text-sm select-none opacity-85 ${indicator_bg_class} px-2 rounded-bl-md`;
    indicator.innerText = language;
    pre_el.appendChild(indicator);
  }
}
