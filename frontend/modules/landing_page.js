import config from "../conf/index.js";
async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
    let res=fetch(config.backendEndpoint+"/cities")
    .then(response=>{
      return response.json();
    })
    .catch(err=>{
      return null;
    });
    return res;

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  // Create the outer div element with class and styles
const outerDiv = document.createElement("div");
outerDiv.className = "col-sm-12 col-md-6 col-lg-3 my-2";

// Create the link element with href attribute
const link = document.createElement("a");
link.href = `/frontend/pages/adventures/?city=${id}`;
link.id=id;

// Create the inner div element with class
const innerDiv = document.createElement("div");
innerDiv.className = "tile";

// Create the image element with src and alt attributes
const cityImage = document.createElement("img");
cityImage.src = image;
cityImage.alt = city;

// Create the inner div for text content
const tileText = document.createElement("div");
tileText.className = "tile-text text-white";

// Create the heading element
const heading = document.createElement("h5");
heading.textContent = city;

// Create the paragraph element
const paragraph = document.createElement("p");
paragraph.textContent = description;

// Append the heading and paragraph elements to the tileText div
tileText.appendChild(heading);
tileText.appendChild(paragraph);

// Append the image and tileText div to the inner div
innerDiv.appendChild(cityImage);
innerDiv.appendChild(tileText);

// Append the inner div to the link element
link.appendChild(innerDiv);

// Append the link element to the outer div
outerDiv.appendChild(link);

// Get the parent element where you want to append the created HTML
const parentElement = document.getElementById("data");

// Append the outer div to the parent element
parentElement.appendChild(outerDiv);


}

export { init, fetchCities, addCityToDOM };
