import { formatDate } from '../../helpers/helpers';
import { Calorie, CalorieApi } from '../../helpers/types';

export const toApi = (data: Calorie): CalorieApi => {
  return {
    id: data.id,
    date: data.date,
    calories_consumed: Number(data.caloriesConsumed),
    calories_burned: Number(data.caloriesBurned),
    weight: Number(data.weight),
    notes: data.notes
  };
};

export const fromApi = (data: CalorieApi): Calorie => {
  return {
    id: data.id,
    date: formatDate(data.date),
    createdAt: data.created_at,
    caloriesConsumed: data.calories_consumed,
    caloriesBurned: data.calories_burned,
    deficit: data.deficit,
    weight: data.weight,
    notes: data.notes
  };
};
