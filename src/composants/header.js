import React, {useEffect} from "react";
import argentBankLogo from '../pages/img/argentBankLogo.png'
import { useDispatch,  useSelector } from "react-redux";
import { disconnecting, store } from '../state/store';

function Header(){
    const status = useSelector((state) => state.status);
    const dispatch = useDispatch();
    const firstName = useSelector((state) => state.firstName);

    const handleDisco = () => {
        console.log("Disco")
        // Appelez votre action disconnecting
        dispatch(disconnecting());
    };

    const state = store.getState();
    console.log(state);

    return(
        <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                className="main-nav-logo-image"
                src={argentBankLogo}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            {
                status === "online" ? 
                <div>
                    <a className="main-nav-item" href="/profil">
                    <i className="fa fa-user-circle"></i>
                    {firstName}
                    </a>
                    <a className="main-nav-item" href="" onClick={handleDisco} >
                    <i className="fa fa-sign-out"></i>
                    Se déconnecter
                    </a>
                </div>
                :
                <div>
                    <a className="main-nav-item" href="/se-connecter">
                    <i className="fa fa-user-circle"></i>
                    Se connecter
                    </a>
                </div> 
            }
        </nav>
      )
}

export default Header