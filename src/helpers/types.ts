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

export type Trening = {};

export type PartiesType = {
  id: number;
  name: string;
  code: 'SHOULDERS' | 'BICEPS' | 'TRICEPS' | 'CHEST' | 'LEGS' | 'BELLY' | 'HIPS' | 'HIPS';
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

export type DialogMode = 'ADD' | 'EDIT';
