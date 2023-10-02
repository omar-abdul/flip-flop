import "./style.css";
import { renderApp } from "./components/app";

Rune.initClient({
  onChange: ({ newGame }) => {
    renderApp(newGame);
  },
});
