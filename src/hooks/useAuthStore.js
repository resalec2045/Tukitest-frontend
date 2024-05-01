import { useDispatch, useSelector } from "react-redux";

import {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  onGroups,
} from "../store/auth/authSlice";

import tukytestApi from "../api/tukytestApi";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const { status, user, grupo, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const startGetGroups = async () => {
    try {
      const { data } = await tukytestApi.get(
        `/auth/obtener_grupos/${user.usuario.ID}`
      );

      dispatch(onGroups({ ...data }));
    } catch (error) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.post("/auth/login", {
        email,
        password,
      });

      // localStorage.setItem('token', data.token);

      // updateAuthToken(data.token);

      dispatch(onLogin({ ...data }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.post("auth/new", {
        name,
        email,
        password,
      });

      dispatch(onLogin({ ...data }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || "---"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  // const checkAuthToken = async () => {
  // 	const token = localStorage.getItem('token');

  // 	if (!token) return dispatch(onLogout(''));

  // 	try {
  // 		const headers = {
  // 			xtoken: localStorage.getItem('token'),
  // 		};

  // 		const { data } = await tukytestApi.get('auth/renewJwt', { headers });
  // 		localStorage.setItem('token', data.token);
  // 		localStorage.setItem('token-init-plate', `${new Date().getTime()}`);
  // 		dispatch(onLogin({ name: data.name, uid: data.uid, role: data.role }));
  // 	} catch (error) {
  // 		localStorage.clear();
  // 		dispatch(onLogout(''));
  // 	}
  // };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(""));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Su sección fue cerrada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return {
    // Propiedades
    status,
    user,
    grupo,
    errorMessage,

    // metodos
    startLogin,
    startRegister,
    startLogout,
    startGetGroups,
  };
};
