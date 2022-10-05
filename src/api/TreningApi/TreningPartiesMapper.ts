export const fromApi = (data: any) => {
  return {
    id: data.id,
    partiesId: data.parties_id,
    treningId: data.trening_id,
    name: data.name,
    code: data.code
  };
};
