import axios from "axios";
const API_KEY = "AIzaSyClztH_LgdmoIMyHx6HYfR_m7Y88F-9u1Q";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}

export async function createUser(email, password) {
  const token = await authenticate("signUp", email, password);
  return token;
}

export async function login(email, password) {
  const token = await authenticate("signInWithPassword", email, password);
  return token;
}
