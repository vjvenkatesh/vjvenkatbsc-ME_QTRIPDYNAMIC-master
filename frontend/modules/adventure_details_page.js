import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params=new URLSearchParams(search);
  let paramId=params.get("adventure")
  


  // Place holder for functionality to work in the Stubs
  return paramId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // http://13.126.132.215:8082/adventures/detail?adventure=8549673097
  let url = config.backendEndpoint;
  try{ 
    let res=await fetch(`${url}/adventures/detail?adventure=${adventureId}`)
    let adventure=await res.json();
    return adventure;
  }
  catch(err){
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
  // imageTag.className = "w-100";

  div.appendChild(imageTag);
  carouselInner.appendChild(div);
});

// // Initialize the carousel using Bootstrap's JavaScript
// let carousel = new bootstrap.Carousel(document.getElementById("carouselExampleIndicators"), {
//   interval: 2000, 
//   wrap: true 
// });


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure)
  if(adventure.available === true){
    let soldout=document.getElementById("reservation-panel-sold-out");
    soldout.style.display="none";
    let formForReserve=document.getElementById("reservation-panel-available");
    formForReserve.style.display="block";
    let personPerHead=document.getElementById("reservation-person-cost");
    let perHeadAmount=adventure.costPerHead;
    
    personPerHead.textContent=perHeadAmount;
  }
  else{
    let formForReserve=document.getElementById("reservation-panel-available");
    let soldout=document.getElementById("reservation-panel-sold-out");
    soldout.style.display="block";
    formForReserve.style.display="none";

  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(persons);
  let Total=adventure.costPerHead*persons;
  let TotalCostDiv=document.getElementById("reservation-cost");
  TotalCostDiv.textContent=Total;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    document.getElementById("myForm").addEventListener("submit", function(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Retrieve the form element
    var form = event.target;

    // Access form elements and retrieve data
    var name = form.elements["name"].value;
    var date = form.elements["date"].value;
    var person = form.elements["person"].value;
    let url=config.backendEndpoint+"/reservations/new";
    const data={
      name:name,
      date:date,
      person:person,
      adventure:adventure.id,
    }
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
        // console.log("API response:", result);
        alert("Success!");
        // Perform actions with the response data
      })
      .catch((error) => {
        // console.error("API error:", error);
        alert("Failed!");
        // Handle the error
      });
  });
  

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reserveBanner=document.getElementById("reserved-banner");
  if(adventure.reserved == true){
    
    reserveBanner.style.display="block";
  }
  else{
    reserveBanner.style.display="none";
  }

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
