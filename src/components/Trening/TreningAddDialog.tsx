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
  Menu,
  MenuItem,
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
import { TreningCopyDialog } from './TreningCopyDialog';
import { TreningDetailDialog } from './TreningDetailDialog';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TreningAddDialogProps = {
  dialog: TreningDialog;
  setDialog: (value: boolean, mode: DialogMode, data?: TreningType) => void;
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
  const [actionMenu, setActionMenu] = React.useState<null | HTMLElement>(null);

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
      const filteredChecked = partiesChecked.filter(
        (item) => item.id !== Number(event.target.name)
      );
      const filterdExercise = treningExercise.filter(
        (item) => item.partieId !== Number(event.target.name)
      );
      setPartiesChecked(filteredChecked);
      setTreningExercise(filterdExercise);

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

  const handleDeleteSubmit = async () => {
    const confirm = window.confirm('Naozaj si prajete zmazať tréning?');
    if (confirm) {
      const result = await api.trening.remove(trening.id as number);
      if (result.status === 200) {
        enqueueSnackbar('Záznam bol úspešne aktualizovaný.', {
          variant: 'success'
        });
        fetchData();
        setDialog(false, 'ADD');
      }
    }
  };

  const handleCopySubmit = async () => {
    const data = {
      trening,
      treningExercise
    };
    const result = await api.trening.post(data);
    if (result.status === 200) {
      enqueueSnackbar('Záznam bol úspešne pridaný.', { variant: 'success' });
      fetchData();
      setDialog(false, 'ADD');
    } else {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
    }
  };

  const handleCopyDialogOpen = () => {
    setDialog(true, 'COPY');
  };

  const handleCopyDialogClose = () => {
    setDialog(true, 'EDIT');
    setActionMenu(null);
  };

  const handleOpenActionMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionMenu(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setActionMenu(null);
  };

  const handleDetailDialogOpen = () => {
    setDialog(true, 'DETAIL', trening);
  };

  const handleDetailDialogClose = () => {
    setDialog(true, 'EDIT');
    setActionMenu(null);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={dialog.open && (dialog.mode === 'EDIT' || dialog.mode === 'ADD')}
        onClose={onClose}
        TransitionComponent={Transition}>
        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {dialog.mode === 'ADD' ? 'Vytvoriť tréning' : 'Upraviť tréning'}
            </Typography>
            {dialog.mode === 'EDIT' && (
              <>
                <Button
                  color="inherit"
                  aria-controls="akcia-menu"
                  aria-haspopup="true"
                  onClick={handleOpenActionMenu}>
                  Akcia
                </Button>
                <Menu
                  id="akcia-menu"
                  anchorEl={actionMenu}
                  keepMounted
                  open={Boolean(actionMenu)}
                  onClose={handleCloseActionMenu}>
                  <MenuItem onClick={handleSubmit}>Uložiť</MenuItem>
                  <MenuItem onClick={handleDetailDialogOpen}>Detail</MenuItem>
                  <MenuItem onClick={handleCopyDialogOpen}>Kopírovať</MenuItem>
                  <MenuItem onClick={handleDeleteSubmit}>Zmazať</MenuItem>
                </Menu>
              </>
            )}
            {dialog.mode === 'ADD' && (
              <Button color="inherit" onClick={handleSubmit}>
                Uložiť
              </Button>
            )}
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
      <TreningCopyDialog
        open={dialog.open && dialog.mode === 'COPY'}
        handleCopyDialogClose={handleCopyDialogClose}
        handleChange={handleChange}
        onSubmit={handleCopySubmit}
      />
      <TreningDetailDialog
        open={dialog.open && dialog.mode === 'DETAIL'}
        onClose={handleDetailDialogClose}
        trening={trening}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
