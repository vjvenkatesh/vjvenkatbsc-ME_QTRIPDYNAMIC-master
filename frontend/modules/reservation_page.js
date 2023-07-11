import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let res=await fetch(config.backendEndpoint+"/reservations/");
    let reservation=await res.json();
   
    return reservation;
  }
  catch(err){
   return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
    // Get the elements for conditional rendering
  console.log(reservations);
  let noReservationBanner = document.getElementById("no-reservation-banner");
  let reservationTableParent = document.getElementById("reservation-table-parent");
  
  // Check if reservations array is empty
  if (reservations.length === 0) {
    // Show the no-reservation-banner element
    noReservationBanner.style.display = "block";
    // Hide the reservation-table-parent element
    reservationTableParent.style.display = "none";
  } else {
    // Hide the no-reservation-banner element
    noReservationBanner.style.display = "none";
    // Show the reservation-table-parent element
    reservationTableParent.style.display = "block";

    // Get the reservation-table element
    var reservationTable = document.getElementById("reservation-table");
    
    // Loop through the reservations
    for (var i = 0; i < reservations.length; i++) {
     
      let reservation = reservations[i];

      // Creating the table row for every data column
      let row = document.createElement("tr");

      // Create and show every columns

      //transaction id column
      let transactionId = document.createElement("td");
      transactionId.textContent = reservation.id;
      row.appendChild(transactionId);


      //bookingName column
      let bookingName=document.createElement("td");
      bookingName.textContent=reservation.name;
      row.appendChild(bookingName);


      //adventureName column
      let adventureName=document.createElement("td");
      adventureName.textContent=reservation.adventureName;
      row.appendChild(adventureName);

      //personCount column
      let person=document.createElement("td");
      person.textContent=reservation.person;
      row.appendChild(person);


      //date column
      let date = document.createElement("td");
      let reservationDate = new Date(reservation.date);
      date.textContent = reservationDate.toLocaleDateString("en-IN");
      row.appendChild(date);


      //price column
      let price=document.createElement("td");
      price.textContent=reservation.price;
      row.appendChild(price);

      //BookingTime column
      let BookingTime = document.createElement("td");
      let bookingTime1 = new Date(reservation.time);
      let options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      BookingTime.textContent = bookingTime1.toLocaleString("en-IN", options).replace(/ at/ , ",");

//   day: "numeric",
//   month: "long",
//   year: "numeric",
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
//   hour12: true
// }).replace("at", "");
      row.appendChild(BookingTime);


      
      //button-Link
      let visitButtonCell = document.createElement("td");
      let visitButton = document.createElement("a");
      visitButtonCell.id=reservation.id;
      visitButton.textContent = "Visit Adventure";
      visitButton.className="reservation-visit-button";
      visitButton.href = "../detail/?adventure="+reservation.adventure;
      visitButtonCell.appendChild(visitButton);
      row.appendChild(visitButtonCell);

      // Append the row to the reservation-table
      reservationTable.appendChild(row);
    }
  }

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
