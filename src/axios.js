import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  //From functions/index.js --->Firebase Emulator
  baseURL: 'http://localhost:5001/clone-69cd8/us-central1/api'
});

export default instance;


