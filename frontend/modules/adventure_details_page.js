import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let params = new URLSearchParams(search);
  let paramId = params.get("adventure")


  // Place holder for functionality to work in the Stubs
  return paramId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  // http://13.126.132.215:8082/adventures/detail?adventure=8549673097
  let url = config.backendEndpoint;
  try {
    let res = await fetch(`${url}/adventures/detail?adventure=${adventureId}`)
    let adventure = await res.json();
    return adventure;
  }
  catch (err) {
    return null;
  }


  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = adventure.name;
  let adventureSubtitle = adventure.subtitle;
  let adventureImages = adventure.images;
  let adventureContent = adventure.content;

  // For name
  const adventureNameElement = document.getElementById("adventure-name");
  adventureNameElement.textContent = adventureName;

  // For subtitle
  const adventureSubtitleElement = document.getElementById("adventure-subtitle");
  adventureSubtitleElement.textContent = adventureSubtitle;

  // For adventure content
  const adventureContentElement = document.getElementById("adventure-content");
  adventureContentElement.textContent = adventureContent;

  // For images 
  const photoGalleryElement = document.getElementById("photo-gallery");
  adventureImages.forEach(image => {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("activity-card-image");
    imageDiv.style.backgroundImage = `url(${image})`;
    photoGalleryElement.appendChild(imageDiv);
  });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imagePanel = document.getElementById("photo-gallery");
  imagePanel.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
let carouselInner = document.getElementById("carousel-inner");

// Create the carousel items dynamically
images.forEach((image, index) => {
  let div = document.createElement("div");
  div.className = "carousel-item";
  if (index === 0) {
    div.classList.add("active");
  }
  let imageTag = document.createElement("img");
  imageTag.src = image;
  imageTag.className = "activity-card-image";
  div.appendChild(imageTag);
  carouselInner.appendChild(div);
});

// Initialize the carousel using Bootstrap's JavaScript
let carousel = new bootstrap.Carousel(document.getElementById("carouselExampleIndicators"), {
  interval: 2000, 
  wrap: true 
});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
