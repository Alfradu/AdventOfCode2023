const parseInput = (input) => input.split("\n");

const configuration = { red: 12, green: 13, blue: 14 };

const part1 = (input) => {
  const data = parseInput(input);
  var results = game(configuration, data);
  return results.part1;
};

const part2 = (input) => {
  const data = parseInput(input);
  var results = game(configuration, data)
  return results.part2;
};

function game(configuration, data){
    var gameNrTot = 0;
    var totPower = 0;
    for (var row of data) {
      var game = { red: 0, green: 0, blue: 0 };
      var [gameNr, rounds] = row.split(": ");
      gameNr = parseInt(gameNr.split(" ")[1]);
      rounds = rounds.split("; ");
      for (var round of rounds) {
        var cubes = round.split(", ");
        for (var cube of cubes) {
          var [number, color] = cube.split(" ");
          number = parseInt(number);
          switch (color) {
            case "red":
              game.red = game.red < number ? number : game.red;
              break;
            case "green":
              game.green = game.green < number ? number : game.green;
              break;
            case "blue":
              game.blue = game.blue < number ? number : game.blue;
              break;
            default:
              console.log("uh oh");
              break;
          }
        }
      }
      if (
        Object.keys(configuration).every(
          (key) => game.hasOwnProperty(key) && game[key] <= configuration[key]
        )
      ) {
          gameNrTot += gameNr;
      }
      totPower += game.red*game.green*game.blue;
    }
    return { part1: gameNrTot, part2: totPower };
}
module.exports = {
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
};
