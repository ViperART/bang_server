import Hero from "../heroes/hero";

export const HeroType = {
    KILLER: 0,
    JANET: 1,
    BLACK_JACK: 2,
    SAM: 3
};

const heroesList = [
    new Hero('Киллер Слэб', HeroType.KILLER, 4),
    new Hero('Бедствие Жанет', HeroType.JANET, 4),
    new Hero('Блэк Джек', HeroType.BLACK_JACK, 4),
    new Hero('Сэм Стервятник', HeroType.SAM, 4),
];

export const getHeroes = function(playersCount) {
    let shuffledHeroes = heroesList.shuffle();
    return shuffledHeroes.splice(0, playersCount);
};
