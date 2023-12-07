const parseInput = (input) => input.split("\n");

const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const cardspt2 = [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
];

var cardTypes = cards;
var p2 = false;

const part1 = (input) => {
    const data = parseInput(input);
    const hands = [];
    for (var row of data) {
        hands.push(checkRules(row));
    }
    hands.sort((a, b) => compareResults(a, b));
    var sum = 0;
    hands.forEach((f, i) => (sum += f.bid * (i + 1)));
    return sum;
};

const part2 = (input) => {
    cardTypes = cardspt2;
    p2 = true;
    const data = parseInput(input);
    const hands = [];
    for (var row of data) {
        hands.push(checkRules(row));
    }
    hands.sort((a, b) => compareResults(a, b));
    var sum = 0;
    hands.forEach((f, i) => (sum += f.bid * (i + 1)));
    return sum;
};

function checkRules(data) {
    var hand = data.split(" ")[0];
    var bid = parseInt(data.split(" ")[1]);
    var result = 0;
    for (var check of checks) {
        var matches = findMatchFunc(hand);
        result = check(matches);
        if (result != 0) return { hand: hand, bid: bid, result: result };
    }
    return { hand: hand, bid: bid, result: 1 };
}

const fiveOfAKind = (hand) => (hand.some((s) => s == 5) ? 7 : 0);
const fourOfAKind = (hand) => (hand.some((s) => s == 4) ? 6 : 0);
const fullHouse = (hand) =>
    hand.some((s) => s == 3) && hand.some((s) => s == 2) ? 5 : 0;
const threeOfAKind = (hand) =>
    hand.some((s) => s == 3) && hand.some((s) => s == 1) ? 4 : 0;
const twoPair = (hand) => (hand.filter((s) => s == 2).length == 2 ? 3 : 0);
const onePair = (hand) => (hand.filter((s) => s == 2).length == 1 ? 2 : 0);

var checks = [
    fiveOfAKind,
    fourOfAKind,
    fullHouse,
    threeOfAKind,
    twoPair,
    onePair,
];

function findMatchFunc(hand) {
    return p2 ? findMatchesWithJokers(hand) : findMatches(hand);
}

function findMatches(hand) {
    var matches = [];
    var ids = [];
    for (var card of hand) {
        var id = ids.indexOf(card);
        if (id == -1) {
            matches.push(1);
            ids.push(card);
        } else {
            matches[id] = matches[id] + 1;
        }
    }
    return matches;
}

function findMatchesWithJokers(hand) {
    var matches = [];
    var ids = [];
    for (var card of hand) {
        var id = ids.indexOf(card);
        if (id == -1) {
            matches.push(1);
            ids.push(card);
        } else {
            matches[id] = matches[id] + 1;
        }
    }

    var jokers = ids.indexOf("J");
    var jokerCount = matches[jokers];
    if (jokers != -1 && jokerCount !== 5) {
        matches.splice(jokers, 1);
        matches.sort((a, b) => b - a);
        matches[0] += jokerCount;
    }

    return matches;
}

function secondOrdering(handA, handB) {
    for (var cardNr = 0; cardNr < handA.hand.length; cardNr++) {
        var cardValueA = getCardValue(handA.hand[cardNr]);
        var cardValueB = getCardValue(handB.hand[cardNr]);
        if (cardValueA == cardValueB) continue;
        return clamp(cardValueA - cardValueB);
    }
    return 0;
}

function getCardValue(card) {
    return cardTypes.indexOf(card);
}

function clamp(value) {
    return Math.max(-1, Math.min(value, 1));
}
function compareResults(handA, handB) {
    if (handA.result == handB.result) return secondOrdering(handA, handB);
    return clamp(handA.result - handB.result);
}

module.exports = {
    part1: {
        tests: [
            {
                input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
                expected: 6440,
            },
            {
                input: `11111 1`,
                expected: 1,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `JJJJJ 1`,
                expected: 1,
            },
            {
                input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
                expected: 5905,
            },
        ],
        solution: part2,
    },
};
