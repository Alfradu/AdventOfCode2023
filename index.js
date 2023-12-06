const { performance } = require('perf_hooks');
const fs = require('fs');

const dayFiles = fs.readdirSync('./days').filter(file => file.endsWith('.js')).sort((a, b) => parseInt(a.substring(3).split('.')[0]) > parseInt(b.substring(3).split('.')[0]) ? 1 : -1);

const providedArgs = process.argv.slice(2);
var date = new Date();
date = date.setHours(date.getHours() - 6);
var runDay = new Date(date).getDate();
var runTest = true;
var part2Only = false;

for (let i = 0; i < providedArgs.length; i++) {
    if (providedArgs[i] == "-day" && providedArgs[i+1]) runDay = parseInt(providedArgs[i+1]);
    if (providedArgs[i] == "-notest") runTest = false;
    if (providedArgs[i] == "-part2") part2Only = true;
}
const dayFileName = `day${runDay}.js`
const currDay = require(`./days/${dayFiles.find(f => f==dayFileName)}`);
try{
    if (runTest && !part2Only) runTests(currDay, 1)
    if (!part2Only) runSolutions(currDay, 1)
    if (runTest) runTests(currDay, 2)
    runSolutions(currDay, 2)
} catch (error) {
    console.log("exiting early")
}


function runSolutions(day, solution) {
    var filename = `input${runDay}`;
    var currSolution = solution == 1 ? day.part1 : day.part2;
    var input = fs.readFileSync('./inputs/' + filename + '.txt', 'utf8');
    try {
        var startTime = performance.now();
        var ans = currSolution.solution(input);
        var endTime = performance.now();
        console.log(`Day ${runDay} Part ${solution} :: ms ${(endTime - startTime).toFixed(2)} :: ${ans}`);
    }
    catch (error) { 
        logError(error, solution, '');
        throw {name: "SolutionError", message: "Solution failed"};
    }
}

function runTests(day, solution) {
    var currSolution = solution == 1 ? day.part1 : day.part2;
    try {
        var tests = currSolution.tests;
        if (tests.length < 1) throw {name : "FailingTestError", message : "no tests found for part " + solution}; 
        for (let i = 0; i < tests.length; i++) {
            var ans = currSolution.solution(tests[i].input);
            if (ans != tests[i].expected) throw {name : "FailingTestError", message : `Day ${runDay} Part ${solution} Test ${i+1} failed. Expected ${tests[i].expected} but got ${ans}`}; 
            else console.log(`Day ${runDay} Part ${solution} Test ${i+1} succeded`);
        }
    }
    catch (error) { 
        logError(error, solution, 'tests for');
        throw {name: "TestError", message: "tests failed"};
    }
}

function logError(err, part, test){
    console.log(`Could not run ${test} day ${runDay} part ${part}: ${err.name} :: ${err.message}`);
}