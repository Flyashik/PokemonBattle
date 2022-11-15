import { fetchPokemonInfo } from './api.js'


document.addEventListener('DOMContentLoaded', setup)

function setup() {
    document.getElementById('start').onclick = createBattle;
}

async function createBattle() {
    let container = document.getElementById('battle');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (checkFields()) {
        container.innerHTML = checkFields();
        return;
    }

    addCard('first');
    addCard('second');
}

async function addCard(input) {
    let name = document.getElementById(input).value.toLowerCase();
    let stats = await fetchPokemonInfo(name);
    let statsLi = document.createElement("li");
    
    statsLi.setAttribute("class", "dynamic-card" + input);
    for (key in stats) {
        let stat = document.createElement("ol");
        stat.innerHTML = key[0].toUpperCase() + key.slice(1) + ': ' + stats[key];
        statsLi.appendChild(stat);
    }
    document.getElementById('battle').appendChild(statsLi);
}

// function statAverage(stats) {
//     let sumStats = 0;
//     for(key in stats) {
//         sumStats += stats[key];
//     }
//     return sumStats / 6;
// }

function checkFields() {
    if (document.getElementById('first').value == "" || document.getElementById('second').value == "") {
        return "Please complete both fields";
    }
    return;
}

