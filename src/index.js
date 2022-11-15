import PolygonChart from 'https://unpkg.com/polygonchart.js@1.0.0/dist/PolygonChart.umd.js';
import { fetchPokemonInfo } from './api.js'


document.addEventListener('DOMContentLoaded', setup)

function setup() {
    document.getElementById('start').onclick = createBattle;
}

function createBattle() {
    let container = document.getElementById('battle');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (checkFields()) {
        container.innerHTML = checkFields();
        return;
    }

    const myData = [0.6119768296901937, 0.2724477365138749, 0.239318715565223, 0.8984415079405608, 0.6583948674656563];
    
    let sides = 4;

let data = [[
  0.7045,
  0.87,
  0.5049,
  0.8418,
]];

let el = document.getElementById("polygon-chart");

let chart = new PolygonChart({
  target: el,
  radius: 200,
  data: {
    data: data,
    sides: sides,
    tooltips: {
      roundTo: 2,
      percentage: true
    },
    colors: {
      normal: {
        polygonStroke: "#A54AE9",
        polygonFill: "#a54ae94f",
        pointStroke: "transparent",
        pointFill: "#A54AE9"
      },
      onHover: {
        polygonStroke: "#A54AE9",
        polygonFill: "rgba(0,0,0,0.3)",
        pointStroke: "#A54AE9",
        pointFill: "#fff"
      }
    }
  },
  polygon: {
    colors: {
      normal: {
        fill: "#231E2C",
        stroke: "#3A255E"
      },
      onHover: {
        fill: "#231E2C",
        stroke: "#993DE0"
      }
    }
  },
  levels: {
    count: 5,
    labels: {
      enabled: true,
      position: {
        quadrant: 2,
      },
      colors: {
        normal: "#8B27D7",
        onHover: "#A54AE9"
      }
    }
  }
});
chart.init();

    Promise.all([addCard('first'), addCard('second')])
        .then(sums => {
            let winner = document.getElementById('winner');
            if (sums[0].sumStats > sums[1].sumStats) {
                winner.innerHTML = sums[0].name[0].toUpperCase() + sums[0].name.slice(1) + ' is win!';
            }
            else if (sums[0].sumStats == sums[1].sumStats) {
                winner.innerHTML = 'Draw!';
            }
            else {
                winner.innerHTML = sums[1].name[0].toUpperCase() + sums[1].name.slice(1) + ' is win!';
            }
        })
}

function addCard(input) {
    let name = document.getElementById(input).value.toLowerCase();
    let sumStats = fetchPokemonInfo(name).then((stats) => {
        let statsLi = document.createElement("li");
        statsLi.setAttribute("class", "dynamic-card" + input);
        let nameOl = document.createElement("ol");
        nameOl.innerHTML = name[0].toUpperCase() + name.slice(1);
        statsLi.appendChild(nameOl);
        let sumStats = 0;
        let statsArray = [];
        for (key in stats) {
            statsArray.push(stats[key]);
            let stat = document.createElement("ol");
            stat.innerHTML = key[0].toUpperCase() + key.slice(1) + ': ' + stats[key];
            statsLi.appendChild(stat);
            sumStats += stats[key];
        }
        document.getElementById('battle').appendChild(statsLi);
        sumStats /= 6;

        return { name, sumStats };
    })
        .catch((error) => {
            document.getElementById('battle').innerHTML = `Sorry, I can\'t find ${name} among Pokemons&#129301;`;
        })

    return name, sumStats;
}


function checkFields() {
    if (document.getElementById('first').value == "" || document.getElementById('second').value == "") {
        return "Please complete both fields";
    }
    return;
}

// function drawChart(data) {
//     let container = document.getElementById('battle');

    
// }
