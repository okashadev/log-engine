import fs from "node:fs";
import * as readline from "node:readline";

export const stream = fs.createReadStream(
    "logs/application.log",
    { encoding: "utf-8" }
);

export const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
});