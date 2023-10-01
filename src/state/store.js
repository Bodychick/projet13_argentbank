import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer"


export const signInSuccess = (token, email) => ({
  type: "SIGN_IN_SUCCESS",
  payload: { token, email },
});

export const signInFailure = (error) => ({
  type: "SIGN_IN_FAILURE",
  payload: { error },
});

export const disconnecting = () => ({
  type: "DISCONNECT",
});

export const signIn = (email, password) => {
  console.log(email,password)
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


export const store = createStore(reducer, applyMiddleware(thunk));

