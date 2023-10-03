// Get the heroId from local storage and parse it as JSON
let heroId = JSON.parse(localStorage.getItem("heroId"));

// Initialize variables to store hero details and DOM elements
let heroDetails = null;
let titleEle = document.getElementById("name");
let imgEle = document.getElementsByTagName("img")[0];
let description = document.getElementById("description");
let comics = document.getElementById("comics");
let series = document.getElementById("series");
let releaseDate = document.getElementById("release-data");
let seriesNumber = document.getElementById("seriesNumber");
let comicNumber = document.getElementById("comicNumber");

// Function to fetch and display hero details
async function fetchHeroDetails(id) {
    // Fetch hero details from the Marvel API using the provided heroId
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`);
    
    // Get the hero details from the API response
    heroDetails = (await response.json()).data.results[0];

    // Display hero details on the page
    console.log(heroDetails);

    // Display hero description or a message if not available
    if (heroDetails.description.length !== 0) {
        description.innerHTML += `<h2>${heroDetails.description}</h2>`;
    } else {
        description.innerHTML += `<h2>Description Not available</h2>`;
    }

    // Display hero name
    titleEle.innerHTML += `<h2> ${heroDetails.name} </h2>`;

    // Parse and display the modified date of the hero
    let date = `${heroDetails.modified}`;
    let parsedDate = "";
    for (let i of date) {
        if (('0' <= i && i <= '9') || i == '-') {
            parsedDate += i;
        } else {
            break;
        }
    }
    releaseDate.innerHTML += `<h2>${parsedDate}</h2>`;

    // Set the hero image source
    imgEle.setAttribute("src", `${heroDetails.thumbnail.path}.${heroDetails.thumbnail.extension}`);

    // Display the number of series available and list series names
    seriesNumber.innerHTML += `${heroDetails.series.available}`;
    let seriesNum = 1;
    for (let i of heroDetails.series.items) {
        series.innerHTML += `<h2>Series Number ${seriesNum}: ${i.name}</h2>`;
        seriesNum++;
    }

    // Display the number of comics available and list comic names
    comicNumber.innerHTML += `${heroDetails.comics.available}`;
    let comicsNum = 1;
    for (let i of heroDetails.comics.items) {
        comics.innerHTML += `<h2>Comic Number ${comicsNum}: ${i.name}</h2>`;
        comicsNum++;
    }
}

// Function to load hero details
function heroLoad() {
    fetchHeroDetails(heroId);
}

// Call the heroLoad function to fetch and display hero details
heroLoad();
