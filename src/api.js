function fetchPokemonInfo(name) {
    return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('404');
        })
        .then((body) => {
            let setStats = {};
            body.stats.forEach(element => {
                setStats[element.stat.name] = element.base_stat;
            });
            return setStats;
        })
}

export { fetchPokemonInfo }