class Pokemon {
    constructor(name, stats) {
        this.name = name[0].toUpperCase() + name.slice(1);
        this.stats = stats;
    }
}

export { Pokemon }