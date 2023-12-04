const { performance } = require('perf_hooks');
const fs = require('fs');

const dayFiles = fs.readdirSync('./days').filter(file => file.endsWith('.js')).sort((a, b) => parseInt(a.substring(3).split('.')[0]) > parseInt(b.substring(3).split('.')[0]) ? 1 : -1);

const providedArgs = process.argv.slice(2);
var runDay = dayFiles.length;
var runTest = false;

for (let i = 0; i < providedArgs.length; i++) {
    if (providedArgs[i] == "-day" && providedArgs[i+1]) runDay = parseInt(providedArgs[i+1]);
    if (providedArgs[i] == "-day" && !providedArgs[i+1]) {
        console.log("-day argument needs a number")
        process.exit(0);
    }
    if (providedArgs[i] == "-test") runTest = true;
}

for (const file of dayFiles) {
    if (file != dayFiles[runDay-1]) continue;
    const day = require(`./days/${file}`);
    if (runTest) runTests(day)
    else runSolution(day)
}

function runSolution(day) {
    var filename = `input${runDay}`;
    var input = fs.readFileSync('./inputs/' + filename + '.txt', 'utf8');
    try {
        var startTime = performance.now();
        var ans = day.part1.solution(input);
        var endTime = performance.now();
        console.log(`Day ${runDay} Part 1 :: ms ${(endTime - startTime).toFixed(2)} :: ${ans}`);
    }
    catch (error) { logError(error, 1, '') }
    try {
        var startTime = performance.now();
        var ans = day.part2.solution(input);
        var endTime = performance.now();
        console.log(`Day ${runDay} Part 2 :: ms ${(endTime - startTime).toFixed(2)} :: ${ans}`);
    }
    catch (error) { logError(error, 2, '') }
}

function runTests(day) {
    try {
        var tests = day.part1.tests;
        if (tests.length < 1) throw {name : "NoTestsError", message : "no tests found for part 1"}; 
        for (let i = 0; i < tests.length; i++) {
            var ans = day.part1.solution(tests[i].input);
            if (ans != tests[i].expected) console.log(`Day ${runDay} Part 1 Test ${i+1} failed. Expected ${tests[i].expected} but got ${ans}`);
            else console.log(`Day ${runDay} Part 1 Test ${i+1} succeded`);
        }
    }
    catch (error) { logError(error, 1, 'tests for') }
    try {
        var tests = day.part2.tests;
        if (tests.length < 1) throw {name : "NoTestsError", message : "no tests found for part 2"}; 
        for (let i = 0; i < tests.length; i++) {
            var ans = day.part2.solution(tests[i].input);
            if (ans != tests[i].expected) console.log(`Day ${runDay} Part 2 Test ${i+1} failed. Expected ${tests[i].expected} but got ${ans}`);
            else console.log(`Day ${runDay} Part 2 Test ${i+1} succeded `);
        }
    }
    catch (error) { logError(error, 2, 'tests for') }
}

function logError(err, part, test){
    console.log(`Could not run ${test} day ${runDay} part ${part}: ${err.name} :: ${err.message}`);
}