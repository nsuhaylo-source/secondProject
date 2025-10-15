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

function renderCoffee(coffee) {
  coffeeBlock.innerHTML = "";

  if (coffee.image) {
    const img = document.createElement("img");
    img.src = coffee.image;
    img.alt = coffee.title;
    img.className = "coffee-img";
    coffeeBlock.appendChild(img);
  }

  const title = document.createElement("p");
  title.className = "coffee-title";
  title.textContent = coffee.title;
  coffeeBlock.appendChild(title);

  const desc = document.createElement("p");
  desc.className = "coffee-desc";
  desc.textContent = coffee.description || "Описание отсутствует.";
  coffeeBlock.appendChild(desc);

  const region = document.createElement("p");
  region.className = "coffee-region";
  region.textContent = "Регион: " + (coffee.region || "неизвестен");
  coffeeBlock.appendChild(region);
}

function addToFavorites() {
  if (!currentCoffee) return;

  const favorite = {
    title: currentCoffee.title,
    date: new Date().toLocaleString("ru-RU"),
  };

  favorites.push(favorite);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  renderFavorites();
}


function renderFavorites() {
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p class='placeholder'>Избранное пустое</p>";
    return;
  }

  favorites.forEach((fav) => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.className = "favorite-title";
    title.textContent = fav.title;

    const date = document.createElement("span");
    date.className = "favorite-date";
    date.textContent = fav.date;

    li.appendChild(title);
    li.appendChild(date);
    favoritesList.appendChild(li);
  });
}


getCoffeeBtn.addEventListener("click", fetchRandomCoffee);
addFavoriteBtn.addEventListener("click", addToFavorites);


renderFavorites();