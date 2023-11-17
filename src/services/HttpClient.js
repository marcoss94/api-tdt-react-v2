import { Endpoints } from "../config/Endpoints";

export const HttpClient = {
  customFetch: (type, url, data, success, error, always) => {
    const option = {
      method: type,
      headers: {
        Accept: "application/json",
        // Athorization: `Bearer ${Endpoints.API_KEY}`,
      },
    };
    if (type === "PUT") {
      option.headers["Content-Type"] = "application/json";
    }
    if (data) {
      option.body = data;
    }
    fetch(Endpoints.BASE_URL + url, option)
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return success(response);
          }
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
