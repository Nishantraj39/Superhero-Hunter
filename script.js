// Get references to DOM elements
let listOfHeroInDom = document.getElementById("heroList");
let errorMessage = document.getElementById("errorMessage");
let inputBar = document.getElementById("inputBar");

// Initialize arrays to store hero data
let listOfHeros = [];
let favList = [];

// Function to add a hero to the DOM
function addHerosToDOM(hero) {
    let li = document.createElement("li");

    li.innerHTML =
        `
    <img src="${hero.thumbnail.path + "." + hero.thumbnail.extension}" id="poster">
    <h2 id="heroTitle" data-id=${hero.id}>${hero.name}</h2>
    <button id="details" data-id="${hero.id}"> details </button>
    <button id="favBtn" data-id="${hero.id}" data-title="${hero.name}">Add to Favourites</button>
    `
    listOfHeroInDom.append(li);
}

// Function to render the list of heroes
function renderHeroList() {
    listOfHeroInDom.innerHTML = "";
    if (listOfHeros.length === 0) {
        errorMessage.innerHTML =
            `No superhero found with that name`;
        return;
    }
    listOfHeroInDom.innerHTML = "";
    errorMessage.innerHTML = "";
    for (let i = 0; i < listOfHeros.length; i++) {
        addHerosToDOM(listOfHeros[i]);
    }
}

// Function to perform a superhero search
async function searchInput(text) {
    if (text.length != 0) {
        let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${text}&apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`;
        let response = await fetch(url);
        const data1 = await response.json();
        listOfHeros = (data1.data.results);
        console.log(listOfHeros);
        if (listOfHeros.length === 0) {
            renderHeroList();
        } else {
            renderHeroList();
        }
    }
}

// Function to add a hero to the favorites list
function addToFav(heroId, heroTitle) {
    for (i of favList) {
        if (i === heroId) {
            errorMessage.innerHTML = "This hero is already in the Fav List";
            // Clearing out the message in 4 seconds
            setTimeout(() => {
                errorMessage.innerHTML = "";
            }, 4000);
            return;
        }
    }
    favList.push(heroId);
    errorMessage.innerHTML = `${heroTitle} added in the fav List`;
    // Clearing out the message in 4 seconds
    setTimeout(() => {
        errorMessage.innerHTML = "";
    }, 4000);
}

// Function to handle user input
function handleInput(input) {
    let text = input.value;
    searchInput(text);
}

// Function to handle keypress and clicks
function handleKeyAndClick(e) {
    if (e.target.id === "inputBar") {
        handleInput(e.target);
    }
    if (e.target.id === "details") {
        let heroId = e.target.dataset.id;
        localStorage.setItem("heroId", JSON.stringify(heroId));
        window.open("./details/details.html");
    }
    if (e.target.id === "favBtn") {
        addToFav(e.target.dataset.id, e.target.dataset.title);
    }
    if (e.target.id === "favourite") {
        localStorage.setItem("favHeros", JSON.stringify(favList));
        window.open("./favList/fav.html");
    }
}

// Event listeners for keyup and click events
document.addEventListener("keyup", handleKeyAndClick);
document.addEventListener("click", handleKeyAndClick);
