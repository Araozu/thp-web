export function sidebarHighlight() {
  let current_uri = window.location.pathname;

  const sidebar = document.getElementById("sidebar")!
    .children[0]! as HTMLElement;
  const links = sidebar.querySelectorAll("a");
  for (const link of [...links]) {
    if (link.getAttribute("href") === current_uri) {
      sidebar.scrollTop = link.offsetTop - sidebar.offsetTop - 250;

      link.classList.add("bg-pink-200", "dark:bg-pink-950");
      break;
    }
  }
}
