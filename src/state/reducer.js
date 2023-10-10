export const initialState = {
    firstName: 'none',
    lastName:'none',
    id:"",
    status: 'offline',
    token: 'none',
    email: 'none',
  };

  export const SIGN_IN_SUCCESS="SIGN_IN_SUCCESS";
  export const SIGN_IN_FAILURE="SIGN_IN_FAILURE";
  export const DISCONNECT = "DISCONNECT";
  export const PROFIL = "PROFIL";
  export const PROFILERROR="PROFILERROR"
  
  export function reducer(state = initialState, action) {
    switch (action.type) {
      case SIGN_IN_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
          status: 'online',
        };
      case SIGN_IN_FAILURE:
        return {
          ...state,
          status: 'offline',
        };
      case DISCONNECT:
        return {
            ...state,
            status:'offline',
            token:'none',
        }
      case PROFIL:
        return {
            ...state,
            status:'online',
            firstName:action.payload.firstName,
            email:action.payload.email,
            lastName:action.payload.lastName,
            id:action.payload.id
        }
        case PROFILERROR:
        return {
            ...state,
            status:'online'
        }
      // Ajoutez d'autres cas pour gérer d'autres actions si nécessaire
      default:
        return state;
    }
  }
  
  