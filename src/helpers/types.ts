export type User = {
  id: number;
  name: string;
  email: string;
  token: string;
};

export type CalorieApi = {
  id?: number;
  date: string;
  created_at?: Date;
  calories_consumed: number;
  calories_burned: number;
  deficit?: number;
  weight: number;
  notes: string;
};

export type Calorie = {
  id?: number;
  createdAt?: Date;
  deficit?: number;
  date: string;
  caloriesConsumed: number;
  caloriesBurned: number;
  weight: number;
  notes: string;
};

export type Body = {
  id?: number;
  arm: number;
  neck: number;
  belt: number;
  belly: number;
  ass: number;
  forearm: number;
  calf: number;
  thigh: number;
  chest: number;
  date: string;
};

export type TreningType = {
  id?: number;
  userId?: number;
  caloriesBurned: number | null;
  date: string;
  time: string;
  notes: string;
  parties: PartiesType[];
  treningExercise: TreningExerciseType[];
  partiesVariant: PartiesVariantType[];
};

export type TreningExerciseType = {
  id?: number;
  treningId?: number;
  partiesVariantId: number;
  partieId: number;
  name: string;
  reps: number;
  series: number;
  weight: number;
  notes: string;
};

export type TreningExerciseApiType = {
  id: number;
  trening_id: number;
  parties_variant_id: number;
  parties_id: number;
  name: string;
  reps: number;
  series: number;
  weight: number;
  notes: string;
};

export type PartiesCodeType =
  | 'SHOULDERS'
  | 'BICEPS'
  | 'TRICEPS'
  | 'CHEST'
  | 'LEGS'
  | 'BELLY'
  | 'BACK'
  | 'AEROBIC-EXERCISE';

export type PartiesType = {
  id: number;
  name: string;
  code: PartiesCodeType;
};

export type PartiesApiType = PartiesType;

export type PartiesVariantType = {
  id: number;
  partiesId: number;
  name: string;
  code: string;
};

export type PartiesVariantApiType = {
  id: number;
  parties_id: number;
  name: string;
  code: string;
};

export type Register = {
  name: string;
  password: string;
  passwordAgain: string;
  email: string;
};

export type Login = {
  email: string;
  password: string;
};

export type DialogMode = 'ADD' | 'EDIT' | 'COPY';
