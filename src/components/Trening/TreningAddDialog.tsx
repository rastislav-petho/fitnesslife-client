import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
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
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField
} from '@material-ui/core';
import { useApi } from '../../api/useApi';
import {
  DialogMode,
  PartiesType,
  PartiesVariantType,
  TreningExerciseType,
  TreningType
} from '../../helpers/types';

import { TreningDialog } from './useTrening';
import { ExerciseList } from './ExerciseList';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TreningAddDialogProps = {
  dialog: TreningDialog;
  setDialog: (value: boolean, mode: DialogMode) => void;
  fetchData: (page?: number) => void;
};

const defaultValues = {
  date: '',
  time: '',
  caloriesBurned: null,
  notes: '',
  parties: [],
  treningExercise: [],
  partiesVariant: []
};

export const TreningAddDialog = (props: TreningAddDialogProps) => {
  const classes = useStyles();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { dialog, setDialog, fetchData } = props;

  const [trening, setTrening] = useState<TreningType>(defaultValues);
  const [parties, setParties] = useState<PartiesType[]>([]);
  const [partiesVariant, setPartiesVariant] = useState<PartiesVariantType[]>([]);
  const [partiesChecked, setPartiesChecked] = useState<{ id: number; checked: boolean }[]>([]);
  const [treningExercise, setTreningExercise] = useState<TreningExerciseType[]>([]);
  const [loading, setLoading] = useState({ parties: true, partiesVariant: false });

  useEffect(() => {
    if (dialog.data) {
      setTrening(dialog.data);
      setTreningExercise(dialog.data.treningExercise);
      setPartiesChecked(dialog.data.parties.map((item) => ({ id: item.id, checked: true })));
      setPartiesVariant(dialog.data.partiesVariant);
    } else {
      setTrening(defaultValues);
    }
  }, [dialog.data]);

  useEffect(() => {
    if (dialog.open && parties.length === 0) {
      fetchParties();
    }
  }, [dialog.open]);

  const fetchParties = async () => {
    const response = await api.parties.list();
    setParties(response.data);
    setLoading({ ...loading, parties: false });
  };

  const fetchPartiesVariant = async (partieId: number) => {
    setLoading({ ...loading, partiesVariant: true });
    const response = await api.parties.relatives.partiesVariant.findByPartieId(partieId);
    setPartiesVariant([...partiesVariant, ...response.data]);
    setLoading({ ...loading, partiesVariant: false });
  };

  const handlePartiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (partiesChecked.some((item) => item.id === Number(event.target.name))) {
      const filterd = partiesChecked.filter((item) => item.id !== Number(event.target.name));
      setPartiesChecked(filterd);

      const variantsFilterd = partiesVariant.filter(
        (item) => item.partiesId !== Number(event.target.name)
      );
      setPartiesVariant(variantsFilterd);
    } else {
      setPartiesChecked([
        ...partiesChecked,
        { id: Number(event.target.name), checked: event.target.checked }
      ]);
      fetchPartiesVariant(Number(event.target.name));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTrening({ ...trening, [event.target.name]: event.target.value });
  };

  const onClose = () => {
    setTreningExercise([]);
    setPartiesChecked([]);
    setPartiesVariant([]);
    setDialog(false, 'ADD');
  };

  const handleSubmit = async () => {
    const data = {
      trening,
      treningExercise
    };

    if (dialog.mode === 'ADD') {
      const result = await api.trening.post(data);
      if (result.status === 200) {
        enqueueSnackbar('Záznam bol úspešne pridaný.', { variant: 'success' });
        fetchData();
        setDialog(false, 'ADD');
      } else {
        enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      }
    }

    if (dialog.mode === 'EDIT') {
      const result = await api.trening.update(data);
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
      <Dialog fullScreen open={dialog.open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {dialog.mode === 'ADD' ? 'Vytvoriť tréning' : 'Upraviť tréning'}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Uložiť
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              {loading.parties ? (
                'loading...'
              ) : (
                <Grid item xs={12}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Vyberte partiu</FormLabel>
                    <FormGroup>
                      {parties?.map((partie, key) => (
                        <div key={key}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={partiesChecked.some((item) => item.id === partie.id)}
                                onChange={handlePartiesChange}
                                name={partie.id.toString()}
                              />
                            }
                            label={partie.name}
                          />
                          <ExerciseList
                            partiesVariant={partiesVariant}
                            partieId={partie.id}
                            setTreningExercise={setTreningExercise}
                            treningExercise={treningExercise}
                          />
                        </div>
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  name="date"
                  label="Dátum"
                  variant="outlined"
                  type="date"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className={classes.input}
                  defaultValue={trening.date}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="time"
                  label="Trvanie tréningu"
                  variant="outlined"
                  type="time"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className={classes.input}
                  defaultValue={trening.time}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="caloriesBurned"
                  label="Spálené kalórie"
                  variant="outlined"
                  type="number"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className={classes.input}
                  defaultValue={trening.caloriesBurned}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Poznámky"
                  variant="outlined"
                  type="text"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className={classes.input}
                  defaultValue={trening.notes}
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
    },
    formControl: {
      margin: theme.spacing(0),
      width: '100%'
    }
  })
);
