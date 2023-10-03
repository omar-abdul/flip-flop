import "./style.css";
import { renderApp } from "./components/app";
renderApp();
Rune.initClient({
  onChange: ({ newGame }) => {},
});
