const burgerButton = document.querySelector(".js-burger");
const burgerMenu = document.querySelector(".burger");
const burgerNav = document.querySelectorAll(".js-burger__nav");
const body = document.body;

function closeMenu() {
  burgerButton.classList.remove("is-active");
  burgerMenu.classList.remove("burger--active");
  body.classList.remove("menu-open");
}

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("is-active");
  burgerMenu.classList.toggle("burger--active");
  body.classList.toggle("menu-open");
});

burgerNav.forEach((navItem) => {
  navItem.addEventListener("click", closeMenu);
});


window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    closeMenu();
  }
});


window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && body.classList.contains("menu-open")) {
    closeMenu();
  }
});

body.addEventListener("click", (element) => {
  if (element.target === body && body.classList.contains("menu-open")) {
    closeMenu();
  }
});
