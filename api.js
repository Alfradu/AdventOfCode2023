const { writeFileSync, existsSync, copyFileSync } = require('fs');
const { config } = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

config();
var date = new Date();
date = date.setHours(date.getHours() - 6);
var day = new Date(date).getDate();
var url = 'https://adventofcode.com/2022/day/' + day + '/input';
var path_input = `./inputs/input${day}.txt`;

if (existsSync(path_input)) {
    console.log("Today's file already downloaded");
    process.exit(0);
}

fetch(url, {
    headers: {
        cookie: `session=${process.env.AOC_SESSION}`
    },
}).then((res) => {
    if (res.status !== 200) {
        throw new Error(String(res.status))
    }
    return res.text();
}).then((body) => {
    writeFileSync(path_input, body.replace(/\n$/, ""))
}).catch((err) => {
    console.error(err);
})

copyFileSync('./template.js', `./days/day${day}.js`);

// fetch('https://adventofcode.com/2022/day/'+day, {
//     method: 'GET', 
//     headers: {
//         cookie: `session=${process.env.AOC_SESSION}`
//     }
//     }).then((res) => {
//     if (res.status !== 200) {
//         throw new Error(String(res.status))
//     }
//     return res.text();
// }).then( (body) => {
//     console.log(body.match(/\<main\>(.|\s)*\<\/main\>/g)[0]);
//     //parsee
//     //\<pre\>\<code\>(.|\s)*\<\/code\>\<\/pre\>
// }).catch(err => console.error('error:' + err));
