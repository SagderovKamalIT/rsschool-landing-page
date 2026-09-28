const themeButton = document.querySelector(".js-theme-button");
const themeIcons = document.querySelectorAll(".header__togle-icon");

const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  html.classList.add("dark-theme");
  themeIcons[0].classList.remove("header__togle-chosen");
  themeIcons[1].classList.add("header__togle-chosen");
}

themeButton.addEventListener("click", () => {
  if (html.classList.contains("dark-theme")) {
    html.classList.remove("dark-theme");

    themeIcons[1].classList.remove("header__togle-chosen");
    themeIcons[0].classList.add("header__togle-chosen");

    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark-theme");

    themeIcons[0].classList.remove("header__togle-chosen");
    themeIcons[1].classList.add("header__togle-chosen");

    localStorage.setItem("theme", "dark");
  }
});