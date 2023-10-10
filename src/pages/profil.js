import React ,{ useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import { useDispatch, useSelector } from "react-redux";
import { getProfil } from "../state/store"


function Profil(){
    const dispatch = useDispatch();
    const status = useSelector((state) => state.status);
    const token = useSelector((state) => state.token);
    const firstName = useSelector((state) => state.firstName);
    const lastName = useSelector((state) => state.lastName);
    const navigate = useNavigate();

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        if(status==="offline" && token!=="none"){
            // Redirigez vers la page se-connecter
            console.log(status);
            navigate("/se-connecter");
        }
    },[navigate, status]);

    useEffect(() => {
       dispatch(getProfil(token));

      }, [dispatch, token]);

    return(
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            </main>
     )
}

export default Profil