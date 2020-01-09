/**
 * This function calculates how many exp. points you need to upgrade your pokemon stats, and
 * upgrades Pokemon attack or defense, depending on which action button was clicked
 * (by checking event.target.getAttribute('id')). Then it sets (if needed) Pokemon level, and saves 
 * updated Player.pokemon object in to local storage,
 * and renders Controlled Pokemon card again, with updated info.
 */
function upgradeStats() {
    eventLogArea.innerHTML = null;
    let myPlayer = getPlayersArray()[0];
    let myPokemon = myPlayer.pokemon;

    let pointsToUpgrade = myPokemon.level >= 2 ? myPokemon.level * 2 : 2;
    eventLogArea.innerHTML = `You used ${pointsToUpgrade} Experience points to upgrade stats: `

    if (myPokemon.experience >= pointsToUpgrade) {
        if (event.target.getAttribute('id') == 'increase-attack-btn') {
            eventLogArea.innerHTML += 'increase Pokemon attack by 1 point.';
            myPokemon.attack += 1;
            myPokemon.experience -= pointsToUpgrade;

        } else if (event.target.getAttribute('id') == 'increase-defense-btn'){
            eventLogArea.innerHTML += 'increase Pokemon defense by 1 point.';
            myPokemon.defense += 1;
            myPokemon.experience -= pointsToUpgrade;

        } else if (event.target.getAttribute('id') == 'increase-health-btn'){
            eventLogArea.innerHTML += 'increase Pokemon health by 1 point.';
            myPokemon.health += 1;
            myPokemon.experience -= pointsToUpgrade;

        }
    } else {
        eventLogArea.innerHTML = `Not enough Experience points to initiate upgrade. You need ${pointsToUpgrade} points to upgrade.`;
    };

    let levelSetter = myPokemon.level * 10;
    
    if (myPokemon.attack > levelSetter || myPokemon.defense > levelSetter || myPokemon.health > levelSetter) {
        eventLogArea.innerHTML += `<br> Pokemon level upgraded to level ${myPokemon.level + 1}.`;

        if(myPokemon.health <= levelSetter) {
            eventLogArea.innerHTML += `<br> Pokemon health stats upgraded to minimum ${myPokemon.level + 1} level numbers.`;
            myPokemon.health = levelSetter + 1;
        }

        myPokemon.level += 1;
    };

    myPlayer.pokemon = myPokemon;
    setPlayersArray([myPlayer]);
    showPokemonCard();
};

