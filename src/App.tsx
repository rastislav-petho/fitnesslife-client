import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './components';
import { ContextProvider } from './context/context';
import { BodyPage } from './pages/BodyPage';
import { CaloriesPage } from './pages/CaloriesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TreningPage } from './pages/TreningPage';

const App: FC = () => {
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#7E56AC'
        //main: '#8774B9'
      },
      primary: {
        main: '#0167B1'
      }
    }
  });

  return (
    <ContextProvider>
      <SnackbarProvider>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/" component={CaloriesPage} />
              <PrivateRoute exact path="/trening" component={TreningPage} />
              <PrivateRoute exact path="/body" component={BodyPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </SnackbarProvider>
    </ContextProvider>
  );
};

export default App;
