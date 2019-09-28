const axios = require("axios");
const qs = require("querystring");

const body = {
  RedirectAfterLoginUrl: "https://www.mql5.com/en",
  ShowOpenId: "True",
  ViewType: 0,
  Login: "alglowtrading",
  Password: "2m6a5t1t5"
};

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

axios
  .post("https://www.mql5.com/en/oauth/login", qs.stringify(body), config)
  .then(result => {
    console.log(result);
  });
