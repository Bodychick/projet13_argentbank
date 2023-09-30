import { createStore } from "redux";

const initialState = {
    user: 'CamperBot',
    status: 'offline',
    token: 'none',
    mail:'none'
  };


  //action creator
  export const seConnecter = () => ({type : "connexion"});

  export const seDeconnecter = () => ({type : 'deconnexion'});

  export const changerNom = () => ({type : 'changerNom'});


  function reducer(state = initialState, action) {
  if (action.type === "connexion") {
    return initialState;
  }
  if (action.type === "deconnexion") {
    return initialState;
  }
  if (action.type === "changerNom") {
    return initialState;
  }
  return state;
}

export const store = createStore(reducer);