export type User = {
  id: number;
  name: string;
  email: string;
  token: string;
};

export type Message = {
  type: "success" | "danger" | "warning" | "info" | null;
  message: string | null;
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

export type Trening = {};

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