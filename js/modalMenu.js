import { products } from "./products.js";

const menuContent = document.querySelector(".menu__content");
const navLinks = document.querySelectorAll(
  ".menu__navigation .menu__navigation-link",
);
const loadMoreBtn = document.querySelector(".menu__content-button");

const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");
const modalCloseBtn = document.querySelector(".modal__close-btn");
const modalImg = document.querySelector(".modal__container-img");
const modalTitle = document.querySelector(".modal__name-title");
const modalDesc = document.querySelector(".modal__name-paragraph");
const modalTotalPrice = document.querySelector(".modal__total-price");
const modalSizeGroup = document.querySelector(".modal__size-buttons");
const modalAdditivesGroup = document.querySelector(".modal__additives-buttons");

let currentCategory = "coffee";
let isAllShown = false;
let activeProduct = null;
let selectedSize = "s";
let selectedAdditives = new Set();

function renderMenu(category) {
  menuContent.innerHTML = "";
  const filteredProducts = products.filter(
    (product) => product.category === category,
  );
  const windowWidth = window.innerWidth;

  let productsToRender = filteredProducts;

  if (windowWidth <= 768 && !isAllShown) {
    productsToRender = filteredProducts.slice(0, 4);
  }

  productsToRender.forEach((product) => {
    const cardHTML = `
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
    menuContent.insertAdjacentHTML("beforeend", cardHTML);
  });

  if (windowWidth <= 768 && filteredProducts.length > 4 && !isAllShown) {
    loadMoreBtn.style.display = "flex";
  } else {
    loadMoreBtn.style.display = "none";
  }
}

function calculateTotalPrice() {
  if (!activeProduct) return;

  let total = parseFloat(activeProduct.price);

  total += parseFloat(activeProduct.size[selectedSize]["add-price"]);

  selectedAdditives.forEach((index) => {
    total += parseFloat(activeProduct.additives[index]["add-price"]);
  });

  modalTotalPrice.textContent = `$${total.toFixed(2)}`;
}

function openModal(product) {
  activeProduct = product;
  selectedSize = "s";
  selectedAdditives.clear();

  modalImg.src = product.image;
  modalImg.alt = product.name;
  modalTitle.textContent = product.name;
  modalDesc.textContent = product.description;

  const sizeKeys = ["s", "m", "l"];
  const sizeLinks = modalSizeGroup.querySelectorAll(".menu__navigation-link");
  sizeLinks.forEach((link, idx) => {
    const key = sizeKeys[idx];
    link.setAttribute("data-size", key);
    link.querySelector(".menu__navigation-text").textContent =
      product.size[key].size;

    if (key === "s") {
      link.classList.add("menu__navigation-choosenlink");
      link
        .querySelector(".menu__navigation-icon")
        .classList.add("menu__navigation-chosenicon");
      link
        .querySelector(".menu__navigation-text")
        .classList.add("menu__navigation-chosentext");
    } else {
      link.classList.remove("menu__navigation-choosenlink");
      link
        .querySelector(".menu__navigation-icon")
        .classList.remove("menu__navigation-chosenicon");
      link
        .querySelector(".menu__navigation-text")
        .classList.remove("menu__navigation-chosentext");
    }
  });

  const additiveLinks = modalAdditivesGroup.querySelectorAll(
    ".menu__navigation-link",
  );
  additiveLinks.forEach((link, idx) => {
    link.setAttribute("data-additive", idx);
    link.querySelector(".menu__navigation-text").textContent =
      product.additives[idx].name;

    link.classList.remove("menu__navigation-choosenlink");
    link
      .querySelector(".menu__navigation-icon")
      .classList.remove("menu__navigation-chosenicon");
    link
      .querySelector(".menu__navigation-text")
      .classList.remove("menu__navigation-chosentext");
  });

  calculateTotalPrice();
  modal.classList.add("modal--active");
  document.body.classList.add("menu-open");
}

function closeModal() {
  modal.classList.remove("modal--active");
  document.body.classList.remove("menu-open");
  activeProduct = null;
}

menuContent.addEventListener("click", (e) => {
  const card = e.target.closest(".menu__card");
  if (!card) return;

  const productName = card.getAttribute("data-name");
  const product = products.find((p) => p.name === productName);
  if (product) {
    openModal(product);
  }
});

modalSizeGroup.addEventListener("click", (e) => {
  e.preventDefault();
  const link = e.target.closest(".modal__size-buttons .menu__navigation-link");
  if (!link) return;

  const sizeLinks = modalSizeGroup.querySelectorAll(".menu__navigation-link");
  sizeLinks.forEach((l) => {
    l.classList.remove("menu__navigation-choosenlink");
    l.querySelector(".menu__navigation-icon")?.classList.remove(
      "menu__navigation-chosenicon",
    );
    l.querySelector(".menu__navigation-text")?.classList.remove(
      "menu__navigation-chosentext",
    );
  });

  link.classList.add("menu__navigation-choosenlink");
  link
    .querySelector(".menu__navigation-icon")
    ?.classList.add("menu__navigation-chosenicon");
  link
    .querySelector(".menu__navigation-text")
    ?.classList.add("menu__navigation-chosentext");

  selectedSize = link.getAttribute("data-size");
  calculateTotalPrice();
});

modalAdditivesGroup.addEventListener("click", (e) => {
  e.preventDefault();
  const link = e.target.closest(
    ".modal__additives-buttons .menu__navigation-link",
  );
  if (!link) return;

  const additiveIndex = parseInt(link.getAttribute("data-additive"), 10);

  if (selectedAdditives.has(additiveIndex)) {
    selectedAdditives.delete(additiveIndex);
    link.classList.remove("menu__navigation-choosenlink");
    link
      .querySelector(".menu__navigation-icon")
      ?.classList.remove("menu__navigation-chosenicon");
    link
      .querySelector(".menu__navigation-text")
      ?.classList.remove("menu__navigation-chosentext");
  } else {
    selectedAdditives.add(additiveIndex);
    link.classList.add("menu__navigation-choosenlink");
    link
      .querySelector(".menu__navigation-icon")
      ?.classList.add("menu__navigation-chosenicon");
    link
      .querySelector(".menu__navigation-text")
      ?.classList.add("menu__navigation-chosentext");
  }

  calculateTotalPrice();
});

modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("modal--active")) {
    closeModal();
  }
});

loadMoreBtn.addEventListener("click", () => {
  isAllShown = true;
  renderMenu(currentCategory);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    navLinks.forEach((l) => {
      l.classList.remove("menu__navigation-choosenlink");
      l.querySelector(".menu__navigation-icon")?.classList.remove(
        "menu__navigation-chosenicon",
      );
      l.querySelector(".menu__navigation-text")?.classList.remove(
        "menu__navigation-chosentext",
      );
    });

    const target = e.currentTarget;
    target.classList.add("menu__navigation-choosenlink");
    target
      .querySelector(".menu__navigation-icon")
      ?.classList.add("menu__navigation-chosenicon");
    target
      .querySelector(".menu__navigation-text")
      ?.classList.add("menu__navigation-chosentext");

    currentCategory = target.getAttribute("data-category");
    isAllShown = false;
    renderMenu(currentCategory);
  });
});

window.addEventListener("resize", () => {
  renderMenu(currentCategory);
});

document.addEventListener("DOMContentLoaded", () => {
  renderMenu(currentCategory);
});
