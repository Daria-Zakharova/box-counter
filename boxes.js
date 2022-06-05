//const items = ['140 ww', '120 wicked witch', '100 magician', '281 mermaid tail', '20 cat butt', '39 alice', '140 halfling'];

items = prompt('Please enter the list of items, separated with commas, e.g. "140 wicked witch, 5 magician, 146 dire wolf"');
items = items.split(', '); 

/* let items = '3893 wicked witch, 162 Alice, 61 halfling, 250 magician, 142 sloth, 109 Darth Vader, 109 Hermione, 25 Louise, 115 Mermaid, 55 Robot, 49 Fashion shoes, 6 pickachoo, 41 Dire wolf';
items = items.split(', '); */

let boxes = [];
let box = [];
const boxCapacity = 140;
const emptySpace = countBoxEmptySpace(box);

function checkOneItemBoxes(item) {
    
    if (Number.parseInt(item) >= boxCapacity) {
        return true;
    }

    else {
        return false;
    }
}

function countFullBoxes(item) {
    return boxNumber = Math.floor(Number.parseInt(item) / boxCapacity);
}
function countRest(item) {
    return rest = Number.parseInt(item) % boxCapacity;
}

function createBox(item) {
    box.push(item);
    return box;
}

function countBoxItems(box) {
    let boxFullness = 0;
    for (let i = 0; i < box.length; i += 1) {
        boxFullness += Number.parseInt(box[i]);
    }
    return boxFullness;
}

function countBoxEmptySpace(box) {
    return boxCapacity - countBoxItems(box);
}

function addBox(box) {
    boxes.push(box);
    return boxes;
}

function countExtraItems(box) {
    let lastBox = 0;
    for (let i = 0; i < box.length; i += 1) {
        lastBox += Number.parseInt(box[i]);
    }
    return `Think of ${boxCapacity-lastBox} more bookmarks to complete the box`;
}

function sortByQuantity(items) {
    return items.sort((a, b) => Number.parseInt(b) - Number.parseInt(a));
}

function checkSuitableItem(items) {
    const result = items.findIndex((item) => Number.parseInt(item) <= countBoxEmptySpace(box));
    if (result >= 0) {
        return true;
    }
    return false;    
}


function getSuitableItemIndex(items) {
    const suitableItems = items.filter(item => Number.parseInt(item) <= countBoxEmptySpace(box));
    sortByQuantity(suitableItems);
    const index = items.findIndex((item) => item === suitableItems[0]);
    return index;
}

function getLeastAmountItem(items) {
    const suitableItems = items.sort((a, b) => Number.parseInt(a) - Number.parseInt(b));
    items.sort((a, b) => Number.parseInt(b) - Number.parseInt(a));
    const index = items.findIndex((item) => item === suitableItems[0]);
    return index;
}


function formOneItemBoxes(items) {

    sortByQuantity(items);

    for (let i = 0; i < items.length; i += 1) {

        if (checkOneItemBoxes(items[i])) {
            
            let counter = 1
            while( counter <= countFullBoxes(items[i])) {
                let oneBox = items[i].replace(/\d+/g, boxCapacity);
                addBox(oneBox);
                box = [];
                counter += 1;
            }

            switch (countRest(items[i]) === 0) {
                case true:
                    items.splice(i, 1);
                    i -= 1;
                    break;
                case false:
                    items[i] = items[i].replace(/\d+/g, countRest(items[i]));
                    break;
            }
        }
    }

    return boxes;
}


function addCombinedBoxes(items) {
    
    formOneItemBoxes(items);
    sortByQuantity(items);

    for (let i = 0; i < items.length; i += 1) {

        if (Number.parseInt(items[i]) < countBoxEmptySpace(box)) {

            createBox(items[i]);
            
            items.splice(i, 1);
            i -= 1;

            continue;
        }

        else if (Number.parseInt(items[i]) === countBoxEmptySpace(box)) {

            addBox(createBox(items[i]));

            box = [];
            items.splice(i, 1);
            i -= 1;
            continue;
        }
        else if (checkSuitableItem(items, i)) {

            let index = getSuitableItemIndex(items);

            createBox(items[index]);
            items.splice(index, 1);
            
            if (countBoxEmptySpace(box) === 0) {

                addBox(box);
                
                box = [];
                i -= 1;
                continue;
            }
            
            i -= 1;
            continue;
            
        }
        else {
            let index = getLeastAmountItem(items);
            let partOfItem = items[index].replace(/\d+/g, countBoxEmptySpace(box));

            createBox(partOfItem);
            addBox(box);

            box = [];
            items[index] = items[index].replace(/\d+/g, Number.parseInt(items[index]) - Number.parseInt(partOfItem));
            i -= 1;
        }
    }
    if (box.length !== 0) {
        boxes.push(box);
    }
    return boxes;
}


console.log(addCombinedBoxes(items));
console.log(boxes);
console.log(box);

