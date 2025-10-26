import { getCookie } from "../helpers/cookie";

const API_DOMAIN = "http://localhost:5000";

export const get = async (path) => {
  const token = getCookie("token");
  const response = await fetch(API_DOMAIN + path, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  return await response.json();
};


export const post = async (path, options) => {
  const token = getCookie("token");
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(options)
  });
  const result = await response.json();
  return result;
}

export const del = async (path) => {
  const token = getCookie("token"); 

  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  });

  return await response.json();
};

export const patch = async (path, options) => {
  const token = getCookie("token");
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(options) 
  });
  const result = await response.json();
  return result;
}