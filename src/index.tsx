import { createRoot } from "react-dom/client";

import { App } from "@/components";
import "@/theme/global";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
