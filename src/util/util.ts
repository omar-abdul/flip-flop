export function render(element: HTMLElement, html: string) {
  element.innerHTML = html;
}
export function getAppContainer() {
  return document.querySelector("#app")!;
}
export function createElement(el: keyof HTMLElementTagNameMap) {
  return document.createElement(el);
}
