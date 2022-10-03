import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useApi } from '../api/useApi';
import { Context } from '../context/context';
import { Register } from '../helpers/types';

export const RegisterPage = () => {
  const classes = useStyles();
  const api = useApi();
  const { appState } = useContext(Context);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<Register>();

  const onSubmit = async (data: Register) => {
    await api.auth.register(data);
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4" className={classes.title}>
              Registrácia
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <TextField
                {...register('name', { required: true })}
                name="name"
                variant="outlined"
                label="Vaše meno"
                className={classes.input}
                error={!!errors.name}
                helperText={errors?.name?.type === 'required' && 'Povinný údaj'}
              />
              <TextField
                {...register('password', { required: true, minLength: 8 })}
                name="password"
                type="password"
                variant="outlined"
                label="Heslo"
                className={classes.input}
                error={!!errors.password}
                helperText={
                  errors?.password?.type === 'required'
                    ? 'Povinný údaj'
                    : errors?.password?.type === 'minLength' &&
                      'Heslo musí obsahovať minimálne 8 znakov'
                }
              />
              <TextField
                {...register('passwordAgain', {
                  required: true,
                  minLength: 8,
                  validate: (value) => value === getValues('password')
                })}
                name="passwordAgain"
                type="password"
                variant="outlined"
                label="Heslo ešte raz"
                className={classes.input}
                error={!!errors.passwordAgain}
                helperText={
                  errors?.passwordAgain?.type === 'required'
                    ? 'Povinný údaj'
                    : errors?.passwordAgain?.type === 'validate' && 'Heslá sa nerovnajú'
                }
              />
              <TextField
                {...register('email', { required: true })}
                name="email"
                variant="outlined"
                label="E-mail"
                className={classes.input}
                error={!!errors.email}
                helperText={errors?.email?.type === 'required' && 'Povinný údaj'}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={appState.loading}>
                Zaregistrovať
              </Button>
              <Button
                type="button"
                variant="text"
                className={classes.button2}
                onClick={() => history.push('/login')}>
                Prihlásiť
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
    backgroundImage: 'url("/login-bg.jpg")',
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
