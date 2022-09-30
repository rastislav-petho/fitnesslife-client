import React, { ChangeEvent, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Container, Grid, TextField } from '@material-ui/core';
import { useApi } from '../../api/useApi';
import { Calorie } from '../../helpers/types';
import { formatDateToField } from '../../helpers/helpers';
import { useSnackbar } from 'notistack';
import { CalorieDialog, CaloriesDialogMode } from './useCalorie';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type CalorieAddDialogProps = {
  dialog: CalorieDialog;
  setDialog: (value: boolean, mode: CaloriesDialogMode) => void;
  fetchData: (page?: number) => void;
};

export const CalorieAddDialog = (props: CalorieAddDialogProps) => {
  const classes = useStyles();
  const { caloriesApi } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { dialog, setDialog, fetchData } = props;

  const [data, setData] = useState<Calorie>({
    date: '',
    caloriesConsumed: 0,
    caloriesBurned: 0,
    deficit: 0,
    weight: 0,
    notes: ''
  });

  useEffect(() => {
    setData(
      dialog.data
        ? { ...dialog.data, date: formatDateToField(dialog.data.date) }
        : {
            date: '',
            caloriesConsumed: 0,
            caloriesBurned: 0,
            deficit: 0,
            weight: 0,
            notes: ''
          }
    );
  }, [dialog.data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  console.log(dialog);

  const handleSubmit = async () => {
    if (dialog.mode === 'ADD') {
      const result = await caloriesApi.post(data);
      if (result.status === 200) {
        enqueueSnackbar('Záznam bol úspešne pridaný.', { variant: 'success' });
        fetchData();
        setDialog(false, 'ADD');
      } else {
        enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      }
    }

    if (dialog.mode === 'EDIT') {
      const result = await caloriesApi.update(data);
      if (result.status === 200) {
        enqueueSnackbar('Záznam bol úspešne aktualizovaný.', {
          variant: 'success'
        });
        fetchData();
        setDialog(false, 'ADD');
      }
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={dialog.open}
        onClose={() => setDialog(false, 'ADD')}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDialog(false, 'ADD')}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Denný sumár kalórií
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Uložiť
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="date"
                  label="Dátum"
                  variant="outlined"
                  type="date"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className={classes.input}
                  defaultValue={data.date}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="caloriesConsumed"
                  label="Prijate kalórie"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.caloriesConsumed}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="caloriesBurned"
                  label="Splálené kalórie"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.caloriesBurned}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="weight"
                  label="Aktuálna hmotnosť"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.weight}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Poznámky"
                  variant="outlined"
                  type="text"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.notes}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2)
    },
    input: {
      width: '100%'
    }
  })
);
