const playerDisplay = document.getElementById('player-display');
const form = document.getElementById('nickname-form');
const inputNickname = document.getElementById('nickname');
const pokemonTable = document.getElementById('pokemon-table');
const myPokemonCard = document.getElementById('pokemon-overview')
const eventLogArea = document.getElementById('event-log-area');

const myPlayerObj = { name: '', pokemon: null, pokemon_id: null };

/**
 *generates random integer.
 *
 * @param {*} min integer.
 * @param {*} max integer.
 * @returns random integer, from min to max included.
 */
const getRandNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * This function returns players objects array from a localstorage.
 */
const getPlayersArray = () => JSON.parse(localStorage.getItem('players'));

const setPlayersArray = (player) => localStorage.setItem('players', JSON.stringify(player));

/** return the ID of the chosen pokemon. Takes ID from player object (player.pokemon_id) */
const myPokemonId = () => getPlayersArray()[0].pokemon_id;

/**
 * Adds your form input value as nickname to Player object.
 */
function addPlayerToDatabase() {
    event.preventDefault();

    const players = [];
    myPlayerObj.name = inputNickname.value;

    if (getPlayersArray() === null) {
        players.push(myPlayerObj);
        localStorage.setItem('players', JSON.stringify(players))
    } else {
        console.log('jau turi zaideja: ' + getPlayersArray()[0].name);
    }
    renderPokemons();
    renderForm();
}

/**
 * renders a Pokemon card Table for your selection, getting data from localstorage.
 */
function renderPokemons() {
    pokemonTable.innerHTML = '';

    getPokemonsArray().forEach(pokemon => {
        let div = document.createElement('div');
        let button = document.createElement('button');

        button.textContent = pokemon.text
        div.setAttribute('id', pokemon.id);
        div.setAttribute('class', 'pokemon-card');

        div.innerHTML = `
        <div class="pokemon-card-name"><span>${pokemon.name}</span></div>
        <div class="pokemon-card-picture"><img src="${pokemon.picture}"></div>
        `;

        div.appendChild(button);
        pokemonTable.appendChild(div);

        button.addEventListener('click', choosePokemon);
    });
}

/**
 * This function adds chosen pokemon name to you player objects database, 
 * and updates pokemons information nder 'controller'
 */
function choosePokemon() {
    let chosenPokemonId = event.target.parentNode.getAttribute("id");
    let myPlayer = getPlayersArray()[0];
    let myPokemon = getPokemonFromDB([chosenPokemonId]);

    myPokemon.controller = myPlayer.name;
    myPokemon.level = 1;
    myPokemon.attack = getRandNumber(3, 9);
    myPokemon.defense = getRandNumber(3, 9);
    myPokemon.experience = getRandNumber(0, 10);
    myPokemon.health = getRandNumber(5,10);
    myPlayer.pokemon = myPokemon;
    setPlayersArray([myPlayer]);

    renderForm();
    renderPokemons();
    pokemonTable.classList.add('hide');
    showPokemonCard();
}

/**
 * shows form template depending on whether you're a new player, 
 * or hides a form if you are registered player, and your player is in databse.
 */
function renderForm() {
    if (getPlayersArray() === null) {
        form.classList.remove('hide');
        // playerDisplay.textContent = "You don't have a player. Please enter your nickname:";
        eventLogArea.innerHTML = `Hello, stranger!`;

    } else {
        form.classList.add('hide');

        if (typeof getPlayersArray()[0].pokemon !== undefined && getPlayersArray()[0].pokemon !== null) {
            // let playerName = getPlayersArray()[0].name;
            // playerDisplay.textContent = `Your nickname: ${playerName}. And this is your Pokemon:`;
            eventLogArea.innerHTML = `${getPlayersArray()[0].pokemon.name} says Hi!`;

        } else {
            // playerDisplay.textContent = 'Your nickname: ' + getPlayersArray()[0].name + ', please choose your pokemon:';
            eventLogArea.innerHTML = `Hello, ${getPlayersArray()[0].name}! There are some wild Pokemons running around! Can you catch any?`;
        }
    }
}

/**
 *This function renders and shows chosen pokemon box, with all the information, taking information from the data storage.
 *
 * @param {*} pokemon
 */
function showPokemonCard() {
    // perasyt su appendais

    let buttons = `
    <button id="increase-attack-btn" onclick="upgradeStats()">Attack +1</button>
    <button id="increase-defense-btn" onclick="upgradeStats()">Defense +1</button>
    <button id="increase-health-btn" onclick="upgradeStats()">Health +1</button>
    <button id="go-fight-btn" onclick="openFightBox()">Go fight</button>`;

    //myPokemon = getPokemonFromDB(myPokemonId());
    let myPokemon = getPlayersArray()[0].pokemon;
    // console.log(myPokemon);
    myPokemonCard.classList.remove('hide');
    myPokemonCard.innerHTML = `
        <div class="pokemon-overview-card">
        <div class="pokemon-card-name">${myPokemon.name}</div>
        <div class="pokemon-card-picture"><img src="${myPokemon.picture}"></div>
        <div class="pokemon-card-stat" id="">Level: ${myPokemon.level}</div>
        <div class="pokemon-card-stat" id="">Attack: ${myPokemon.attack}</div>
        <div class="pokemon-card-stat" id="">Defense: ${myPokemon.defense}</div>
        <div class="pokemon-card-stat" id="">Health: ${myPokemon.health}</div>
        <div class="pokemon-card-stat" id="">Experience: ${myPokemon.experience}</div>
        </div>
        ${buttons}`;
}

if (getPlayersArray() == null) {
    setToDefaultPokemonDB();
}

if (getPlayersArray() != null) {
    renderPokemons();
    // console.log(getPlayersArray()[0]);

    // if (getPlayersArray()[0].pokemon.name.length >= 1) {
    //     pokemonTable.classList.add('hide');
    //     showPokemonCard();
    // }
    if (typeof getPlayersArray()[0].pokemon !== undefined && getPlayersArray()[0].pokemon !== null) {
        pokemonTable.classList.add('hide');
        showPokemonCard();
    }
}

form.addEventListener('submit', addPlayerToDatabase);
renderForm();


