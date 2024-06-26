// import logo from '../../../assets/logo.png';

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useForm } from "../../../hooks/useForm";
import "../Auth.css";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const Login = ({ selectPage }) => {
  const { startLogin } = useAuthStore();

  const navigate = useNavigate();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
    navigate("/details");
  };

  return (
    <>
      <main className="main_auth">
        <div className="page grid">
          <div className="auth__box grid">
            {/* <img className='auth__logo' src={logo} alt='logo' /> */}
            <h1>Iniciar sesión</h1>
            <form className="form grid" onSubmit={loginSubmit}>
              <div className="group-input">
                <i className="bx bxs-user-circle input-icon"></i>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input_login"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
              </div>
              <div>
                <div className="group-input">
                  <i className="bx bxs-lock-alt input-icon"></i>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="input input_login"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={onLoginInputChange}
                  />
                </div>
              </div>
              <input className="submit-button" type="submit" value="Ingrese" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
