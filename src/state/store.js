import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {SIGN_IN_SUCCESS,SIGN_IN_FAILURE,DISCONNECT, PROFIL, PROFILERROR} from './reducer'
import persistConfig from './persistConfig'; // Importez la configuration de persistConfig que vous avez créée

const persistedReducer = persistReducer(persistConfig, reducer);

export const signInSuccess = (token, email) => ({
  type: SIGN_IN_SUCCESS,
  payload: { token, email },
});

export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: { error },
});

export const disconnecting = () => ({
  type: DISCONNECT,
});

export const profil = (email, id, firstName, lastName) => ({
  type: PROFIL,
  payload:{ firstName, lastName, email, id }
});

export const profilError = (error) => ({
  type: PROFILERROR,
  payload: { error },
});

export const signIn = (email, password) => {
  console.log(email,password);
  return async (dispatch) => {
    try {
      // Effectuez votre appel API ici 
      const response = await fetch("http://localhost:3001/api/v1/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { token } = data.body;
        // Si l'appel API réussit, dispatchez l'action signInSuccess avec le token
        dispatch(signInSuccess(token,email));
        // Après avoir dispatché l'action, obtenez l'état actuel de l'application
        const currentState = store.getState();
        
        // Affichez l'état dans la console
        console.log("État actuel de l'application :", currentState);
       
      } else {
        // Si l'appel API échoue, dispatchez l'action signInFailure avec une erreur appropriée
        dispatch(signInFailure("Invalid username or password"));
      }
    } catch (error) {
      // En cas d'erreur, dispatchez l'action signInFailure avec l'erreur
      dispatch(signInFailure("An error occurred"));
    }
  };
};

export const getProfil = (token) => {
  console.log(token);
  return async (dispatch) => {
    try {
      // Effectuez votre appel API ici 
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
       // body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { email, id, firstName, lastName } = data.body;
        console.log(firstName)
        // Si l'appel API réussit, dispatchez l'action getProfilInfo
        dispatch(profil(email, id, firstName, lastName ));
        // affichage du state
        const currentState = store.getState();
        
        console.log("État actuel de l'application :", currentState);
       
      } else {
        // Si l'appel API échoue
        dispatch(profilError("Problème avec le token"));
      }
    } catch (error) {
      // En cas d'erreur
      dispatch(profilError("An error occurred"));
    }
  };
};

export const changeName = (firstName, lastName, token) => {
  console.log(firstName + " " + lastName);
  return async (dispatch) => {
    try {
      // Effectuez votre appel API ici 
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { email, id, firstName, lastName } = data.body;
        // Si l'appel API réussit, dispatchez l'action getProfilInfo
        dispatch(profil(email, id, firstName, lastName ));
        // affichage du state
        const currentState = store.getState();
        console.log("État actuel de l'application :", currentState);
       
      } else {
        // Si l'appel API échoue
        dispatch(profilError("Problème avec le token"));
      }
    } catch (error) {
      // En cas d'erreur
      dispatch(profilError("An error occurred"));
    }
  };
};

export const store = createStore(
  persistedReducer, // Utilisez le reducer persisté
  applyMiddleware(thunk)
);

export const persistor = persistStore(store); // Créez le persistor