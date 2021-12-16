import { readFileSync } from 'fs';

// Part 1.
const report = readFileSync('input.txt', 'utf8');

const reportList = report.split('\n')

const bitPositions = [...Array(12).keys()]

function mostCommonBit (positionCollection: number[]): number {
    return Number(positionCollection.reduce((x, y) => x + y) >= positionCollection.length/2)
}

function leastCommonBit(positionCollection: number[]): number {
    return Number(!mostCommonBit(positionCollection))
} 

const positionCollections = bitPositions.map(index => reportList.map(line => parseInt(line[index])))

const gammaRate = positionCollections.map(mostCommonBit).reduce((x, y) => `${x}${y.toString()}`, '')
const betaRate =  positionCollections.map(leastCommonBit).reduce((x, y) => `${x}${y.toString()}`, '')

const answer1 = parseInt(gammaRate, 2)*parseInt(betaRate,2)

// 3958484
console.log(answer1)

// Part 2. 
function selectRow(reportList: string[], bitCriteria: (a: number[]) => number, winnersCollection: string = ''): string {
    const firstBits = reportList.map(line => parseInt(line[0]))
    const winningBit = bitCriteria(firstBits)
    const survivingLines = firstBits.includes(winningBit) ? reportList.filter(line => parseInt(line[0]) === winningBit) : reportList
    if (survivingLines.length === 1) {
        return winnersCollection + survivingLines[0]
    } else {
        const truncatedSurvivingLines = survivingLines.map(line => line.slice(1))
        return selectRow(truncatedSurvivingLines, bitCriteria, winnersCollection + winningBit.toString())
    }
}

const oxyGenRating = selectRow(reportList, mostCommonBit)
const co2ScrubRating = selectRow(reportList, leastCommonBit)

const answer2 = parseInt(oxyGenRating, 2)*parseInt(co2ScrubRating,2)

// 1613181
console.log(answer2)