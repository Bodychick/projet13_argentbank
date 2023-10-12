import React ,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import { useDispatch, useSelector } from "react-redux";
import { changeName, getProfil } from "../state/store"



function Profil(){
    const dispatch = useDispatch();
    const status = useSelector((state) => state.status);
    const token = useSelector((state) => state.token);
    const firstName = useSelector((state) => state.firstName);
    const lastName = useSelector((state) => state.lastName);
    const navigate = useNavigate();
    const [nameEdit, editName] = useState(false);


    //Gestion de la modification du nom et pr
    const [firstNameEdit, editFirstName] = useState();
    const [lastNameEdit, editLastName] = useState();


   

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        if(status==="offline" && token=="none"){
            // Redirigez vers la page se-connecter
            console.log(status);
            navigate("/se-connecter");
        }
    },[navigate, status]);

    useEffect(() => {
        if(token!="none"){
            dispatch(getProfil(token));
        }
      }, [dispatch, token]);
    
      const handleSaveName = (event) => {
        event.preventDefault();
        console.log(firstNameEdit +" " + lastNameEdit+ " " + token);
        dispatch(changeName(firstNameEdit, lastNameEdit, token))
        editName(false);
        // dispatch sur edit profil
      };

    return(
        <main className="main bg-dark">
            {
                nameEdit === false ?
                <div className="header">
                    <h1>Welcome back<br />{firstName} {lastName}!</h1>
                    <button className="edit-button" onClick={() => editName(true)}>Edit Name</button>  
                 </div>
                 :
                 <div className="header">
                    <form>
                        <input type="text" onChange={(e) => editFirstName(e.target.value)}/>
                        <input type="text" onChange={(e) => editLastName(e.target.value)}/>
                        <button onClick={() => editName(false)}>Annuler </button>
                        <button onClick={handleSaveName}>Save </button>
                    </form>
                </div>

            }
            

            
            
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