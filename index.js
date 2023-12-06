const COHORT = "2310-fsa-et-web-pt-sf-b-olha";
const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + COHORT;

const state = {
    names: [],
    dates: [],
    times: [],
    locations: [],
    descriptions: []
  };

async function getEvents(){
    const events = await fetch(API + "/events");
    const jsonEvents = await events.json();
    console.log(jsonEvents);
}

getEvents();

