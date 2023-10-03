// Get reference to the list of favorite heroes in the DOM
let listOfHeroInDom = document.getElementById("heroList");

// Display a message in the console to confirm that the script is working
console.log("Working");

// Retrieve the list of favorite heroes from local storage and parse it as JSON
let listOfHeros = JSON.parse(localStorage.getItem("favHeros"));

// Function to add a hero to the DOM
function addHerosToDOM(hero) {
    let li = document.createElement("li");
    li.setAttribute("id", `${hero.id}`);
    li.innerHTML =
        `
    <img src="${hero.thumbnail.path + "." + hero.thumbnail.extension}" id="poster">
    <h2 id="heroTitle"  data-id=${hero.id}>${hero.name}</h2>
    <button id="details" data-id="${hero.id}"> details </button>
    <button id="delete" data-id="${hero.id}"> delete </button>
    `
    listOfHeroInDom.append(li);
}

// Function to render the list of favorite heroes
async function renderHeroList() {
    listOfHeroInDom.innerHTML = "";

    for (let i = 0; i < listOfHeros.length; i++) {
        let id = listOfHeros[i];
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`);
        let heroDetails = (await response.json()).data.results[0];

        addHerosToDOM(heroDetails);
    }
}

// Function to handle clicks on buttons
function handleKeyAndClick(e) {
    if (e.target.id === "details") {
        let heroId = e.target.dataset.id;
        localStorage.setItem("heroId", JSON.stringify(heroId));
        window.open("../details/details.html");
    }

    if (e.target.id === "delete") {
        let heroId = e.target.dataset.id;
        const newFav = listOfHeros.filter(function (id) {
            return heroId !== id;
        });
        listOfHeros = [...newFav];

        // Update the favList array in local storage
        localStorage.setItem("favHeros", JSON.stringify(newFav));

        // Hide the deleted hero from the DOM
        let ele = document.getElementById(heroId);
        ele.style.display = "none";
    }
}

// Add a click event listener to handle clicks on buttons
document.addEventListener("click", handleKeyAndClick);

// Render the list of favorite heroes
renderHeroList();
