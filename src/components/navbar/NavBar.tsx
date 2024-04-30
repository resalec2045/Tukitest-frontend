import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import "./navbar.css";
import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = ({ type }) => {
  const navigate = useNavigate();
  const { status, user, startLogout } = useAuthStore();

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsFixed(window.pageYOffset > navbarOriginalPosition);
    }
    const navbarOriginalPosition = document.getElementById("navbar")!.offsetTop;
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        id="navbar"
        className={`${type} ${isFixed ? "navbar-fixed" : ""}`}
      >
        <nav className="nav container">
          <div className="nav__logo">TUKITEST</div>
          <div className="nav__menu">
            <ul className="nav__list">
              {status === "authenticated" ? (
                <>
                  <li className="nav__item">
                    <a
                      onClick={() => navigate("/details")}
                      className="nav__link"
                    >
                      Mis Tests
                    </a>
                  </li>
                  <li className="nav__item">
                    <a
                      onClick={() => navigate("/informe")}
                      className="nav__link"
                    >
                      Informes
                    </a>
                  </li>
                </>
              ) : null}
              {user?.TIPO === "Profesor" || user?.TIPO === "Administrador" ? (
                <>
                  <li className="nav__item">
                    <a
                      onClick={() => navigate("/createQuiz")}
                      className="nav__link"
                    >
                      Crear Test
                    </a>
                  </li>
                  {/* TODO: HACER QUE SOLO EL ADMIN PUEDA VERLO */}
                  {/* <li className="nav__item">
                    <a
                      onClick={() => navigate("/informe")}
                      className="nav__link"
                    >
                      Informes
                    </a>
                  </li> */}
                </>
              ) : null}
            </ul>
          </div>
          <div className="search">
            <ul className="nav__list">
              {status !== "authenticated" ? (
                <li className="nav__item">
                  <a onClick={() => navigate("/auth")} className="nav__link">
                    Login
                  </a>
                </li>
              ) : (
                <li className="nav__item">
                  <a onClick={() => startLogout()} className="nav__link">
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
