import Weapon from "../cards/weapon";
import ActionCard, {ActionCardType} from "../cards/actionCard";
import Buff, {BuffType} from "../cards/buff";

export const CardSuit = {
    CLUBS: 0,
    DIAMONDS: 1,
    HEARTS: 2,
    SPADES: 3
};

export const CardRank = {
    ACE: 'A',
    KING: 'K',
    QUEEN: 'Q',
    JACK: 'J'
};

export const CardType = {
    ACTION: 0,
    BUFF: 1,
    WEAPON: 2
};

export const cardsList = [
    new Weapon('Ярость', CardSuit.CLUBS, 10, 1),
    new Weapon('Ярость', CardSuit.SPADES, 10, 1),
    new Weapon('Скофилд', CardSuit.CLUBS, CardRank.JACK, 2),
    new Weapon('Скофилд', CardSuit.CLUBS, CardRank.QUEEN, 2),
    new Weapon('Скофилд', CardSuit.SPADES, CardRank.KING, 2),
    new Weapon('Ремингтон', CardSuit.CLUBS, CardRank.KING, 3),
    new Weapon('Карабин', CardSuit.CLUBS, CardRank.ACE, 4),
    new Weapon('Винчестер', CardSuit.SPADES, 8, 5),

    new Buff('Мустанг', CardSuit.HEARTS, 8, BuffType.MUSTANG),
    new Buff('Мустанг', CardSuit.HEARTS, 9, BuffType.MUSTANG),

    new Buff('Динамит', CardSuit.HEARTS, 2, BuffType.DYNAMITE),

    new Buff('Аппалуза', CardSuit.SPADES, CardRank.ACE, BuffType.SCOPE),

    new Buff('Тюрьма', CardSuit.SPADES, 10, BuffType.JAIL),
    new Buff('Тюрьма', CardSuit.SPADES, CardRank.JACK, BuffType.JAIL),
    new Buff('Тюрьма', CardSuit.HEARTS, 4, BuffType.JAIL),

    new Buff('Бочка', CardSuit.SPADES, CardRank.QUEEN, BuffType.BARREL),
    new Buff('Бочка', CardSuit.SPADES, CardRank.KING, BuffType.BARREL),

    new ActionCard('Бах!', CardSuit.CLUBS, 2, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.CLUBS, 3, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.CLUBS, 4, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.CLUBS, 5, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.CLUBS, 6, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.CLUBS, 7, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.CLUBS, 8, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.CLUBS, 9, ActionCardType.BANG),

    new ActionCard('Бах!', CardSuit.DIAMONDS, 2, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 3, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 4, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 5, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 6, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 7, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 8, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 9, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, 10, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, CardRank.JACK, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, CardRank.QUEEN, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, CardRank.KING, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.DIAMONDS, CardRank.ACE, ActionCardType.BANG),

    new ActionCard('Бах!', CardSuit.HEARTS, CardRank.QUEEN, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.HEARTS, CardRank.KING, ActionCardType.BANG),
    new ActionCard('Бах!', CardSuit.HEARTS, CardRank.ACE, ActionCardType.BANG),

    new ActionCard('Бах!', CardSuit.SPADES, CardRank.ACE, ActionCardType.BANG),

    new ActionCard('Дилижанс', CardSuit.SPADES, 9, ActionCardType),
    new ActionCard('Дилижанс', CardSuit.SPADES, 9, ActionCardType),

    new ActionCard('Уэллс-Фарго', CardSuit.HEARTS, 3, ActionCardType.WELLS_FARGO),

    new ActionCard('Гатлинг', CardSuit.HEARTS, 10, ActionCardType.GATLING),

    new ActionCard('Салун', CardSuit.HEARTS, 5, ActionCardType.SALOON),

    new ActionCard('Индейцы', CardSuit.DIAMONDS, CardRank.ACE, ActionCardType.INDIANS),
    new ActionCard('Индейцы', CardSuit.DIAMONDS, CardRank.KING, ActionCardType.INDIANS),

    new ActionCard('Дуэль', CardSuit.CLUBS, 8, ActionCardType.DUEL),
    new ActionCard('Дуэль', CardSuit.CLUBS, CardRank.JACK, ActionCardType.DUEL),
    new ActionCard('Дуэль', CardSuit.CLUBS, CardRank.QUEEN, ActionCardType.DUEL),

    new ActionCard('Паника!', CardSuit.HEARTS, CardRank.QUEEN, ActionCardType.PANIC),
    new ActionCard('Паника!', CardSuit.HEARTS, CardRank.ACE, ActionCardType.PANIC),
    new ActionCard('Паника!', CardSuit.HEARTS, CardRank.JACK, ActionCardType.PANIC),
    new ActionCard('Паника!', CardSuit.DIAMONDS, 8, ActionCardType.PANIC),

    new ActionCard('Плутовка Кэт', CardSuit.DIAMONDS, 9, ActionCardType.CAT_BALOU),
    new ActionCard('Плутовка Кэт', CardSuit.DIAMONDS, 10, ActionCardType.CAT_BALOU),
    new ActionCard('Плутовка Кэт', CardSuit.DIAMONDS, CardRank.JACK, ActionCardType.CAT_BALOU),
    new ActionCard('Плутовка Кэт', CardSuit.HEARTS, CardRank.KING, ActionCardType.CAT_BALOU),

    new ActionCard('Пиво', CardSuit.HEARTS, 6, ActionCardType.BEER),
    new ActionCard('Пиво', CardSuit.HEARTS, 7, ActionCardType.BEER),
    new ActionCard('Пиво', CardSuit.HEARTS, 8, ActionCardType.BEER),
    new ActionCard('Пиво', CardSuit.HEARTS, 9, ActionCardType.BEER),
    new ActionCard('Пиво', CardSuit.HEARTS, 10, ActionCardType.BEER),
    new ActionCard('Пиво', CardSuit.HEARTS, CardRank.JACK, ActionCardType.BEER),

    new ActionCard('Промах!', CardSuit.CLUBS, 3, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.CLUBS, 10, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.CLUBS, CardRank.ACE, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.CLUBS, CardRank.QUEEN, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.CLUBS, 2, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.SPADES, 3, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.SPADES, 4, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.SPADES, 5, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.SPADES, 6, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.SPADES, 7, ActionCardType.MISSED),
    new ActionCard('Промах!', CardSuit.SPADES, 8, ActionCardType.MISSED),

    new ActionCard('Магазин', CardSuit.SPADES, CardRank.QUEEN, ActionCardType.SHOP),
    new ActionCard('Магазин', CardSuit.CLUBS, 9, ActionCardType.SHOP),
];
