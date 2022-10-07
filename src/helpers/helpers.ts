import { PartiesCodeType } from './types';

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
    { code: 'SHOULDERS', color: 'red' },
    { code: 'BICEPS', color: 'orange' },
    { code: 'TRICEPS', color: 'grey' },
    { code: 'CHEST', color: 'green' },
    { code: 'LEGS', color: 'blue' },
    { code: 'BACK', color: 'purple' },
    { code: 'AEROBIC-EXERCISE', color: 'pink' }
  ];

  const color = colors.find((color) => color.code === partie);
  return color?.color as string;
};
