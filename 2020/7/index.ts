import { readFileSync } from 'fs';


const bagRules = readFileSync('input.txt', 'utf8');

// part 1.

// format the rules
const bagRulesList = bagRules.replace(/bags|bag|bag\.|bags\.|\.|[0-9]/g, '')
    .split('\n')
    .map(x => {
        const split = x.split('contain')
        return { outer: split[0].trim(), inner: split[1].trim().split(' ,  ') }
    })

const allBags = bagRulesList.map(x => x.outer)

// convert to an object with bag names for key and their parent bags as values
const parentBagMap = allBags.map(bag => {
    const containers = bagRulesList.filter(bagRule => bagRule.inner.includes(bag))
        .map(bagRule => bagRule.outer)
    return { [bag]: containers }
})
    .reduce((x: object, y: object) => {
        return { ...x, ...y }
    }, {})

// check that the bag rules list is unique by outer bag
const check = Object.entries(parentBagMap).length === allBags.length

function getAllAncestors(innerBag: string, accumulator: Set<string> = new Set()) {
    const parents = parentBagMap[innerBag]
    if (parents) {
        parents.forEach(parent => {
            accumulator.add(parent)
            getAllAncestors(parent, accumulator)
        }
        )
    }
    return accumulator
}

// 378
const totalAncestors = getAllAncestors('shiny gold').size

console.log(totalAncestors)

// part 2.

const bagRulesBigList: [string, {
    count: number
    name: string
}[]][]  = bagRules.replace(/bags|bag|bag\.|bags\.|\./g, '')
    .split('\n')
    .map(x => {
        const split = x.split('contain')
        return [
            split[0].trim(), split[1].trim().split(' , ').map(x => {
                return {
                    count: parseInt(x.match(/[0-9]/g)?.join('') ?? '0'),
                    name: x.replace(/[0-9]/, '').trim()
               } 
            })
        ]
    })

const childrenBagMap = Object.fromEntries(bagRulesBigList)

// check that the bag rules list is unique by outer bag
const check2 = Object.entries(childrenBagMap).length === allBags.length



function countDescendants(
    outerBag: { name: string, count: number },
    accumulator: {number: number } = { number: 0}
): any {
    const { name, count: thisBagCount} = outerBag
    const children = childrenBagMap[name]
    if (children) {

        children.forEach(child => {
            accumulator.number += child.count * thisBagCount
            const modified = { ...child, ...{ count: child.count * thisBagCount } }
            countDescendants(modified, accumulator)
           
        })
    }
    return accumulator
}

// 27526
const totalDescendants = countDescendants({ name: 'shiny gold', count: 1})

console.log('done')