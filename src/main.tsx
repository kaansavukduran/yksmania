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
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
);
// The startup guard in index.html reloads only while this flag is unset.
(window as unknown as { __yksBooted?: boolean }).__yksBooted = true;
try {
  sessionStorage.removeItem("yksmania.bootRetry");
} catch {
  // Storage may be unavailable; the guard then stops after its own limit.
}
