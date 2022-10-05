import { List } from '@material-ui/core';
import { PartiesVariantType, TreningExerciseType } from '../../helpers/types';
import { TreningPartiesExercise } from './TreningPartiesExercise';

type ExerciseListProps = {
  partiesVariant: PartiesVariantType[];
  partieId: number;
  setTreningExercise: React.Dispatch<React.SetStateAction<TreningExerciseType[]>>;
  treningExercise: TreningExerciseType[];
};

export const ExerciseList = (props: ExerciseListProps) => {
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {props.partiesVariant.map(
        (item: PartiesVariantType, key: number) =>
          item.partiesId === props.partieId && (
            <TreningPartiesExercise
              key={key}
              partiesVariantId={item.id}
              name={item.name}
              setTreningExercise={props.setTreningExercise}
              treningExercise={props.treningExercise}
              partieId={props.partieId}
            />
          )
      )}
    </List>
  );
};
