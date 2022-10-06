import { PartiesApiType, TreningExerciseApiType, TreningType } from '../../helpers/types';

export const fromApi = (data: any): TreningType => {
  const mapedData = {
    id: data.id,
    notes: data.notes,
    caloriesBurned: data.calories_burned,
    time: data.time,
    date: data.date,
    parties: data.parties.map((item: PartiesApiType) => ({
      id: item.id,
      name: item.name,
      code: item.code
    })),
    treningExercise: data.treningExercise.map((item: TreningExerciseApiType) => ({
      id: item.id,
      partiesVariantId: item.parties_variant_id,
      treningId: item.trening_id,
      partieId: item.parties_id,
      name: item.name,
      reps: item.reps,
      series: item.series,
      weight: item.weight,
      notes: item.notes
    })),
    partiesVariant: data.partiesVariant.map((item: any) => ({
      id: item.id,
      partiesId: item.parties_id,
      name: item.name,
      code: item.code
    }))
  };

  return mapedData;
};
