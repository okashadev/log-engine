import { parser } from "./parser.js";
import { filterByLevel, filteredLogs, searchByKeyword } from "./analyzer.js";
import { rl, stream } from "./reader.js";

let logs = [];

rl.on("line", (line) => {
    if (!line.trim()) return;

    const parsed = parser(line);

    if (parsed !== null) {
        logs.push(parsed);
    }
});

rl.on("close", () => {
    const result = filteredLogs(logs);
    console.log(result);
});

stream.on("error", (err) => {
    console.error("File reading failed:", err.message);
});