import { createRoot } from "react-dom/client";
import AuthUser from "./components/AuthUser";

import { Provider, defaultTheme } from "@adobe/react-spectrum";

import "./index.css";

const container = document.getElementById("root");
if (!container) {
    throw new Error("Failed to find the root element");
}
const root = createRoot(container);
root.render(<Provider theme={defaultTheme}><AuthUser /></Provider>);
