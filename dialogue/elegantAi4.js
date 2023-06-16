/*
 * @职业: 自由 开发者
 * @Description: 
 * @Author: KeHan
 * @Date: 2023-05-16 17:15:50
 * @LastEditTime: 2023-06-08 18:39:56
 * @LastEditors: KeHan
 */
const fs = require('fs');
const path = require('path');
const chalk = require("chalk");
const nodejieba = require('nodejieba');
const expressions1 = require("../Thesaurus/expressions_chat");
const expressions2 = require("../Thesaurus/expressions_emotion");
const expressions3 = require("../Thesaurus/expressions_physical_culture");
const {sendNotification} = require('../node/winNotification');

const {writeToLog} = require('../node/loggin');

const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const chatbotName = "Elegant AI";
const filelog = 'logging_script.txt';
const filefileWire = 'logging_script_file.txt';

class TrieNode {
    constructor(isEnd = false) {
        this.children = {};
        this.isEnd = isEnd;
        this.response = "";
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(keyword, response) {
        let node = this.root;
        for (let i = 0; i < keyword.length; i++) {
            const char = keyword[i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
        node.response = response;
    }

    search(input) {
        let node = this.root;
        let bestMatchNode = null; // 记录最佳匹配的节点
        let bestMatchDistance = Infinity; // 记录最佳匹配的距离
        let i = 0; // 记录当前匹配的输入位置
        while (node && i < input.length) {
            const char = input[i];
            node = node.children[char];
            if (node) {
                if (node.isEnd) {
                    const distance = input.length - i;
                    if (distance < bestMatchDistance) {
                        bestMatchNode = node;
                        bestMatchDistance = distance;
                        if (bestMatchDistance <= 2) { // 当距离小于等于 2 时，直接返回最佳匹配结果
                            return bestMatchNode.response;
                        }
                    }
                }
                i++;
            }
        }
        return bestMatchNode ? bestMatchNode.response : ""; // 返回最佳匹配结果或空字符串
    }

    findMatchesOnPath(input) {
        let node = this.root;
        let bestMatchNode = null; // 记录最佳匹配的节点
        let i = 0; // 记录当前匹配的输入位置
        while (node && i < input.length) {
            const char = input[i];
            node = node.children[char];
            if (node) {
                if (node.isEnd) {
                    bestMatchNode = node;
                }
                i++;
            } else {
                break;
            }
        }
        if (bestMatchNode) {
            return bestMatchNode.response;
        } else {
            return "";
        }
    }
}

// 创建一个 Trie 实例并插入数据
const trie = new Trie();
const allExpressions = [expressions1, expressions2, expressions3];

for (const expressions of allExpressions) {
    for (const expression of expressions) {
        for (const keyword of expression.keywords) {
            trie.insert(keyword.toLowerCase(), expression.response);
        }
    }
}


function scanDirectory(directoryPath) {

    fs.readdir(directoryPath, {withFileTypes: true}, (err, files) => {
        if (err) {
            console.log('Error:', err);
        } else {
            files.forEach((file) => {
                const filePath = path.join(directoryPath, file.name);
                if (file.isDirectory()) {
                    writeToLog('Directory:' + filePath, filefileWire);
                    scanDirectory(filePath);
                } else {
                    console.log('File:' + file.name + ' - Directory:' + directoryPath);
                    writeToLog('File:' + file.name + ' - Directory:' + directoryPath, filefileWire);
                }
            });
        }
    });
}

function chatbotResponse(input) {
    if (input.indexOf('$[') != -1) {
        const directoryPath = '' + input.substring(input.indexOf('$[') + 2, input.indexOf(']$')) + '';
        scanDirectory(directoryPath.replace(/\\/g, '/'));
        return 'Scanning directory...';
    }
    const words = nodejieba.cut(input.toLowerCase());

    let response = '';
    let i = 0;

    // Use a set to store the answers
    let answerSet = new Set();

    while (i < words.length) {
        const word = words[i];
        const matchResult = trie.findMatchesOnPath(word);
        if (matchResult) {
            // Add the match result to the set
            answerSet.add(matchResult);
            i += word.length;
        } else {
            i++;
        }
    }

    for (let answer of answerSet) {
        response += `${answer} `;
    }


    return response.trim() || "I'm sorry, I didn't understand your question. Can you rephrase it?";
}

function outputResponse(response) {
    sendNotification("Elegant AI", response);
    writeToLog('回答：' + response, filelog);
    console.log(); // 输出换行符
    askQuestion();
    // outputChar();
}

module.exports = chatbotResponse;

function askQuestion() {
    rl.question(chalk.yellowBright("You: "), (userInput) => {
        writeToLog('提问：' + userInput, filelog);
        if (userInput.toLowerCase().includes("bye")) {
            console.log(chalk.blueBright("Goodbye! Have a nice day!"));
            rl.close();
            return;
        }
        const chatbotOutput = chatbotResponse(userInput);
        process.stdout.write(chalk.greenBright(chatbotName) + chalk.cyanBright(": 答案在系统通知"));
        outputResponse(chatbotOutput);
        // Add initialization messages

    });
}

let initialized = false;
const messages = [
    "Initializing Elegant AI...",
    "Initializing Elegant AI 数据库...",
    "Initializing Elegant AI 分词器...",
    "Initializing Elegant AI 匹配算法...",
    "Initializing Elegant AI 情绪分析仪...",
    "Initializing Elegant AI 自然语言处理NLP...",
    "Initializing Elegant AI 配置文件1...",
    "Initializing Elegant AI 配置文件2...",
    "Initializing Elegant AI 配置文件3...",
    "Initializing Elegant AI 配置文件4...",
    "Initializing Elegant AI 配置文件5...",
    "Initializing Elegant AI 配置文件6...",
    "Initializing Elegant AI 配置文件7...",
    "Initializing Elegant AI 配置文件8...",
    "Initializing Elegant AI 配置文件9...",
    "Initializing Elegant AI 配置文件10...",
    "Initializing Elegant AI 配置文件11...",
    "Initializing Elegant AI 配置文件12...",
    "Initializing Elegant AI 配置文件13...",
    "Initializing Elegant AI 配置文件14...",
    "Initializing Elegant AI 正在启动...",
];
let i = 0;
const intervalId = setInterval(() => {
    // Use process.stdout.write to overwrite the previous message
    process.stdout.write("\r" + chalk.blueBright(messages[i]));
    i++;
    if (i === messages.length) {
        clearInterval(intervalId);
    }
}, 100);

function loadingBar() {
    const barLength = 20;
    let progress = 0;
    const intervalId = setInterval(() => {
        const bar = chalk.redBright("[" + "#".repeat(progress) + " ".repeat(barLength - progress) + "]");
        // Use process.stdout.write to overwrite the previous bar
        process.stdout.write("\r" + bar + " " + chalk.greenBright(progress * 5 + "%[-]"));
        progress++;
        if (progress > barLength) {
            clearInterval(intervalId);
            writeToLog('结束：Loading complete!', filelog);
        }
    }, 100);
}

loadingBar();
setTimeout(() => {
    // Use console.log to print a new line after the loading bar
    console.log();
    console.log(chalk.blueBright("Elegant AI is ready!"));
    sendNotification("Elegant AI", "Elegant AI 请问有什么可以帮助到您？");
    askQuestion();
}, 3000);
