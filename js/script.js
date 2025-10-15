const getCoffeeBtn = document.getElementById("get-coffee");
const addFavoriteBtn = document.getElementById("add-favorite");
const coffeeBlock = document.getElementById("coffee-block");
const favoritesList = document.getElementById("favorites");

const STORAGE_KEY = "coffeeFavorites";

let currentCoffee = null;
let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

async function fetchRandomCoffee() {
  try {
    addFavoriteBtn.disabled = true;
    coffeeBlock.innerHTML = "<p class='placeholder'>Загружаем...</p>";

    const response = await fetch("https://api.sampleapis.com/coffee/hot", { cache: "no-store" });
    if (!response.ok) throw new Error("Ошибка загрузки API");

    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    currentCoffee = data[randomIndex];

    renderCoffee(currentCoffee);
    addFavoriteBtn.disabled = false;
  } catch (error) {
    console.error(error);
    coffeeBlock.innerHTML = "<p class='placeholder'>Не удалось загрузить кофе ☹️</p>";
  }
}
