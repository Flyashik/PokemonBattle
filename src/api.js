async function fetchPokemonInfo(name) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    let body = await response.json();
    let setStats = {};
    body.stats.forEach(element => {
        setStats[element.stat.name] = element.base_stat;
    });
    return await setStats;
}

export {fetchPokemonInfo}