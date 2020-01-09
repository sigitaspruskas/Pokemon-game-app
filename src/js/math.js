function calculateFightWinner(attacker, defender, object) {
        // Object.assign() padaro objekto klona, kas leis keisti duomenis nekeiciant originalo.
        let attackingPokemon = Object.assign({}, attacker);
        let defendingPokemon = Object.assign({}, defender);
        let battleObjectCopy = Object.assign({}, object);
        battleObjectCopy.rounds += 1;

        console.log('Is this my Pokemon attacking?: ' + object.isMyPokemon);

        if (defendingPokemon.defense > 0) {
            console.log(`${attackingPokemon.name} (${attackingPokemon.attack} power) attacks ${defendingPokemon.name} defense (${defendingPokemon.defense}) points.`);
            console.log(' ');
            defendingPokemon.defense -= attackingPokemon.attack;

            if (defendingPokemon.defense >= 0) {
                battleObjectCopy.isMyPokemon = booleanHandler(object);
                return calculateFightWinner(defendingPokemon, attackingPokemon, battleObjectCopy);

            } else if (defendingPokemon.defense < 0) {
                defendingPokemon.health += defendingPokemon.defense;

                if (defendingPokemon.health > 0) {
                    battleObjectCopy.isMyPokemon = booleanHandler(object);
                    return calculateFightWinner(defendingPokemon, attackingPokemon, battleObjectCopy);
                } else {
                    console.log(`Winner is ${attackingPokemon.name}!`);
                    battleObjectCopy.name = attacker.name;
                    return battleObjectCopy;
                }
            }
        }
        else if (defendingPokemon.defense <= 0) {
            console.log(`${attackingPokemon.name} (${attackingPokemon.attack} power) attacks ${defendingPokemon.name} health (${defendingPokemon.health}) points.`);
            console.log(' ');

            if (defendingPokemon.health > 0) {
                defendingPokemon.health -= attackingPokemon.attack;

                if (defendingPokemon.health > 0) {
                    battleObjectCopy.isMyPokemon = booleanHandler(object);
                    return calculateFightWinner(defendingPokemon, attackingPokemon, battleObjectCopy);
                } else {
                    console.log(`Winner is ${attackingPokemon.name}!`);
                    battleObjectCopy.name = attacker.name;
                    return battleObjectCopy;
                }
            }
        }
    };

    function booleanHandler(object){

        if(object.isMyPokemon == true){
            return false;
        } else {
            return true;
        }
    }
