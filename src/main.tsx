import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/lexend/latin-400.css";
import "@fontsource/lexend/latin-ext-400.css";
import "@fontsource/lexend/latin-600.css";
import "@fontsource/lexend/latin-ext-600.css";
import "./style.css";
import App from "./App";
import { Provider } from "./store";
import { preloadPages } from "./pages/routes";

const render = () =>
  createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
  );
// Route chunks download in parallel; the app renders once they are in, so
// later navigation is instant and works offline. A failed chunk still lets the
// app start; that route then shows its loading state and retries on visit.
preloadPages().then(render, render);
