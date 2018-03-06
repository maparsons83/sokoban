// const livingMap = [
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

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    

    if (keyName == "ArrowRight") {
        reset(main);

        for (let iRow = 0; iRow < livingMap.length; iRow++) {

            if (livingMap[iRow].includes(player)) {
                let mapSplit = livingMap[iRow].split('');
                let playerPos = livingMap[iRow].indexOf(player);
                let nextPlayerPos = playerPos + 1;

                if (livingMap[iRow][nextPlayerPos] == " ") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice(nextPlayerPos, 0, player);
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;
                    
                } else if (livingMap[iRow][nextPlayerPos] == storage) {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice(nextPlayerPos, 1, " ", player);
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;
                } else if (livingMap[iRow][nextPlayerPos] == box && livingMap[iRow][playerPos + 2] !== wall && livingMap[iRow][playerPos + 2] !== box) {
                    mapSplit.splice(playerPos, 1, " ");
                    mapSplit.splice(nextPlayerPos, 2, player, box);
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;
                    
                } else if(livingMap[iRow][nextPlayerPos] == "F"){
                    alert("you win");
                    location.reload();
                }
            }
        }
    }
    if (keyName == "ArrowLeft") {
        reset(main);

        for (let iRow = 0; iRow < livingMap.length; iRow++) {

            if (livingMap[iRow].includes(player)) {
                let mapSplit = livingMap[iRow].split('');
                let playerPos = livingMap[iRow].indexOf(player);
                let nextPlayerPos = playerPos - 1;

                if (livingMap[iRow][nextPlayerPos] == " ") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice(nextPlayerPos, 0, player);
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;

                } else if (livingMap[iRow][nextPlayerPos] == storage) {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice(nextPlayerPos, 1, player, " ");
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;
                
                } else if (livingMap[iRow][nextPlayerPos] == box && livingMap[iRow][playerPos - 2] !== wall && livingMap[iRow][playerPos - 2] !== box) {
                    mapSplit.splice(playerPos, 1,);
                    mapSplit.splice((playerPos - 2), 2, box, player, " ");
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;
                
                }
            }
        }

    }
    if (keyName == "ArrowUp") {
        reset(main);

        for (let iRow = 0; iRow < livingMap.length; iRow++) {

            if (livingMap[iRow].includes(player)) {
                let mapSplit = livingMap[iRow].split('');
                let rowAbove = livingMap[iRow-1].split('');
                let rowAbove2 = livingMap[iRow-2].split('');
                let playerPos = livingMap[iRow].indexOf(player);
                let nextPlayerPos = playerPos;
                let nextRow = iRow - 1;

                if (livingMap[nextRow][nextPlayerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, player);

                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;

                    let rejoined2 = rowAbove.join('');
                    livingMap[nextRow] = rejoined2;

                    var newMap = livingMap;
                } else if (livingMap[nextRow][nextPlayerPos] == storage) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, player);
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;

                    let rejoined2=rowAbove.join('');
                    livingMap[nextRow] = rejoined2;
                
                }  else if (livingMap[nextRow][nextPlayerPos] == box && livingMap[iRow-2][nextPlayerPos] !== wall && livingMap[iRow-2][nextPlayerPos] !== box) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, player);
                    rowAbove2.splice(playerPos, 1, box);
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;

                    let rejoined2=rowAbove.join('');
                    let rejoined3=rowAbove2.join('');
                    livingMap[nextRow] = rejoined2;
                    livingMap[iRow - 2] = rejoined3;
                
                }
            }
        }

    }
    if (keyName == "ArrowDown") {
        reset(main);

        for (let iRow = 0; iRow < livingMap.length; iRow++) {

            if (livingMap[iRow].includes(player)) {
                let mapSplit = livingMap[iRow].split('');
                let rowBelow = livingMap[iRow+1].split('');
                let rowBelow2 = livingMap[iRow+2].split('');
                let playerPos = livingMap[iRow].indexOf(player);
                

                if (livingMap[iRow+1][playerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, player);

                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;

                    let rejoined2 = rowBelow.join('');
                    livingMap[iRow+1] = rejoined2;

                    var newMap = livingMap;
                } else if (livingMap[iRow+1][playerPos] == storage) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, player);
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;

                    let rejoined2=rowBelow.join('');
                    livingMap[iRow+1] = rejoined2;
                
                } else if (livingMap[iRow+1][playerPos] == box && livingMap[iRow+2][playerPos] !== wall && livingMap[iRow+2][playerPos] !== box) {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, player);
                    rowBelow2.splice(playerPos, 1, box);
                    
                    let rejoined = mapSplit.join('');
                    livingMap[iRow] = rejoined;

                    let rejoined2=rowBelow.join('');
                    let rejoined3=rowBelow2.join('');
                    livingMap[iRow+1] = rejoined2;
                    livingMap[iRow+2] = rejoined3;
                    
                }

                break;
            }
        }

    }
    
    draw(livingMap);

});

function reset(destination) {
    while (destination.firstChild) {
        destination.removeChild(destination.firstChild);
    }
}

draw(livingMap);