const burgerButton = document.querySelector(".js-burger");
const burgerMenu = document.querySelector(".burger");
const burgerNav = document.querySelectorAll(".js-burger__nav");
const body = document.body;

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("is-active");
  burgerMenu.classList.toggle("burger--active");
  body.classList.toggle("menu-open");
});

burgerNav.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    burgerButton.classList.remove("is-active");
    burgerMenu.classList.remove("burger--active");
    body.classList.remove("menu-open"); 
  });
});

body.addEventListener("click", (element) => {
  if (element.target === body && body.classList.contains("menu-open")) {
    burgerButton.classList.remove("is-active");
    burgerMenu.classList.remove("burger--active");
    body.classList.remove("menu-open");
  }
});
