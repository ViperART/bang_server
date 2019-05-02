import Hero from "../heroes/hero";

export const HeroType = {
    KILLER: 0,
    JANET: 1,
    BLACK_JACK: 2,
    SAM: 3,
    PEDRO: 4,
    KIT: 5,
    PAUL: 6,
    GRINGO: 7,
    JESSY: 8,
    ROSE: 9,
    JORDONNAS: 10,
    WILLY: 11,
    SUZIE: 12,
    SID: 13,
    BART: 14,
    DUKE: 15
};

const heroesList = [
    new Hero('Киллер Слэб', HeroType.KILLER, 4),
    new Hero('Бедствие Жанет', HeroType.JANET, 4),
    new Hero('Блэк Джек', HeroType.BLACK_JACK, 4),
    new Hero('Сэм Стервятник', HeroType.SAM, 4),
    new Hero('Педро Рамирез', HeroType.PEDRO, 4),
    new Hero('Кит Карлсон', HeroType.KIT, 4),
    new Hero('Поль Огорчение', HeroType.PAUL, 3),
    new Hero('Эль Гринго', HeroType.GRINGO, 3),
    new Hero('Джесси Джонс', HeroType.JESSY, 4),
    new Hero('Роза Дулан', HeroType.ROSE, 4),
    new Hero('Джордоннас', HeroType.JORDONNAS, 4),
    new Hero('Малыш Вилли', HeroType.WILLY, 4),
    new Hero('Сьюзи Лафейетт', HeroType.SUZIE, 4),
    new Hero('Сид Кетчум', HeroType.SID, 4),
    new Hero('Барт Кэссиди', HeroType.BART, 4),
    new Hero('Счастливчик Дюк', HeroType.DUKE, 4),
];

export const getHeroes = function(playersCount) {
    let shuffledHeroes = [...heroesList].shuffle();
    return shuffledHeroes.splice(0, playersCount);
};
