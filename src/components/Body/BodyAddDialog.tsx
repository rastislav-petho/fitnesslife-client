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
import { Body, DialogMode } from '../../helpers/types';
import { formatDateToField } from '../../helpers/helpers';
import { useSnackbar } from 'notistack';
import { BodyDialog } from './useBody';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type BodyAddDialogProps = {
  dialog: BodyDialog;
  setDialog: (value: boolean, mode: DialogMode) => void;
  fetchData: (page?: number) => void;
};

const defaultValues = {
  arm: 0,
  neck: 0,
  belt: 0,
  belly: 0,
  ass: 0,
  forearm: 0,
  calf: 0,
  thigh: 0,
  chest: 0,
  date: ''
};

export const BodyAddDialog = (props: BodyAddDialogProps) => {
  const classes = useStyles();
  const { bodyApi } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { dialog, setDialog, fetchData } = props;

  const [data, setData] = useState<Body>(defaultValues);

  useEffect(() => {
    if (dialog.data) {
      setData(dialog.data);
    }
  }, [dialog.data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (dialog.mode === 'ADD') {
      const result = await bodyApi.post(data);
      if (result.status === 200) {
        enqueueSnackbar('Záznam bol úspešne pridaný.', { variant: 'success' });
        fetchData();
        setDialog(false, 'ADD');
      } else {
        enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      }
    }

    if (dialog.mode === 'EDIT') {
      const result = await bodyApi.update(data);
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
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDialog(false, 'ADD')}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Veľkosti tela
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
                  name="neck"
                  label="Krk"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.neck}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="chest"
                  label="Hrudník"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.chest}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="arm"
                  label="Ruky"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.arm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="forearm"
                  label="Predlaktia"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.forearm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="belly"
                  label="Brucho"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.belly}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="belt"
                  label="Pás"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.belt}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ass"
                  label="Zadok"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.ass}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="thigh"
                  label="Stehná"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.thigh}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="calf"
                  label="Lýtka"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  className={classes.input}
                  defaultValue={data.calf}
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
