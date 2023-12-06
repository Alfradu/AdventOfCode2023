const parseInput = (input) => input.split("\n\n");

const part1 = (input) => {
    const data = parseInput(input);
    var seeds = parseSeeds(data[0]);
    var maps = createMaps(data);
    return getClosestLoc(seeds, maps);
};

const part2 = (input) => {
    const data = parseInput(input);
    return parseSeedRanges(parseSeeds(data[0]), data);
};

function getClosestLoc(seeds, maps) {
    for (var seed of seeds) {
        for (var map of maps) {
            seed.push(lookupMapDestination(seed[seed.length - 1], map));
        }
    }
    return seeds.map((m) => m[m.length - 1]).sort((a, b) => a - b)[0];
}

function getClosestLocSimpleSeed(seed, maps) {
        for (var map of maps) {
            seed.push(lookupMapDestination(seed[seed.length - 1], map));
        }
    return seed[seed.length - 1];
}

function lookupMapDestination(source, map) {
    for (var instruction of map) {
        var sourceRangeStart = instruction[1];
        var sourceRangeEnd = instruction[1] + instruction[2] - 1;
        if (sourceRangeStart <= source && sourceRangeEnd >= source) {
            var link = source - sourceRangeStart;
            return instruction[0] + link;
        }
    }
    return source;
}

function parseSeedRanges(seeds, data) {
    var closestLoc = Number.MAX_VALUE;
    var maps = createMaps(data);
    for (var seed = 0; seed < seeds.length; seed += 2) {
        for (var range = 0; range < seeds[seed + 1][0]; range++) {
            var location = getClosestLocSimpleSeed([seeds[seed][0] + range], maps);
            closestLoc = closestLoc > location ? location : closestLoc;
        }
    }
    return closestLoc;
}

function parseSeeds(seeds) {
    return seeds
        .split(": ")[1]
        .split(" ")
        .map((m) => [parseInt(m)]);
}
function parseMap(map) {
    return map
        .split(":\n")[1]
        .split("\n")
        .map((m) => m.split(" ").map((n) => parseInt(n)));
}

function createMaps(data) {
    var seed2soil = parseMap(data[1]);
    var soil2fert = parseMap(data[2]);
    var fert2water = parseMap(data[3]);
    var water2light = parseMap(data[4]);
    var light2temp = parseMap(data[5]);
    var temp2hum = parseMap(data[6]);
    var hum2loc = parseMap(data[7]);
    return [
        seed2soil,
        soil2fert,
        fert2water,
        water2light,
        light2temp,
        temp2hum,
        hum2loc,
    ];
}

module.exports = {
    part1: {
        tests: [
            {
                input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
                expected: 35,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `seeds: 79 14

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
                expected: 46,
            },
        ],
        solution: part2,
    },
};
