import { parser, stats } from "./parser.js";
import { filteredLogs } from "./analyzer.js";
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
    console.log(stats);
    const result = filteredLogs(logs);
    if (result && result.length > 0) {
        console.log(result);
    }
});

stream.on("error", (err) => {
    console.error("File reading failed:", err.message);
});