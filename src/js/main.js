const form = document.querySelector(".is-form");
const input = document.querySelector(".is-input");
const content = document.querySelector(".is-content");
const img = document.querySelector(".img-opal");
const typedString = document.querySelector(".was-sent");
const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
const mobile = window.innerWidth < 1170;

window.onload = e => {
  if (isSafari) {
    document.querySelector("body").classList.add("isIos");
  }

  if (mobile) {
    input.setAttribute("autofocus", false);
  }

  const validateEmail = email => {
    var reExpress = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = reExpress.test(String(email).toLowerCase());

    if (result) {
      sendData(email);
      showTyped();
      if (mobile) {
        input.blur();
      }
    } else {
      form.classList.add("has-error");
    }

    return;
  };

  input.addEventListener(
    "keydown",
    _.debounce(() => validateEmail(input.value), 2000)
  );

  form.onsubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    validateEmail(input.value);
    return;
  };

  const showTyped = () => {
    content.classList.add("is-hidden");
    content.addEventListener("transitionend", e => {
      e.target.style.display = "none";

      document.querySelector("#typed").style.display = "block";

      const typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 60,
        smartBackspace: true,
        fadeOut: true
      });
    });
  };

  img.onclick = () => {
    showTyped();
  };
};

const sendData = email => {
  const data = {
    email_address: email,
    status: "subscribed"
  };

  fetch("https://us3.api.mailchimp.com/3.0/lists/40008a7d7a/members", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      authorization: "apikey d4e83080955451a61de5fda1e8295b55-us3"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

// desktop move circle 1 vw
// fonts
// mobile move circle left+top
// move texts by 25px to the bottom
