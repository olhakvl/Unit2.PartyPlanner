const COHORT = "2310-fsa-et-web-pt-sf-b-olha";
const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + COHORT;

const state = {
    events: []
  };


// GET the list of events from the API to update state
 
async function getEvents(){
    const events = await fetch(API + "/events");
    const jsonEvents = await events.json();
    // console.log(jsonEvents);
    state.events = jsonEvents.data;
    // console.log(state.events);
    return state.events;
}

getEvents();

