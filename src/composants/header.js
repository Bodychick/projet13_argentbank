import React ,{ useEffect } from "react";
import argentBankLogo from '../pages/img/argentBankLogo.png'
import { useDispatch,  useSelector } from "react-redux";
import { disconnecting } from '../state/store';
import { useNavigate } from "react-router-dom";


function Header(){
    const status = useSelector((state) => state.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDisco = () => {
        // Appelez votre action disconnecting
        dispatch(disconnecting());
      };

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
                    Tony
                    </a>
                    <a className="main-nav-item" href="" onClick={handleDisco} >
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                    </a>
                </div>
                :
                <div>
                    <a className="main-nav-item" href="/se-connecter">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                    </a>
                </div> 
            }
        </nav>
      )
}

export default Header