import { Routes, Route } from "react-router-dom";
import { routesConfig } from "./routes/RoutesConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routesConfig.map((route, index) => {
          const element = route.protected ? (
            <ProtectedRoute>{route.element}</ProtectedRoute>
          ) : (
            route.element
          );

          return (
            <Route
              key={index}
              index={route.path === ""}
              path={route.path}
              element={element}
            />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
