import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../state/store";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import "./css/connexion.css"

function Connexion(){
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const status = useSelector((state) => state.status);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); 

  const signInError = useSelector((state) => state.signinTry);

    useEffect(() => {
        if(signInError==="failure"){
            setLoginError(true);
        }
    },[signInError]);


  const handleSignIn = async () => {
    if (!username || !password) {
      alert("Veuillez entrer un email et mot de passe");
      return;
    }

    try {
        await dispatch(signIn(username, password));
        setLoginError(""); // Réinitialiser l'erreur s'il n'y a pas eu d'erreur de connexion
      } catch (error) {
        console.log("je suis l'erreur : " + error)
        setLoginError(error.message); // Stocker le message d'erreur dans l'état local
      }
  };

  /*const handleSignIn = () => {
    // Validez les données du formulaire localement ici avant d'appeler signIn
    if (!username || !password) {
      alert("Veuillez entrer un email et mot de passe");
      return;
    }

    // Appelez votre action signIn avec les valeurs de username et password
    dispatch(signIn(username, password));
    if(status==="online"){
        // Redirigez vers la page Profil
         navigate("/profil");
      }
  };*/

    useEffect(() => {
        if(status==="online"){
            // Redirigez vers la page Profil
            navigate("/profil");
        }
    },[navigate, status]);


    return(
        <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form>
            <div className={`input-wrapper ${signInError ? 'error' : ''}`}>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={signInError ? 'error-border' : ''} // Classe pour le contour en cas d'erreur
            />
          </div>
          <div className={`input-wrapper ${signInError ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={signInError ? 'error-border' : ''} // Classe pour le contour en cas d'erreur
            />
          </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" /><label htmlFor="remember-me" >Remember me</label>
            </div>
            <a href="#" className="sign-in-button" onClick={handleSignIn}>Sign In</a>
            </form>
            {signInError && <p style={{ color: 'red' }}>Error: User not found!</p>}         </section>
     </main>
     )
}

export default Connexion