const parseInput = (input) => input.split("\n");

const part1 = (input) => {
    const data = parseInput(input);
    var points = 0;
    for (var card of data){
        var cardNumbers = card.split("| ")[1].split(" ").map(n => parseInt(n)).filter(s => s);
        var winningNumbers = card.split("| ")[0].split(": ")[1].split(" ").map(n => parseInt(n)).filter(s => s);
        var match = 0
        for (var pos = 0; pos < cardNumbers.length; pos++){
            if (winningNumbers.includes(cardNumbers[pos])) match = match == 0 ? 1 : match + match;
        }
        points += match
    }
    return points;
}

const part2 = (input) => {
    const data = parseInput(input).map((m, i) => ({ card: m, nr: i+1, count: 1 }));
    for (var row of data){
        var cardNumbers = row.card.split("| ")[1].split(" ").map(n => parseInt(n)).filter(s => s);
        var winningNumbers = row.card.split("| ")[0].split(": ")[1].split(" ").map(n => parseInt(n)).filter(s => s);
        var matches = 0;
        for (var winningNumber of winningNumbers){
            if (cardNumbers.includes(winningNumber)) matches++;
        }
        for (var lookAhead = row.nr; lookAhead < data.length && lookAhead < row.nr + matches; lookAhead++){
            data[lookAhead].count += row.count;
        }
        
    }
    var scratchCards = 0;
    data.forEach(s => scratchCards += s.count);
    return scratchCards;
}

module.exports = {
    part1: {
        tests: [
            {
              input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
              expected: 13,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
              input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
              expected: 30,
            },
        ],
        solution: part2,
    },
};