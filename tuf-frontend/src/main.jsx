import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationProvider } from "./contexts/useApplication";
import App from "./App.jsx";
import "./index.css";
import AdminTable from "./components/AdminTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminTable />,
  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ApplicationProvider>
    </QueryClientProvider>
  </StrictMode>
);
