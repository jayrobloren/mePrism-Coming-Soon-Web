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
      console.log(input.value);
      // send here
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
