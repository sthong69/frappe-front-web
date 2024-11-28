import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./context/Auth";
import { router } from "./router";

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
