import { Endpoints } from "../config/Endpoints";

export const HttpClient = {
  customFetch: (type, url, data, success, error, always) => {
    const option = {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data) {
      option.body = data;
    }
    fetch(Endpoints.BASE_URL + url, option)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((err) => {
        if (error && err.response) {
          error(err);
        }
      })
      .finally(() => {
        if (always) {
          always();
        }
      });
  },
};
