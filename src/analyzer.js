import { argv } from "node:process";

const filteredStats = {
    INFO: 0,
    WARN: 0,
    ERROR: 0,
    TOTAL: 0,
}

export const filteredLogs = (logs) => {
    let filteredLogs = [];

    const filtered = filterByLevel(logs);

    if (filtered && filtered.result.length > 0) {
        if (filtered.isSearch) {
            const search = searchByKeyword(filtered.result);
            if (search && search.length > 0) {
                filteredLogs.push(...search);

                // console.log(filteredLogs);
            }
        } else {
            filteredLogs.push(...filtered.result);
        }
    } else {
        const searched = searchByKeyword(logs);

        if (searched && searched.length > 0) filteredLogs.push(...searched);
    }

    return filteredLogs;
}

export const filterByLevel = (logs) => {
    const levelFlag = argv.find((a) => a === "--level");
    if (!levelFlag) return null;

    let isSearch = false;
    const searchFlag = argv.find((a) => a === "--search");
    if (searchFlag) isSearch = true;

    const levelIndex = argv.findIndex((a) => a === "--level") + 1;

    const keyword = argv[levelIndex];
    if (!keyword) return null;

    const result = logs.filter((log) => {
        const find = log.level.toLowerCase() === keyword.toLowerCase();
        return find;
    });
    return { result, isSearch };
}

export const searchByKeyword = (logs) => {
    const searchFlag = argv.find((a) => a === "--search");
    if (!searchFlag) return null;

    const searchIndex = argv.findIndex((a) => a === "--search") + 1;

    const keyword = argv[searchIndex];
    if (!keyword) return null;

    const searchResult = logs.filter((log) => {
        const find = log.message.toLowerCase().includes(keyword.toLowerCase());

        return find;
    });

    return searchResult;
}

