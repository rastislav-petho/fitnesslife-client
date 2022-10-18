import { Grid, TextField, makeStyles, Theme, createStyles, Button, Card } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TreningExerciseType } from '../../helpers/types';

type TreningVariantExerciseProps = {
  index: number;
  setTreningExercise: React.Dispatch<React.SetStateAction<TreningExerciseType[]>>;
  treningExercise: TreningExerciseType[];
};

export const TreningVariantExercise = (props: TreningVariantExerciseProps) => {
  const classes = useStyles();
  const { index, treningExercise, setTreningExercise } = props;

  const handleChange = (event: any) => {
    setTreningExercise((prevState) => {
      const newState = prevState.map((obj, key) => {
        if (key === index) {
          return { ...obj, [event.target.name]: event.target.value };
        }
        return obj;
      });

      return newState;
    });
  };

  const handleRemoveExercise = (index: number) => {
    const valueToRemove = [treningExercise[index]];
    const filtered = treningExercise.filter((element) => !valueToRemove.includes(element));
    setTreningExercise(filtered);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <Card className={classes.card}>
        <TextField
          name="name"
          label={`${index + 1}. cvik`}
          variant="outlined"
          type="text"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          className={classes.exerciseInput}
          defaultValue={treningExercise[index].name}
        />
        <TextField
          name="weight"
          label="Váha"
          variant="outlined"
          type="number"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          className={classes.exerciseInput}
          defaultValue={treningExercise[index].weight}
        />
        <TextField
          name="series"
          label="Série"
          variant="outlined"
          type="number"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          className={classes.exerciseInput}
          defaultValue={treningExercise[index].series}
        />
        <TextField
          name="reps"
          label="Počet opakovaní"
          variant="outlined"
          type="number"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          className={classes.exerciseInput}
          defaultValue={treningExercise[index].reps}
        />
        <TextField
          name="notes"
          label="Poznámky"
          variant="outlined"
          type="text"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          className={classes.exerciseInput}
          defaultValue={treningExercise[index].notes}
        />
        <div className={classes.remove}>
          <Button onClick={() => handleRemoveExercise(index)}>
            <DeleteForeverIcon className={classes.removeIcon} />
          </Button>
        </div>
      </Card>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exerciseInput: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    remove: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    removeIcon: {
      color: theme.palette.error.main
    },
    card: {
      padding: theme.spacing(2)
    }
  })
);
