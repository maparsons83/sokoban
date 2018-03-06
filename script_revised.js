// const map = [
//     "  WWWWW ",
//     "WWW   W ",
//     "WOS B W ",
//     "WWW BOW ",
//     "WOWWB W ",
//     "W W O W ",
//     "WB XBBOW",
//     "W   O  W",
//     "WWWWWWWW"
//   ];


const canonicalMap = [
    "    WWWWW           ",
    "    WWWWW           ",
    "    W   W           ",
    "    WB  W           ",
    "  WWW  BWW          ",
    "  W  B B W          ",
    "WWW W WW W   WWWWWWW",
    "W   W WW WWWWW  OOWW",
    "W B  B          OOWW",
    "WWWWW WWW WSWW  OOWW",
    "    W     WWWWWWWWWW",
    "    WWWWWWW         ",
    "    WWWWWWW         "
]

const livingMap = [...canonicalMap]; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

const player = "S";
const wall = "W";
const box = "B";
const storage = "O";


const main = document.querySelector("main");

function draw(startPos) {


    for (let i = 0; i < startPos.length; i++) {
        var newRow = document.createElement("div");
        newRow.classList.add("flexbox");
        main.appendChild(newRow);

        for (let j = 0; j < startPos[i].length; j++) {
            let cell = startPos[i][j];

            const newCol = document.createElement("div");
            newCol.classList.add("cell");

            if (cell === wall) {
                newCol.classList.add("wall");
            } else if (cell === " ") {
                newCol.classList.add("empty");
            } else if (cell === player) {
                newCol.id = "start";
            } else if (cell === storage) {
                newCol.classList.add("storage");
            } else if (cell === box) {
                newCol.classList.add("box");
            }

            newRow.appendChild(newCol);

        }
    }
}

function move(playerPos, nextPlayerPos, iRow) {

    let row = livingMap[iRow];
    let rowArray = row.split('');

    const rule = {
        nextIsSpace: row[nextPlayerPos] == " ",
        nextIsStorage: row[nextPlayerPos] == storage,
        nextIsBox: row[nextPlayerPos] == box,
        followingIsWall: row[playerPos + 2] !== wall,
        followingIsBox: row[playerPos + 2] !== box
    }


    if (rule.nextIsSpace) {
        rowArray.splice(playerPos, 1);
        rowArray.splice(nextPlayerPos, 0, player);

    } else if (rule.nextIsStorage) {
        rowArray.splice(playerPos, 1);
        rowArray.splice(nextPlayerPos, 1, " ", player);

    } else if (rule.nextIsBox && rule.followingIsWall && rule.followingIsBox) {
        rowArray.splice(playerPos, 1, " ");
        rowArray.splice(nextPlayerPos, 2, player, box);
    }

    let rejoined = rowArray.join('');
    livingMap[iRow] = rejoined;
    newMap = livingMap;
}

function moveRight() {

    let playerPos;
    let nextPlayerPos;

    for (let iRow = 0; iRow < livingMap.length; iRow++) {
        let row = livingMap[iRow];

        if (row.includes(player)) {
            playerPos = row.indexOf(player);
            nextPlayerPos = playerPos + 1;
            move(playerPos, nextPlayerPos, iRow);
        }

    }
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    reset(main);
    let newMap;


    if (keyName === "ArrowRight") {
        moveRight()

    } else if (keyName === "ArrowLeft") {

        for (let iRow = 0; iRow < livingMap.length; iRow++) {
            let row = livingMap[iRow];

            if (row.includes(player)) {
                console.log('werwe')

                let rowArray = row.split('');
                let playerPos = row.indexOf(player);
                let nextPlayerPos = playerPos - 1;

                const rule = {
                    nextIsSpace: row[nextPlayerPos] == " ",
                    nextIsStorage: row[nextPlayerPos] == storage,
                    nextIsBox: row[nextPlayerPos] == box,
                    followingIsWall: row[playerPos - 2] !== wall,
                    followingIsBox: row[playerPos - 2] !== box
                }

                if (rule.nextIsSpace) {
                    rowArray.splice(playerPos, 1);
                    rowArray.splice(nextPlayerPos, 0, player);

                } else if (rule.nextIsStorage) {
                    rowArray.splice(playerPos, 1);
                    rowArray.splice(nextPlayerPos, 1, player, " ");

                } else if (rule.nextIsBox && rule.followingIsWall && rule.followingIsBox) {
                    rowArray.splice(playerPos, 1, );
                    rowArray.splice((playerPos - 2), 2, box, player, " ");
                }

                livingMap[iRow] = rowArray.join('');
                break;
            }
        }

    } else if (keyName === "ArrowUp") {

        for (let iRow = 0; iRow < livingMap.length; iRow++) {
            let row = livingMap[iRow];

            if (row.includes(player)) {

                let mapSplit = row.split('');

                let rowAbove = livingMap[iRow - 1] ? livingMap[iRow - 1].split('') : null;
                let rowAbove2 = livingMap[iRow - 2] ? livingMap[iRow - 2].split('') : null;
                let playerPos = row.indexOf(player);

                if (livingMap[iRow - 1][playerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, player);

                    let rejoined = mapSplit.join('');
                    row = rejoined;

                    let rejoined2 = rowAbove.join('');
                    livingMap[iRow - 1] = rejoined2;

                } else if (livingMap[iRow - 1][playerPos] == storage) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, player);
                    let rejoined = mapSplit.join('');
                    row = rejoined;

                    let rejoined2 = rowAbove.join('');
                    livingMap[iRow - 1] = rejoined2;

                } else if (livingMap[iRow - 1][playerPos] == box && livingMap[iRow - 2][playerPos] !== wall && livingMap[iRow - 2][playerPos] !== box) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, player);
                    rowAbove2.splice(playerPos, 1, box);
                    let rejoined = mapSplit.join('');
                    row = rejoined;

                    let rejoined2 = rowAbove.join('');
                    let rejoined3 = rowAbove2.join('');
                    livingMap[iRow - 1] = rejoined2;
                    livingMap[iRow - 2] = rejoined3;
                }

            }
        }

    } else if (keyName === "ArrowDown") {

        for (let iRow = 0; iRow < livingMap.length; iRow++) {
            let row = livingMap[iRow];

            if (row.includes(player)) {
                let mapSplit = row.split('');
                let rowBelow = livingMap[iRow + 1].split('');
                let rowBelow2 = livingMap[iRow + 2].split('');
                let playerPos = row.indexOf(player);

                if (livingMap[iRow + 1][playerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, player);

                    let rejoined = mapSplit.join('');
                    row = rejoined;

                    let rejoined2 = rowBelow.join('');
                    livingMap[iRow + 1] = rejoined2;

                } else if (livingMap[iRow + 1][playerPos] == storage) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, player);
                    let rejoined = mapSplit.join('');
                    row = rejoined;

                    let rejoined2 = rowBelow.join('');
                    livingMap[iRow + 1] = rejoined2;

                } else if (livingMap[iRow + 1][playerPos] == box && livingMap[iRow + 2][playerPos] !== wall && livingMap[iRow + 2][playerPos] !== box) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, player);
                    rowBelow2.splice(playerPos, 1, box);

                    let rejoined = mapSplit.join('');
                    row = rejoined;

                    let rejoined2 = rowBelow.join('');
                    let rejoined3 = rowBelow2.join('');
                    livingMap[iRow + 1] = rejoined2;
                    livingMap[iRow + 2] = rejoined3;

                }

            }
        }
    }

    if (livingMap) draw(livingMap);

});

function reset(destination) {
    while (destination.firstChild) {
        destination.removeChild(destination.firstChild);
    }
}

draw(livingMap);