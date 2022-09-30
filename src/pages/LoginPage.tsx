import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useApi } from '../api/useApi';
import { Context } from '../context/context';
import { Login } from '../helpers/types';

export const LoginPage = () => {
  const classes = useStyles();
  const { authApi } = useApi();
  const history = useHistory();
  const { appState } = useContext(Context);

  const { register, handleSubmit } = useForm<Login>();

  const onSubmit = async (data: Login) => {
    await authApi.login(data);
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4" className={classes.title}>
              Prihlásenie
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <TextField
                {...register('email')}
                name="email"
                variant="outlined"
                label="E-mail"
                className={classes.input}
              />
              <TextField
                {...register('password')}
                name="password"
                type="password"
                variant="outlined"
                label="Heslo"
                className={classes.input}
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={appState.loading}>
                Prihlásiť
              </Button>
              <Button
                type="button"
                variant="text"
                className={classes.button2}
                onClick={() => history.push('/register')}>
                Registrácia
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundImage: 'url("/login-bg3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  grid: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    opacity: 0.88
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 'auto'
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  input: {
    margin: theme.spacing(1),
    width: '100%'
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
  button2: {
    marginTop: theme.spacing(2)
  }
}));
