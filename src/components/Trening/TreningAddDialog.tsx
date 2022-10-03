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
  Collapse,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  TextField
} from '@material-ui/core';
import { useApi } from '../../api/useApi';
import { Calorie, DialogMode, PartiesType, PartiesVariantType } from '../../helpers/types';
import { formatDateToField } from '../../helpers/helpers';

import { TreningDialog } from './useTrening';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';

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

type TreningAddDialogFormType = {
  date: string;
  caloriesConsumed: number | null;
  caloriesBurned: number | null;
  deficit: number | null;
  weight: number | null;
  notes: string;
};

const defaultValues = {
  date: '',
  caloriesConsumed: null,
  caloriesBurned: null,
  deficit: null,
  weight: null,
  notes: ''
};

export const TreningAddDialog = (props: TreningAddDialogProps) => {
  const classes = useStyles();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { dialog, setDialog, fetchData } = props;

  const [data, setData] = useState<TreningAddDialogFormType>(defaultValues);
  const [parties, setParties] = useState<PartiesType[]>();
  const [partiesVariant, setPartiesVariant] = useState<PartiesVariantType[]>([]);
  const [partiesChecked, setPartiesChecked] = useState<{ id: number; checked: boolean }[]>([]);
  const [loading, setLoading] = useState({ parties: true, partiesVariant: false });

  useEffect(() => {
    if (dialog.open) {
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
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (dialog.mode === 'ADD') {
      const result = await api.calories.post(data as Calorie);
      if (result.status === 200) {
        enqueueSnackbar('Záznam bol úspešne pridaný.', { variant: 'success' });
        fetchData();
        setDialog(false, 'ADD');
      } else {
        enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      }
    }

    if (dialog.mode === 'EDIT') {
      const result = await api.calories.update(data as Calorie);
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
              Vytvoriť tréning
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
              {loading.parties ? (
                'loading...'
              ) : (
                <Grid item xs={12}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Vyberte partiu</FormLabel>
                    <FormGroup>
                      {parties?.map((partie) => (
                        <>
                          <FormControlLabel
                            key={partie.id}
                            control={
                              <Checkbox
                                checked={partiesChecked.some((item) => item.id === partie.id)}
                                onChange={handlePartiesChange}
                                name={partie.id.toString()}
                              />
                            }
                            label={partie.name}
                          />
                          <ExerciseList partiesVariant={partiesVariant} partieId={partie.id} />
                        </>
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              )}
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
    exerciseContainer: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    exerciseInput: {
      width: '100%'
    },
    formControl: {
      margin: theme.spacing(0),
      width: '100%'
    }
  })
);

function ExerciseList(props: any) {
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {props.partiesVariant.map(
        (item: PartiesVariantType, key: number) =>
          item.partiesId === props.partieId && (
            <Exercise {...item} partieId={props.partieId} key={key} />
          )
      )}
    </List>
  );
}

function Exercise(props: any) {
  const classes = useStyles();
  const { name, code, id, partiesId } = props;
  const [open, setOpen] = useState(false);
  const [exercises, setExercises] = useState([{ id, name, code, partiesId }]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { id, name, code, partiesId }]);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <Button variant="text" color="secondary" size="small" onClick={handleAddExercise}>
          Pridať cvik
        </Button>
        <Grid container spacing={1} className={classes.exerciseContainer}>
          {exercises.map((item, key) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <TextField
                name={`${item.code}-${key}`}
                label={`${key + 1}. cvik`}
                variant="outlined"
                type="text"
                onChange={() => console.log(id, partiesId)}
                InputLabelProps={{ shrink: true }}
                className={classes.exerciseInput}
                defaultValue=""
              />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </div>
  );
}
