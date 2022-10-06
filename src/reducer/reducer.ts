export default function reducer(state: any, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };

    case 'SET_MENU_OPEN':
      return {
        ...state,
        menuOpen: action.open
      };
    default:
      return state;
  }
}
