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

const map = [
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

            if (cell === "W") {
                newCol.classList.add("wall");
            } else if (cell === " ") {
                newCol.classList.add("empty");
            } else if (cell === "S") {
                newCol.id = "start";
            } else if (cell === "O") {
                newCol.classList.add("storage");
            } else if (cell === "B") {
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

        for (let i = 0; i < map.length; i++) {

            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let playerPos = map[i].indexOf("S");
                if (map[i][playerPos + 1] == " ") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice((playerPos + 1), 0, "S");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                    
                } else if (map[i][playerPos + 1] == "O") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice((playerPos + 1), 1, " ", "S");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                } else if (map[i][playerPos + 1] == "B" && map[i][playerPos + 2] !== "W" && map[i][playerPos + 2] !== "B") {
                    mapSplit.splice(playerPos, 1, " ");
                    mapSplit.splice((playerPos +1), 2, "S", "B");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                    
                } else if(map[i][playerPos+1] == "F"){
                    alert("you win");
                    location.reload();
                } else {
                    var newMap = map;
                }
            }
        }
    }
    if (keyName == "ArrowLeft") {
        reset(main);

        for (let i = 0; i < map.length; i++) {

            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let playerPos = map[i].indexOf("S");
                if (map[i][playerPos - 1] == " ") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice((playerPos - 1), 0, "S");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                } else if (map[i][playerPos - 1] == "O") {
                    mapSplit.splice(playerPos, 1);
                    mapSplit.splice((playerPos - 1), 1, "S", " ");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                
                } else if (map[i][playerPos - 1] == "B" && map[i][playerPos - 2] !== "W" && map[i][playerPos - 2] !== "B") {
                    mapSplit.splice(playerPos, 1,);
                    mapSplit.splice((playerPos - 2), 2, "B", "S", " ");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;
                    var newMap = map;
                
                } else {
                    var newMap = map;
                }
            }
        }

    }
    if (keyName == "ArrowUp") {
        reset(main);

        for (let i = 0; i < map.length; i++) {

            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let rowAbove = map[i-1].split('');
                let rowAbove2 = map[i-2].split('');
                let playerPos = map[i].indexOf("S");

                if (map[i-1][playerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, "S");

                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2 = rowAbove.join('');
                    map[i-1] = rejoined2;

                    var newMap = map;
                } else if (map[i-1][playerPos] == "O") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, "S");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2=rowAbove.join('');
                    map[i-1] = rejoined2;
                    var newMap = map;
                
                }  else if (map[i-1][playerPos] == "B" && map[i-2][playerPos] !== "W" && map[i-2][playerPos] !== "B") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowAbove.splice(playerPos, 1, "S");
                    rowAbove2.splice(playerPos, 1, "B");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2=rowAbove.join('');
                    let rejoined3=rowAbove2.join('');
                    map[i-1] = rejoined2;
                    map[i-2] = rejoined3;
                    var newMap = map;
                
                } else {
                    var newMap = map;
                }
            }
        }

    }
    if (keyName == "ArrowDown") {
        reset(main);
        label:
        for (let i = 0; i < map.length; i++) {

            if (map[i].includes("S")) {
                let mapSplit = map[i].split('');
                let rowBelow = map[i+1].split('');
                let rowBelow2 = map[i+2].split('');
                let playerPos = map[i].indexOf("S");
                

                if (map[i+1][playerPos] == " ") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, "S");

                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2 = rowBelow.join('');
                    map[i+1] = rejoined2;

                    var newMap = map;
                } else if (map[i+1][playerPos] == "O") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, "S");
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2=rowBelow.join('');
                    map[i+1] = rejoined2;
                    var newMap = map;
                
                } else if (map[i+1][playerPos] == "B" && map[i+2][playerPos] !== "W" && map[i+2][playerPos] !== "B") {
                    mapSplit.splice(playerPos, 1, " ");
                    rowBelow.splice(playerPos, 1, "S");
                    rowBelow2.splice(playerPos, 1, "B");
                    
                    let rejoined = mapSplit.join('');
                    map[i] = rejoined;

                    let rejoined2=rowBelow.join('');
                    let rejoined3=rowBelow2.join('');
                    map[i+1] = rejoined2;
                    map[i+2] = rejoined3;
                    
                    var newMap = map;
                
                }else {
                    var newMap = map;
                } break label;
            }
        }

    }
    
    draw(newMap);

});

function reset(destination) {
    while (destination.firstChild) {
        destination.removeChild(destination.firstChild);
    }
}

draw(map);