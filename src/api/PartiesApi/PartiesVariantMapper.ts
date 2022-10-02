import { PartiesVariantApiType } from '../../helpers/types';

export const fromApi = (data: PartiesVariantApiType) => {
  return {
    id: data.id,
    partiesId: data.parties_id,
    name: data.name,
    code: data.code
  };
};
