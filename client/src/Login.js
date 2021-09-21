import React, { useState, useContext, useEffect } from "react";
import { FetchContext } from "./contextAPI/FetchContext";

import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Add meg a felhasználóneved!"),
  password: Yup.string().required("Add meg a jelszavad!"),
});

function Login() {
  const fetchContext = useContext(FetchContext);
  const { methods, variables } = fetchContext;

  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const submitCredentials = async (credentials) => {
      setLoginLoading(true);
      const { data } = await methods.login(credentials);

      setLoginSuccess(data.message);
      setLoginError(null);
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
  };

  const init = async () => await methods.getCSRF();
  useEffect(() => init(), []);

  return (
    <React.Fragment>
      {redirectOnLogin && <Redirect to="/drive/my-drive" />}
      <div>
        <h1>Hello World!</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => submitCredentials(values)}
          validationSchema={LoginSchema}
        >
          <Form>
            <label className="label">Felhasználónév</label>
            <Field
              className="input"
              name="username"
              type="text"
              placeholder="Add meg a felhasználónevedet"
            />
            <label className="label">Jelszó</label>
            <Field
              className="input"
              name="password"
              type="password"
              placeholder="Add meg a jelszavad"
            />
            <button
              disabled={loginLoading}
              type="submit"
              className="button is-medium is-rounded is-info is-fullwidth"
            >
              Bejelentkezés
            </button>
          </Form>
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default Login;
