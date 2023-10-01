export const initialState = {
    user: 'none',
    status: 'offline',
    token: 'none',
    mail: 'none'
  };
  
  export function reducer(state = initialState, action) {
    switch (action.type) {
      case "SIGN_IN_SUCCESS":
        return {
          ...state,
          token: action.payload.token,
          status: 'online',
        };
      case "SIGN_IN_FAILURE":
        return {
          ...state,
          status: 'offline',
        };
        case "DISCONNECT":
            return {
                ...state,
                status:'offline'
            }
      // Ajoutez d'autres cas pour gérer d'autres actions si nécessaire
      default:
        return state;
    }
  }
  
  