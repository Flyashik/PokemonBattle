import PolygonChart from './resources/PolygonChart.js'
import { fetchPokemonInfo } from './api.js'


document.addEventListener('DOMContentLoaded', setup)

function setup() {
	document.getElementById('start').onclick = createBattle;
	
	let btn = document.querySelector('#toTop');
    btn.onclick = function (click) {
        click.preventDefault();
        scrollTo(0, 400);
    }
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
			statsArray.push(stats[key] / 200);
			let stat = document.createElement("ol");
			stat.innerHTML = key[0].toUpperCase() + key.slice(1) + ': ' + stats[key];
			statsLi.appendChild(stat);
			sumStats += stats[key];
		}
		let chart = drawChart(statsArray);
		statsLi.appendChild(chart);
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

function drawChart(data) {
	let chartDiv = document.createElement('div');
	chartDiv.setAttribute("class", "polygon-chart");
	chartDiv.setAttribute("id", "polygon-chart");

	let chart = new PolygonChart({
        target: chartDiv,
        radius: 150,
        data: {
            data: [
                data,
            ],
            sides: 6,
            tooltips: {
                roundTo: 2,
                percentage: true,
            },
            colors: {
                normal: {
                    polygonStroke: "#FA721B",
                    polygonFill: "rgba(235, 80, 1, 0.59)",
                    pointStroke: "#e44d01",
                    pointFill: "#e44d01",
                },
                onHover: {
                    polygonStroke: "#9c0303",
                    polygonFill: "rgba(254, 119, 52, 0.4)",
                    pointStroke: "#f86f2a",
                    pointFill: "#FFFFFF",
                },
            },
        },
        polygon: {
            colors: {
                normal: {
                    fill: "#F0D950",
                    stroke: "#0DE01F",
                },
                onHover: {
                    fill: "#F06534",
                    stroke: "#e03d3d",
                }
            }
        },
        levels: {
            count: 10,
            labels: {
                enabled: false,
                position: {
                    spline: 3,
                    quadrant: 0,
                },
                colors: {
                    normal: "#000000",
                    onHover: "#000000",
                },
            },
        },
    });
    chart.init();
	return chartDiv;
}

function scrollTo(to, duration = 700) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
            else {
                element.scrollTop = to;
            }
        };
    animateScroll();
}
