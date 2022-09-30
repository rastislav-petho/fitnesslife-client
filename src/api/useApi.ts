import { AuthApi } from './AuthApi/AuthApi';
import { BodyApi } from './BodyApi';
import { CaloriesApi } from './CaloriesApi';
import { TreningApi } from './TreningApi';

export const useApi = () => {
  return {
    caloriesApi: CaloriesApi(),
    treningApi: TreningApi(),
    bodyApi: BodyApi(),
    authApi: AuthApi()
  };
};
