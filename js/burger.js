const burgerButton = document.querySelector(".js-burger");
const burgerMenu = document.querySelector(".burger");
const burgerNav = document.querySelectorAll(".js-burger__nav");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("is-active");
  burgerMenu.classList.toggle("burger--active");
});

burgerNav.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    burgerButton.classList.toggle("is-active");
    burgerMenu.classList.toggle("burger--active");
  });
});
