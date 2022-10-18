import { PartiesCodeType, TreningExerciseType } from './types';

export const formatDate = (value: string): string => {
  const [year, month, day] = value.split('-');
  return `${day}.${month}.${year}`;
};

export const formatDateToField = (value: string): string => {
  const [day, month, year] = value.split('.');
  return `${year}-${month}-${day}`;
};

export const formatDecimal = (value: number | string): string => {
  return value.toString().replace('.', ',');
};

export const getPartiesColor = (partie: PartiesCodeType): string => {
  const colors = [
    { code: 'SHOULDERS', color: '#BF0413' },
    { code: 'BICEPS', color: '#F55F31' },
    { code: 'TRICEPS', color: '#666666' },
    { code: 'CHEST', color: '#168039' },
    { code: 'LEGS', color: '#3D7085' },
    { code: 'BACK', color: '#84119E' },
    { code: 'AEROBIC-EXERCISE', color: '#F252AA' },
    { code: 'COMPLEX-EXERCISE', color: '#202020' }
  ];

  const color = colors.find((color) => color.code === partie);
  return color?.color as string;
};

export const getTreningIntensity = (treningExercise: TreningExerciseType[]): number => {
  let treningIntensity = 0;
  treningExercise.map((item) => treningIntensity = treningIntensity + item.intensity);
  return treningIntensity;
};
