const parseInput = (input) => input.split('\n');

const part1 = (input) => {
    const data = parseInput(input);
    var calibrationSum = 0;
    for (var row of data){
        row = row.replace(/[^0-9]/g, "");
        var calibrationNumber;
        if (row.length < 2) calibrationNumber = row + row;
        else if (row.length > 2) calibrationNumber = row[0] + row[row.length-1];
        else calibrationNumber = row;
        calibrationSum += parseInt(calibrationNumber);
    }
    return calibrationSum
}

const part2 = (input) => {
    const data = parseInput(input);
    var numberLookup = ["one","two","three","four","five","six","seven","eight","nine"]
    var numbersRgxStart = /[0-9]|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/
    var numbersRgxEnd = /[0-9]|(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)/
    var calibrationSum = 0;
    for (var row of data){
        var match1 = row.match(numbersRgxStart)
        var invert = row.split("").reverse().join("")
        var match2 = invert.match(numbersRgxEnd).filter(f => f)[0]
        var revert = match2.split("").reverse().join("")
        var calibrationNumber = match1.filter(n => n)[0] + revert
        for (var i = 0; i< numberLookup.length; i++){
            if (calibrationNumber.includes(numberLookup[i])) calibrationNumber = calibrationNumber.replaceAll(numberLookup[i], i+1)
        }
        calibrationSum += parseInt(calibrationNumber);
    }
    return calibrationSum
}

module.exports = {
    part1: {
        tests: [
            {
              input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
              expected: 142,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
              input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
              expected: 281,
            },
            {
                input: `1sevenine`,
                expected: 19
            },
            {
                input: `seven`,
                expected: 77
            }
        ],
        solution: part2,
    },
};