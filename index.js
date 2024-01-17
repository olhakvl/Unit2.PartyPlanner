const COHORT = "2310-fsa-et-web-pt-sf-b-olha";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    parties: []
  };

// Create elements to store DOM elements
const partiesMain = document.getElementById("eventsDetails");

// GET the list of events from the API to update state
async function getEvents(){
  try {
    const eventsResponse = await fetch(API_URL);
    const jsonEvents = await eventsResponse.json();
    // console.log(jsonEvents);
    state.parties = jsonEvents.data;
    console.log(state.parties);
    renderAllEvents();
  } catch (error) {
    console.log("Error: ", error);
  }
}

getEvents();

// Add a new event to the events list
const addEvent = async (event) => {
  event.preventDefault();

  const addEventForm = document.querySelector("#newEventForm");

  // const eventForm = event.target;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: addEventForm.name.value,
        description: addEventForm.description.value,
        date: new Date(addEventForm.date.value).toISOString(),
        location: addEventForm.location.value
      })
    });

    console.log("Response: ", response);

    addEventForm.name.value = "";
    addEventForm.date.value = "";
    addEventForm.description.value = "";
    addEventForm.location.value = "";

    // re-render all events after adding a new party
    await getEvents();

  } catch (error) {
    console.log("Error: ", error);
  }
}

const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`${API_URL}/${eventId}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  })

  // re-render all events after deleting an event
  await getEvents();

  } catch (error) {
    console.log("Error: ", error);
  }
}

const renderAllEvents = () => {
  partiesMain.innerHTML = "";

  if (!state.parties.length) {
    const h2 = document.createElement("h2");
    h2.innerHTML = "No parties planned.";
    partiesMain.appendChild(h2);
  }

  state.parties.forEach(partyEvent => {
    const partyCard = document.createElement("div");
    partyCard.className = "partyCards";
    partyCard.innerHTML = `
      <h2> ${partyEvent.name} <h2/>
      <p>ID: ${partyEvent.id} <p/>
      <p>Description: ${partyEvent.description} <p/>
      <p> Date: ${partyEvent.date} <p/>
      <p> Location: ${partyEvent.location} <p/>
      <button class="deleteBtn" id="${partyEvent.id}"> Delete Event <button/>
    `;

    partiesMain.appendChild(partyCard);
  });

  // add event listener to delete an event
  const deleteButtonsArray = document.querySelectorAll(".deleteBtn");
  deleteButtonsArray.forEach((deleteButton) => {
    deleteButton.addEventListener("click", async (event) => {
      try {
        console.log("Event target: ", event.target);
        const id = event.target.id;
        await deleteEvent(id);
      } catch (error) {
        console.error(error);
      }
    });
  });
};

const init = async () => {
  await getEvents();
  const formSubmit = document.querySelector("#submitButton");
  formSubmit.addEventListener("click", addEvent);
};

init();
