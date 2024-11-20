import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

import Navbar from "@/components/navbar";

export const Route = createRootRoute({
  component: () => (
    <main>
      <Toaster
        richColors
        duration={1250}
        toastOptions={{ className: "font-spaceGrotesk" }}
      />
      <Navbar />
      <Outlet />
    </main>
  ),
});
