import { SnackbarProvider } from "notistack";
import { FC } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components";
import { ContextProvider } from "./context/context";
import { CaloriesPage } from "./pages/CaloriesPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TreningPage } from "./pages/TreningPage";

const App: FC = () => {
  return (
    <ContextProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={CaloriesPage} />
            <PrivateRoute exact path="/trening" component={TreningPage} />
            <PrivateRoute exact path="/settings" component={TreningPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </ContextProvider>
  );
};

export default App;
