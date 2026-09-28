import { products } from "./products";

const menuContent = document.querySelector(".menu__content");
const navLinks = document.querySelectorAll(".menu__navigation-link");
const loadingContentButton = document.querySelector(".menu__content-button");

let currentCategory = "coffee";
let isButtonDone = false;

const renderMenu = (category) => {
  let cardHTMLCode = "";
  menuContent.innerHTML = "";

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );
  const windowWidth = window.innerWidth;

  let productsToRender = filteredProducts;

  if (windowWidth <= 768 && !isButtonDone) {
    productsToRender = filteredProducts.slice(0, 4);
  }

  productsToRender.forEach((product) => {
    cardHTMLCode += `
      <li class="menu__card" data-name="${product.name}">
        <div class="menu__card-image">
          <img src="${product.image}" alt="${product.name} image" />
        </div>
        <div class="menu__card-content">
          <div class="menu__card-text">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <h2>$${product.price}</h2>
        </div>
      </li>
    `;
  });

  menuContent.innerHTML = cardHTMLCode;

  if (windowWidth <= 768 && filteredProducts.length > 4 && !isButtonDone) {
    loadingContentButton.style.display = "flex";
  } else {
    loadingContentButton.style.display = "none";
  }
};

loadingContentButton.addEventListener("click", () => {
  isButtonDone = true;
  renderMenu(currentCategory);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (item) => {
    item.preventDefault();

    navLinks.forEach((link) => {
      link.classList.remove("menu__navigation-choosenlink");
      link.querySelector(".menu__navigation-icon")?.classList.remove("menu__navigation-chosenicon");
      link.querySelector(".menu__navigation-text")?.classList.remove("menu__navigation-chosentext");
    });

    const target = item.currentTarget;
    target.classList.add("menu__navigation-choosenlink");
    target.querySelector(".menu__navigation-icon")?.classList.add("menu__navigation-chosenicon");
    target.querySelector(".menu__navigation-text")?.classList.add("menu__navigation-chosentext");

    currentCategory = target.getAttribute("data-category");
    isButtonDone = false;
    renderMenu(currentCategory);
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    isButtonDone = false;
  }
  renderMenu(currentCategory);
});

document.addEventListener("DOMContentLoaded", () => {
  renderMenu(currentCategory);
});
