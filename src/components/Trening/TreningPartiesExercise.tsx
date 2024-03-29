import {
  ListItem,
  ListItemText,
  Collapse,
  Grid,
  Button,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useState } from 'react';
import { TreningExerciseType } from '../../helpers/types';
import { TreningVariantExercise } from './TreningVariantExercise';

type TreningPartiesExerciseProps = {
  partiesVariantId: number;
  name: string;
  setTreningExercise: React.Dispatch<React.SetStateAction<TreningExerciseType[]>>;
  treningExercise: TreningExerciseType[];
  partieId: number;
};

export const TreningPartiesExercise = (props: TreningPartiesExerciseProps) => {
  const classes = useStyles();
  const { name, partiesVariantId, setTreningExercise, treningExercise, partieId } = props;
  const [open, setOpen] = useState(false);

  const defaultTreningPartiesExerciseValues = {
    partiesVariantId: partiesVariantId,
    partieId: partieId,
    name: '',
    reps: 0,
    series: 0,
    weight: 0,
    intensity: 0,
    notes: ''
  };

  const handleAddExercise = () => {
    setTreningExercise((prev) => [...prev, defaultTreningPartiesExerciseValues]);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  let count = 0;
  const filterExercise: TreningExerciseType[] | undefined = treningExercise.filter(
    (item) => item.partiesVariantId === partiesVariantId
  );
  if (filterExercise.length !== 0) {
    count = filterExercise.length;
  }

  return (
    <div>
      <ListItem button onClick={handleClick} className={classes.list}>
        <ListItemText primary={`${name} (${count})`} className={classes.listItem} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <Grid container spacing={1} className={classes.exerciseContainer}>
          {treningExercise.map(
            (item, key) =>
              partieId === item.partieId &&
              partiesVariantId === item.partiesVariantId && (
                <TreningVariantExercise
                  key={key}
                  index={key}
                  treningExercise={treningExercise}
                  setTreningExercise={setTreningExercise}
                />
              )
          )}
        </Grid>
        <Button variant="text" color="secondary" size="small" onClick={() => handleAddExercise()}>
          Pridať cvik
        </Button>
      </Collapse>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exerciseContainer: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    listItem: {
      color: theme.palette.secondary.main
    },
    list: {
      borderBottom: `1px solid ${theme.palette.secondary.main}`
    }
  })
);
