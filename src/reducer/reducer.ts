export default function reducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}
