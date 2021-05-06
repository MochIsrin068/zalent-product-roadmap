import { useState } from "react";
import { message } from "antd";

import { Button } from "../../Components";

import API from "../../Services/API";
import Authentication from "../../Services/Authentication";

const Register = () => {
  const [inputData, setInputData] = useState({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onRegister = () => {
    setIsSubmiting(true);

    API.register(inputData).then((response) => {
      const isRegisterSuccess = response?.auth_token || null;
      if (isRegisterSuccess !== null) {
        Authentication.setToken(isRegisterSuccess, inputData.email);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        message.error(`${response?.message}`);
      }
      setIsSubmiting(false);
    });
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Zalent Mini Project</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            required
            value={inputData.name}
            onChange={({ target: { value } }) =>
              setInputData((prevState) => ({ ...prevState, name: value }))
            }
          />
          <input
            type="email"
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
          <input
            type="password"
            placeholder="Password Confirmation"
            required
            value={inputData.password_confirmation}
            onChange={({ target: { value } }) =>
              setInputData((prevState) => ({
                ...prevState,
                password_confirmation: value,
              }))
            }
          />
          <Button
            label={isSubmiting ? "Loading..." : "Register"}
            onAction={onRegister}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
