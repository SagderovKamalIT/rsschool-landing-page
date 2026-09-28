const coffeeData = [
  {
    image: "./assets/images/assortmentSection/coffee-slider-1.png",
    title: "S’mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
  },
  {
    image: "./assets/images/assortmentSection/coffee-slider-2.png",
    title: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    image: "./assets/images/assortmentSection/coffee-slider-3.png",
    title: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

let currentIndex = 0;

const currentImg = document.querySelector("#slider-img");
const currentSliderTitle = document.querySelector("#slider-title");
const currentSliderDescription = document.querySelector("#slider-description");
const currentSliderPrice = document.querySelector("#slider-price");

const toggleLeftButton = document.querySelector(".assortment__toggle-left");
const toggleRightButton = document.querySelector(".assortment__toggle-right");

const progressItems = document.querySelectorAll(".assortment__progress-item");

const updateSliderData = () => {
  currentImg.src = coffeeData[currentIndex].image;

  currentSliderTitle.textContent = coffeeData[currentIndex].title;

  currentSliderDescription.textContent = coffeeData[currentIndex].description;

  currentSliderPrice.textContent = coffeeData[currentIndex].price;

  progressItems.forEach((item) => {
    item.classList.remove("assortment__progress-chousen");
    item.classList.add("assortment__progress-next");
  });

  progressItems[currentIndex].classList.remove("assortment__progress-next");
  progressItems[currentIndex].classList.add("assortment__progress-chousen");
};

toggleRightButton.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= coffeeData.length) {
    currentIndex = 0;
  }
  updateSliderData();
});

toggleLeftButton.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = coffeeData.length - 1;
  }

  updateSliderData();
});

// mobile
let touchStartX = 0;
let touchEndX = 0;

const mobileSlider = document.querySelector(".assortment__main");

mobileSlider.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

mobileSlider.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;

  handleSwipe();
});

const handleSwipe = () => {
  const swipeThreshold = 50;

  if (touchStartX - touchEndX > swipeThreshold) {
    currentIndex++;

    if (currentIndex >= coffeeData.length) {
      currentIndex = 0;
    }
    updateSliderData();
  }

  if (touchEndX - touchStartX > swipeThreshold) {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = coffeeData.length - 1;
    }

    updateSliderData();
  }
};
