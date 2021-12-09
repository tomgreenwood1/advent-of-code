"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// Part 1.
const directions = (0, fs_1.readFileSync)('input.txt', 'utf8');
const movementsList = directions.split('\n').map(direction => {
    const parts = direction.split(" ");
    return {
        direction: parts[0],
        distance: parseInt(parts[1])
    };
});
const calculateNewPosition = (oldPosition, movement) => {
    let newPosition;
    switch (movement.direction) {
        case "forward":
            newPosition = Object.assign(Object.assign({}, oldPosition), {
                x: oldPosition.x + movement.distance
            });
            return newPosition;
        case "up":
            newPosition = Object.assign(Object.assign({}, oldPosition), {
                y: oldPosition.y - movement.distance
            });
            return newPosition;
        case "down":
            newPosition = Object.assign(Object.assign({}, oldPosition), {
                y: oldPosition.y + movement.distance
            });
            return newPosition;
    }
};
const finalPosition = movementsList.reduce(calculateNewPosition, { x: 0, y: 0 });
const part1Answer = finalPosition.x * finalPosition.y;
// 2147104
console.log(part1Answer);
const calculateNewState = (oldState, movement) => {
    let newState;
    switch (movement.direction) {
        case "forward":
            newState = Object.assign(Object.assign({}, oldState), {
                x: oldState.x + movement.distance,
                y: oldState.y + oldState.aim * movement.distance
            });
            return newState;
        case "up":
            newState = Object.assign(Object.assign({}, oldState), {
                aim: oldState.aim - movement.distance
            });
            return newState;
        case "down":
            newState = Object.assign(Object.assign({}, oldState), {
                aim: oldState.aim + movement.distance
            });
            return newState;
    }
};
const finalState = movementsList.reduce(calculateNewState, { x: 0, y: 0, aim: 0 });
const part2Answer = finalState.x * finalState.y;
// 2044620088
console.log(part2Answer);
//# sourceMappingURL=index.js.map