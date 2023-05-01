import axios from "axios";

//baseurl
const baseUrl = "http://127.0.0.1:8000/api/";

//fetcher
export const fetcher = {
  get: get,
  post: post,
};

//get
async function get(path: string) {
  //url
  let url = baseUrl + path;

  //options
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(url, options);

  return handleResponse(res);
}

//post
async function post(path: string, body?: any) {
  //url
  let url = baseUrl + path;

  //options
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  let res = await fetch(url, options);
  return handleResponse(res);
}

async function handleResponse(res: any) {
  const data = await res.json();

  //handle the response
  if (res.status === 200) {
    return data;
  } else {
    return {
      error: true,
      message: res.statusText,
    };
  }
}
