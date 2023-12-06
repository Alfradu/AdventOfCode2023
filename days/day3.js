const parseInput = (input) => input.split("\n");

// type Coord = { x: Number, y: Number };
// type Part = {
//   number: String,
//   type: String,
//   startCoord: Coord,
//   partCoord: Coord,
//   isPartNumber: false,
// };

const part1 = (input) => {
    const data = parseInput(input);
    var num = /[0-9]/;
    var parts = [];
    var part = {
        number: "",
        type: "",
        startCoord: {},
        partCoord: {},
        isPartNumber: false,
    };
    for (var row = 0; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
            if (num.test(data[row][col])) {
                part.number += data[row][col];
                if (Object.keys(part.startCoord).length === 0)
                    part.startCoord = { x: col, y: row };
                var next = col + 1;
                if (next > data[row].length || !num.test(data[row][next])) {
                    part = checkForPart(part, data);
                    parts.push({ ...part });
                    part = {
                        number: "",
                        type: "",
                        startCoord: {},
                        partCoord: {},
                        isPartNumber: false,
                    };
                }
            }
        }
    }
    var sum = 0;
    parts
        .filter((p) => p.isPartNumber)
        .forEach((p) => (sum += parseInt(p.number)));
    return sum;
};

var gears = [];
const part2 = (input) => {
    const data = parseInput(input);
    gears = [];
    var num = /[0-9]/;
    var part = {
        number: "",
        type: "",
        startCoord: {},
        partCoord: {},
        isPartNumber: false,
    };
    for (var row = 0; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
            if (num.test(data[row][col])) {
                part.number += data[row][col];
                if (Object.keys(part.startCoord).length === 0)
                    part.startCoord = { x: col, y: row };
                var next = col + 1;
                if (next > data[row].length || !num.test(data[row][next])) {
                    part = checkForPart(part, data);
                    part = {
                        number: "",
                        type: "",
                        startCoord: {},
                        partCoord: {},
                        isPartNumber: false,
                    };
                }
            }
        }
    }
    var sum = 0;
    var validGears = gears.filter((f) => f.numberArr.length == 2);
    validGears.forEach((g) => (sum += g.ratio));
    return sum;
};

function checkForPart(part, matrix) {
    var startPos = part.startCoord;
    for (var col = startPos.x; col < startPos.x + part.number.length; col++) {
        var { p, pos } = checkNeighbours(startPos.y, col, matrix);
        if (p != "") {
            if (p == "*") addGearNumber(pos, part.number);
            part.partCoord = pos;
            part.type = p;
            part.isPartNumber = true;
            break;
        }
    }

    return { ...part };
}

function checkNeighbours(row, col, matrix) {
    var regex = /[^0-9\.]/;
    var neighbours = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
    ];
    for (var neighbour of neighbours) {
        var checkPos = { x: neighbour[1] + col, y: neighbour[0] + row };
        if (
            checkPos.x > 0 &&
            checkPos.y > 0 &&
            checkPos.x < matrix[row].length &&
            checkPos.y < matrix.length
        ) {
            if (regex.test(matrix[checkPos.y][checkPos.x])) {
                return { p: matrix[checkPos.y][checkPos.x], pos: checkPos };
            }
        }
    }
    return { p: "", pos: "" };
}

function addGearNumber(pos, number) {
    var gearIndex = gears.findIndex(
        (g) => g.pos.x == pos.x && g.pos.y == pos.y
    );
    if (gearIndex != -1) {
        gears[gearIndex].numberArr.push(parseInt(number));
        gears[gearIndex].ratio *= parseInt(number);
    } else {
        gears.push({
            pos: { ...pos },
            numberArr: [parseInt(number)],
            ratio: parseInt(number),
        });
    }
}

module.exports = {
    part1: {
        tests: [
            {
                input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
                expected: 4361,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
                expected: 467835,
            },
        ],
        solution: part2,
    },
};
