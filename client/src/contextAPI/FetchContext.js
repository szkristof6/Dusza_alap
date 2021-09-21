import React from "react";
import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const [CSRFtoken, setCSRFtoken] = useState(null);
  const API_URL = "/api/";
  const history = useHistory();

  const authAxios = axios.create({
    baseURL: API_URL,
    mode: "cors",
    credentials: "same-origin",
    headers: {"X-CSRFToken": CSRFtoken},
    xsrfHeaderName: "X-CSRFToken",
  });

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <Provider
      value={{
        variables: {
          CSRFtoken,
        },
        methods: {
          getCSRF: async () => {
            try {
              await axios.get(`${API_URL}GCSF`, {
                mode: "cors",
                credentials: "same-origin",
              });
              setCSRFtoken(getCookie('XSRF-TOKEN'))
            } catch (error) {
              console.log(error);
            }

          },
          checkPermission: async () => {
            try {
              const { data } = await authAxios.get("CSPSm");
              console.log(data);

              return true;
            } catch (error) {
              history.push("/login");
            }
          },
          login: async function login(credentials) {
            try {
              const { data } = await authAxios.post("LGN", credentials);
              
              console.log(data);
            } catch (error) {
              console.log(error);
            }
          },
        },
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
