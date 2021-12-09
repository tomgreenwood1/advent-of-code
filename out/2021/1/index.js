"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// Part 1.
const depthMeasurements = (0, fs_1.readFileSync)('input.txt', 'utf8');
const depthsList = depthMeasurements.split('\n').map(x => parseInt(x));
const diffs = depthsList.slice(1).map((measurement, i) => measurement - depthsList[i]);
const increased = diffs.filter(x => x > 0);
const numberOfIncreased = increased.length;
// 1466
console.log(numberOfIncreased);
// part 2.
const nextMeasurementList = depthsList.slice(1);
const sumDiffs = nextMeasurementList.map((_, i) => {
    const nextSum = nextMeasurementList.slice(i, i + 3).reduce((x, y) => x + y);
    const thisSum = depthsList.slice(i, i + 3).reduce((x, y) => x + y);
    return nextSum - thisSum;
});
const increasedSums = sumDiffs.filter(x => x > 0);
const numberOfIncreasedSums = increasedSums.length;
// 1491
console.log(numberOfIncreasedSums);
//# sourceMappingURL=index.js.map