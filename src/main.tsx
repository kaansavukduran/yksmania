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
import { pagesForRoute, preloadPages } from "./pages/routes";

const render = () =>
  createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
  );
// Paint as soon as the opening route's chunk is in, then fetch every other
// route in the background so later navigation is instant and works offline.
// A failed chunk still lets the app start; that route retries on its visit.
const warmUp = () => void preloadPages().catch(() => {});
Promise.all(pagesForRoute(location.hash).map((page) => page.preload())).then(
  () => {
    render();
    warmUp();
  },
  () => {
    render();
    warmUp();
  },
);
