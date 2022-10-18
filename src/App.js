import React from "react";
import { BrowserRouter as Router, /* Route, */ Switch } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { ProductProvider } from "./context/Product";
import { ProveedorProvider } from "./context/Proveedor";
import indexRoutes from "./routes";
import AppRoutes from "./routes/AppRoutes";
/* import routing from "./routes/routing.jsx"; */

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <ProveedorProvider>
          <Router>
            <Switch>
              {indexRoutes.map((route) => {
                return (
                  <AppRoutes
                    path={route.path}
                    key={route.path}
                    component={route.component}
                    isPrivate={route.isPrivate}
                  />
                );
              })}
            </Switch>
          </Router>
        </ProveedorProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
