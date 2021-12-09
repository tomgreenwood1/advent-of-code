import { readFileSync } from 'fs';

// Part 1.
const directions = readFileSync('input.txt', 'utf8');

interface Point {
    x: number;
    y: number;
}

interface Movement {
    direction: "forward" | "up" | "down";
    distance: number;
}

const movementsList: Movement[] = directions.split('\n').map(direction => {
    const parts = direction.split(" ")
    return {
        direction: parts[0] as "forward" | "up" | "down",
        distance: parseInt(parts[1])
    }
}
)



const calculateNewPosition = (oldPosition: Point, movement: Movement): Point => {
    let newPosition: Point;
    switch (movement.direction) {
        case "forward":
            newPosition = {
                ...oldPosition, ...{
                    x: oldPosition.x + movement.distance
                }
            }
            return newPosition
           
        case "up":
            newPosition = {
                ...oldPosition, ...{
                    y: oldPosition.y - movement.distance
                }
            }
            return newPosition
        case "down":
            newPosition = {
                ...oldPosition, ...{
                    y: oldPosition.y + movement.distance
                }
            }
            return newPosition
    }
}

const finalPosition = movementsList.reduce(calculateNewPosition, { x: 0, y: 0 })

const part1Answer = finalPosition.x * finalPosition.y

// 2147104
console.log(part1Answer)

// Part 2.
interface State extends Point {
    aim: number
}

const calculateNewState = (oldState: State, movement: Movement): State => {
    let newState: State;
    switch (movement.direction) {
        case "forward":
            newState = {
                ...oldState, ...{
                    x: oldState.x + movement.distance,
                    y: oldState.y + oldState.aim*movement.distance
                }
            }
            return newState
           
        case "up":
            newState = {
                ...oldState, ...{
                    aim: oldState.aim - movement.distance
                }
            }
            return newState
        case "down":
            newState = {
                ...oldState, ...{
                    aim: oldState.aim + movement.distance
                }
            }
            return newState
    }
}

const finalState = movementsList.reduce(calculateNewState, { x: 0, y: 0, aim: 0 })

const part2Answer = finalState.x * finalState.y

// 2044620088
console.log(part2Answer)