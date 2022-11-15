function fetchPokemonInfo(name) {
    // const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    // if(!response.ok)
    // {
    //     let error = "Sorry, I can't catch this Pokemon:(";
    // }
    // let body = await response.json();
    // let setStats = {};
    // body.stats.forEach(element => {
    //     setStats[element.stat.name] = element.base_stat;
    // });
    // return await error, setStats;
    return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('404');
        })
        .catch((error) => {
            return error;
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