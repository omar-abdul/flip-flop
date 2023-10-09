export function getAppContainer() {
  return document.querySelector("#app")!;
}
export function createElement(el: keyof HTMLElementTagNameMap) {
  return document.createElement(el);
}
export function shuffle<T>(array: T[]): T[] {
  // This is using the Fisher-Yates (also known as Knuth or Durstenfeld) shuffle.
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
export function generateID(length = 6) {
  return Math.random()
    .toString(16)
    .substring(2, 2 + length);
}
