import "./style.css";
import { renderApp } from "./components/app";
import { render } from "./util/util";

render(document.querySelector<HTMLDivElement>("#app")!, renderApp());

Rune.initClient({
  onChange: () => {},
});
