//const items = ['140 ww', '120 wicked witch', '100 magician', '281 mermaid tail', '20 cat butt', '40 alice', '140 halfling'];
let items;
items = prompt('Please enter the list of items, separated with commas, e.g. "140 wicked witch, 5 magician, 146 dire wolf"');
items = items.split(', ');

let boxes = [];
let box = [];
const boxCapacity = 140;

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

function formOneItemBoxes(items) {
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
    for (let i = 0; i < items.length; i += 1) {

        if (Number.parseInt(items[i]) < countBoxEmptySpace(box)) {

            createBox(items[i]);
            continue;
        }

        else if (Number.parseInt(items[i]) === countBoxEmptySpace(box)) {

            addBox(createBox(items[i]));
            box = [];
            continue;
        }
        else {
            let partOfItem = items[i].replace(/\d+/g, countBoxEmptySpace(box));

            createBox(partOfItem);
            addBox(box);

            box = [];
            items[i] = items[i].replace(/\d+/g, Number.parseInt(items[i]) - Number.parseInt(partOfItem));
            i -= 1;
        }
    }
    if (box.length !== 0) {
        boxes.push(box);
    }
    return boxes;
}
