const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    getTrainers()
    // getPokemons()
})

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => trainerCard(trainers))
    .catch(err => console.log(err))
}

function trainerCard(trainers) {
    console.log(trainers)
    trainers.map(trainer => showCard(trainer))
}

function showCard(trainer){
    const cardForm = document.createElement("div")
    // cardForm.className = "card" alternate syntax
    cardForm.setAttribute("class", "card")
    cardForm.setAttribute("data-id", trainer.id)
    const p = document.createElement("p")
    p.textContent = trainer.name


    const button = document.createElement("button")
    button.setAttribute("data-trainer-id", trainer.id)
    button.textContent = "Add Pokemon";
    button.addEventListener("click", function(event){
        event.preventDefault();
        addPokemon(trainer)
    });
    
    const ul = document.createElement("ul")
    trainer.pokemons.forEach(pokemon => {
        const li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`

        const releaseBtn = document.createElement("button")
        releaseBtn.setAttribute("class", "release")
        releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
        releaseBtn.innerText = "Release"
        releaseBtn.addEventListener("click", function(event){
            event.preventDefault();
            // release button action
        })
        li.appendChild(releaseBtn)
        ul.appendChild(li)
    })
    
    const main = document.querySelector("main")
    cardForm.appendChild(p)
    cardForm.appendChild(button)
    cardForm.appendChild(ul)
    main.appendChild(cardForm)
}

// function getPokemons(){
//     fetch(POKEMONS_URL)
//     .then(res => res.json())
//     .then(pokemon => addPokemon(pokemon, trainer))
//     .catch(err => console.log(err))
// }

function addPokemon(trainer){
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({trainer_id : trainer.id}),
    })
    .then(res => res.json())
    // .then(pokemon => {
    //  add if < 6 pokemon
    //     })
    .then(err => console.log(err))
}
