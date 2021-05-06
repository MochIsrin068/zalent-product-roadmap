import { useState } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import Authentication from "../../Services/Authentication";

import { Button } from "../../Components";

const Login = () => {
  const history = useHistory();
  const [inputData, setInputData] = useState({
    email: null,
    password: null,
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onLogin = () => {
    setIsSubmiting(true);

    Authentication.login(inputData.email, inputData.password).then(
      (response) => {
        const isLoginSuccess = response?.auth_token || null;
        if (isLoginSuccess !== null) {
          // history.push("/");
          window.location.reload();
        } else {
          message.error(`${response?.message}`);
        }
        setIsSubmiting(false);
      }
    );
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Zalent Mini Project</h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            required
            value={inputData.email}
            onChange={({ target: { value } }) =>
              setInputData((prevState) => ({ ...prevState, email: value }))
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={inputData.password}
            onChange={({ target: { value } }) =>
              setInputData((prevState) => ({ ...prevState, password: value }))
            }
          />
          <Button
            label={isSubmiting ? "Loading..." : "Login"}
            onAction={onLogin}
          />
        </div>
        <Button
          label="Register"
          onAction={() => history.push("/register")}
          type="secoundary"
        />
      </div>
    </div>
  );
};

export default Login;
