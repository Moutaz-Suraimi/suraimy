import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Add 'loaded' class to body after rendering to prevent FOUC / layout flash
try {
  document.body.classList.add("loaded");
} catch (e) {
  console.error("Failed to add loaded class:", e);
}
