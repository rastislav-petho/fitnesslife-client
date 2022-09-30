import { AuthApi } from './AuthApi/AuthApi';
import { CaloriesApi } from './CaloriesApi';
import { TreningApi } from './TreningApi';

export const useApi = () => {
  return {
    caloriesApi: CaloriesApi(),
    treningApi: TreningApi(),
    authApi: AuthApi()
  };
};
