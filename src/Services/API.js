import queryString from "query-string";
import Authentication from "./Authentication";

const BASE_URL = "https://todos-project-api.herokuapp.com";

export default class API {
  static getTodos = () => {
    const payload = this.cleanPayload({});
    return this.fetch(`todos?${queryString.stringify(payload)}`);
  };

  static getItemsTodos = (todoID) => {
    const payload = this.cleanPayload({});
    return this.fetch(
      `todos/${todoID}/items?${queryString.stringify(payload)}`
    );
  };

  static createGroupTask = (parameters = {}) => {
    const requestBody = this.cleanPayload({
      title: parameters.title,
      description: parameters.description,
    });

    return this.fetch(`todos`, {
      body: requestBody,
      method: "POST",
    });
  };

  static createItemsTodos = (todoID, parameters = {}) => {
    const requestBody = this.cleanPayload({
      name: parameters.name,
      progress_percentage: parameters.progress_percentage,
    });

    return this.fetch(`todos/${todoID}/items`, {
      body: requestBody,
      method: "POST",
    });
  };

  static moveItemsTodos = (todoID, itemID, targetTodoID) => {
    const requestBody = this.cleanPayload({
      target_todo_id: targetTodoID,
    });

    return this.fetch(`todos/${todoID}/items/${itemID}`, {
      body: requestBody,
      method: "PATCH",
    });
  };

  static updateItemsTodos = (todoID, itemID, parameters = {}) => {
    const requestBody = this.cleanPayload({
      name: parameters.name,
      progress_percentage: parameters.progress_percentage,
      target_todo_id: todoID,
    });

    return this.fetch(`todos/${todoID}/items/${itemID}`, {
      body: requestBody,
      method: "PATCH",
    });
  };

  static deleteItemsTodos = (todoID, itemsID) => {
    return this.fetch(`todos/${todoID}/items/${itemsID}`, {
      method: "DELETE",
    });
  };

  static register = (parameters = {}) => {
    const requestBody = this.cleanPayload({
      name: parameters.name,
      email: parameters.email,
      password: parameters.password,
      password_confirmation: parameters.password_confirmation,
    });

    return this.fetch(`signup`, {
      body: requestBody,
      method: "POST",
    });
  };

  static login = (email, password) => {
    const requestBody = this.cleanPayload({
      email: email,
      password: password,
    });

    return this.fetch(`auth/login`, {
      body: requestBody,
      method: "POST",
    });
  };

  static fetch = async (uri, config) => {
    const defaultConfig = {
      headers: {
        Accept: "application/json",
      },
    };

    const token = await Authentication.getToken();

    if (token) {
      defaultConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    const mergeConfig = { ...defaultConfig, ...config };
    let bodyConfig = {};
    if (mergeConfig.body && !(mergeConfig.body instanceof FormData)) {
      const form = new FormData();
      Object.entries(mergeConfig.body).map(([label, value]) => {
        if (Array.isArray(value)) {
          value.map((each, index) => {
            if (typeof each === "object") {
              Object.keys(each).map((key) => {
                form.append(`${label}[${index}][${key}]`, each[key]);
                return true;
              });
            } else {
              form.append(`${label}[]`, each);
            }
            return true;
          });
        } else {
          form.append(label, value);
        }

        return true;
      });
      bodyConfig = { body: form };
    }
    const cleanConfig = { ...mergeConfig, ...bodyConfig };
    const url = `${BASE_URL}/${uri}`;
    return fetch(url, cleanConfig)
      .then((res) => {
        if (res.status !== 200) {
          if (this.component) {
            let { errorAPI } = this.component.state;
            if (!errorAPI) {
              errorAPI = new Map();
            }
            errorAPI.set(uri, res.statusText);
            this.component.setState({ errorAPI: errorAPI });
          }
        }
        return res.json();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  static cleanPayload = (payload) => {
    Object.keys(payload).forEach(
      (key) => payload[key] == null && delete payload[key]
    );
    return payload;
  };
}
