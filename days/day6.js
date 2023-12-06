const parseInput = (input) => input.split("\n");

const part1 = (input) => {
    const data = parseInput(input);
    var times = data[0].match(/([0-9]+)/g);
    var distances = data[1].match(/([0-9]+)/g);
    var solutions = [];
    for (var boat = 0; boat < times.length; boat++){
        solutions.push(calculateSolutions(times[boat], distances[boat]))
    }
    return solutions.reduce((a,b) => a * b);
}

const part2 = (input) => {
    const data = parseInput(input);
    var time = data[0].match(/([0-9]+)/g).join('');
    var distance = data[1].match(/([0-9]+)/g).join('');
    return calculateSolutions(time, distance)
}

function calculateSolutions(time, distance){
    var velocity = 0;
    var goodRuns = 0;
    for (var ms = 0; ms <= time; ms++){
        var result = velocity*(time-ms);
        if (result > distance) goodRuns++;
        velocity++;
    }
    return goodRuns;
}

module.exports = {
    part1: {
        tests: [
            {
              input: `Time:      7  15   30
Distance:  9  40  200`,
              expected: 288,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
              input: `Time:      7  15   30
Distance:  9  40  200`,
              expected: 71503,
            },
        ],
        solution: part2,
    },
};