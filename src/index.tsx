import * as ReactDOM from "react-dom/client";
import App from "./App";
import { register } from "./serviceWorker";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(<App />);

register();
