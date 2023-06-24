import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  
  
  
  
  //optional add new Adventures
  let buttonElement = document.getElementById("addNewAdventure");
  buttonElement.addEventListener("click", function () {
    let link = config.backendEndpoint;
    const url = `${link}/adventures/new`; //http://43.205.56.22:8082/adventures/new
    console.log(url);
    const ci=params.get("city");
    const data = { city: `${ci}` };
    console.log(data);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("API error: " + response.status);
        }
        return response.json();
      })
      .then((result) => {
        console.log("API response:", result);
        // Perform actions with the response data
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle the error
      });
  });
  console.log(params.get("city"));


  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = config.backendEndpoint;
  let res = await fetch(`${url}/adventures?city=${city}`)
    .then((res) => res.json())
    .then((cities) => {
      return cities;
    })
    .catch((err) => {
      return null;
    });
  return res;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //complete load from api DOM
  let adventure = adventures.map((ad) => {
    const outerDiv = document.createElement("div");
    outerDiv.className = "col-6 col-sm-6 col-md-6 col-lg-3 my-2";

    // Create the anchor element with the href attribute
    const anchor = document.createElement("a");
    anchor.href = `/frontend/pages/adventures/detail?adventure=${ad.id}`;
    anchor.id = ad.id;

    // Create the card div element with the specified classes
    const cardDiv = document.createElement("div");
    cardDiv.className = "activity-card";

    // Create the image element with the src attribute
    const image = document.createElement("img");
    image.className = "activity-card img";
    image.src = `${ad.image}`;

    const banner = document.createElement("p");
    banner.className = "category-banner";
    banner.textContent = `${ad.category}`;

    // Create the card body div element with the specified classes
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body w-100";

    const oudiv = document.createElement("div");
    oudiv.className = "d-flex flex-column";
    // oudiv.style.border='1px solid blue';

    // Create the heading element and set its text content
    const headDiv = document.createElement("div");
    headDiv.className = "d-flex justify-content-between";
    const heading = document.createElement("h6");
    heading.textContent = `${ad.name}`;

    // Create the price element and set its text content
    const price = document.createElement("p");
    price.textContent = `₹${ad.costPerHead}`;

    const durationDiv = document.createElement("div");
    durationDiv.className = "d-flex justify-content-between";

    const duration = document.createElement("h6");
    duration.textContent = "Duration";

    const time = document.createElement("p");
    time.textContent = `${ad.duration} Hours`;

    headDiv.appendChild(heading);
    headDiv.appendChild(price);

    durationDiv.appendChild(duration);
    durationDiv.appendChild(time);

    oudiv.appendChild(headDiv);
    oudiv.appendChild(durationDiv);

    cardBodyDiv.appendChild(oudiv);
    // cardBodyDiv.append(headDiv);
    // cardBodyDiv.append(durationDiv);

    cardDiv.appendChild(image);
    cardDiv.appendChild(banner);
    cardDiv.appendChild(cardBodyDiv);

    anchor.appendChild(cardDiv);

    outerDiv.appendChild(anchor);

    const parentElement = document.getElementById("data");
    parentElement.appendChild(outerDiv);
  });

  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
