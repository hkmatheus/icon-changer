import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import LCUConnector from 'lcu-connector';
import https from 'https';
const connector = new LCUConnector();


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms));
var credentials;

async function welcome(){
    connector.on('connect', (data) => {
        credentials = data
    });
    connector.start();
    figlet('icon changer', function(err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(chalk.whiteBright(data))
        }
    })
    await sleep();
    await ask();
}

await welcome();

async function ask(){
    const answers = await inquirer.prompt({
        name: 'input',
        type: 'list',
        message: 'What do you want to do? \n',
        choices: [
            'Change icon',
            'Exit'
        ],
    });

    return handle(answers.input);
}

async function handle(input){
    if (input === 'Change icon'){
        await ask2()
    } else {
        return
    }
}

async function ask2(){
    const answers = await inquirer.prompt({
        name: 'input',
        type: 'input',
        message: 'What is the number of the icon you want? \n',
    });

    return handle2(answers.input);
}

async function handle2(input){
    this.api = axios.create({
        baseURL: `https://127.0.0.1:${credentials.port}`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`)
            .toString("base64")}`,
        },
        httpsAgent: agent
    });
} 