const fightArea = document.getElementById('fight-area');
const fightBtn = document.getElementById('fight-btn');
const enemyFightBox = document.getElementById('enemy-card-box');
const myPokemonFightBox = document.getElementById('my-pokemon-card-box');

function generateStatsByLevel() {
    let myPokemonlevel = getPlayersArray()[0].pokemon.level;
    let stats = getRandNumber(myPokemonlevel * 10 - 9, myPokemonlevel * 10);
    return stats;
}

function generateEnemy() {

    let index = getRandNumber(0, 8);
    let enemy = getPokemonsArray()[index];

    enemy.attack = generateStatsByLevel();
    enemy.defense = generateStatsByLevel();
    enemy.health = generateStatsByLevel();
    return enemy;
}

function openFightBox() {
    eventLogArea.innerHTML = null;
    enemyFightBox.innerHTML = '';
    myPokemonFightBox.innerHTML = '';
    fightArea.classList.remove('hide');

    let opponent = generateEnemy();
    let myPokemon = getPlayersArray()[0].pokemon;

    let enemyBox = `
    <div class="pokemon-card-name">Name: ${opponent.name}</div>
    <div class="pokemon-card-picture"><img src="${opponent.picture}"></div>
    <div class="pokemon-card-stat">Attack: ${opponent.attack}</div>
    <div class="pokemon-card-stat">Defense: ${opponent.defense}</div>
    <div class="pokemon-card-stat">Health: ${opponent.health}</div>`;

    let myPokemonBox = `
    <div class="pokemon-card-name">Name: ${myPokemon.name}</div>
    <div class="pokemon-card-picture"><img src="${myPokemon.picture}"></div>
    <div class="pokemon-card-stat">Attack: ${myPokemon.attack}</div>
    <div class="pokemon-card-stat">Defense: ${myPokemon.defense}</div>
    <div class="pokemon-card-stat">Health: ${myPokemon.health}</div>`;

    enemyFightBox.innerHTML = enemyBox;
    myPokemonFightBox.innerHTML = myPokemonBox;

    buttonsEnabler(true);

    eventLogArea.innerHTML = `${myPokemon.name} and ${opponent.name} are ready to fight!`;
    fightBtn.addEventListener('click', () => fight(opponent, myPokemon));
}

function fight(opponent, my_pokemon) {
    eventLogArea.innerHTML = null;

    enemyFightBox.innerHTML = '';
    myPokemonFightBox.innerHTML = '';

    let result = winnerHandler(my_pokemon, opponent);

    if(result.winner) {
        my_pokemon.experience += 2;
    } else {
        my_pokemon.experience += getRandNumber(0,1);
    }

    let myPlayer = getPlayersArray()[0];
    myPlayer.pokemon = my_pokemon;
    setPlayersArray([myPlayer]);
    showPokemonCard();

    
    fightArea.classList.add('hide');
    eventLogArea.innerHTML = `What a fight! ${result.rounds} rounds! ${result.name} won!`;
    buttonsEnabler(false);
}

function winnerHandler(myPokemon, enemy) {
    let whoStarts = getRandNumber(0, 1);
    let fightResult = {winner: '', name: '', rounds: 0, isMyPokemon: ''};
    let attacker;
    let defender;

    if (whoStarts) {
        attacker = myPokemon;
        defender = enemy;
        fightResult.isMyPokemon = true;
    } else {
        attacker = enemy;
        defender = myPokemon;
        fightResult.isMyPokemon = false;
    }
    let result = calculateFightWinner(attacker, defender, fightResult);
    console.log(result);
    
    if (result.isMyPokemon === true) {
        // console.log('Your Pokemon won! You get 2 exp. points.');
        result.winner = 1;
        result.name = `Your ${myPokemon.name}`;
    }  else {
        // console.log('Oh no! Your Pokemon lost! You get 0 or 1 exp. points (selected random).');
        result.winner = 0;
        result.name = `Enemy ${enemy.name}`;
    }
    console.log(result);
    return result;
}


/**
 *This sets all of the Pokemon box buttons to disabled/enabled, while your in a fight mode. it will set 
 element.disabled = true/false.
 * @param {*} bool - must provide boolean, true or false.
 */
function buttonsEnabler(bool) {
    document.getElementById('increase-attack-btn').disabled = bool;
    document.getElementById('increase-defense-btn').disabled = bool;
    document.getElementById('increase-health-btn').disabled = bool;
    document.getElementById('go-fight-btn').disabled = bool;
}
// myPokemon = getPlayersArray()[0].pokemon
const getMinNumberByLevel = () => (getPlayersArray()[0].pokemon.level * 10) - 10 + 1;
const getMaxNumberByLevel = () => (getPlayersArray()[0].pokemon.level * 10) - 1;
