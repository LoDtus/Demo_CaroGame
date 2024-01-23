let main = document.querySelector("main");
let endGame = document.querySelector(".endGame");
let result = document.querySelector(".result");
let again = document.querySelector(".again");
let xRole = document.querySelector(".xRole");
let oRole = document.querySelector(".oRole");
xRole.style.backgroundColor = "rgb(60, 142, 255)";
oRole.style.backgroundColor = "rgba(255, 49, 49, 0.5)";

endGame.style.display = "none";

let col = 12, row = 12;
let role = 0;
let win = 4;
let isBlocked = true;

for (let y = 0; y < row; y++) {
    let yDiv = document.createElement("div");
    yDiv.classList.add("yDiv");

    for (let x = 0; x < col; x++) {
        let xDiv = document.createElement("div");
        xDiv.classList.add("xDiv");
        yDiv.appendChild(xDiv);
    };
    main.appendChild(yDiv);
}

let listY = document.getElementsByClassName("yDiv");
let listX = document.getElementsByClassName("xDiv");

// Gán vị trí ô, thuộc tính của ô vào mảng:
for (let i=0; i<listY.length; i++) {
    for (let j=0; j<col; j++) {
        listY[i][j] = listX[j + col*i];
        listY[i][j][0] = 0;
    };
};

for (let i=0; i<listY.length; i++) {
    for (let j=0; j<col; j++) {
        listY[i][j].addEventListener("click", function() {
            if (listY[i][j][0] == 0) {
                if (role%2 == 0) {
                    let xMark = document.createElement("img");
                    xMark.classList.add("xMark");
                    xMark.src = "./img/x.png";

                    listY[i][j].appendChild(xMark);
                    listY[i][j][0] = 1;

                    xRole.style.backgroundColor = "rgba(60, 142, 255, 0.5";
                    oRole.style.backgroundColor = "rgb(255, 49, 49)";
                } else {
                    let oMark = document.createElement("img");
                    oMark.classList.add("oMark");
                    oMark.src = "./img/o.png";

                    listY[i][j].appendChild(oMark);
                    listY[i][j][0] = 2;

                    xRole.style.backgroundColor = "rgb(60, 142, 255)";
                    oRole.style.backgroundColor = "rgba(255, 49, 49, 0.5)";
                }
                role++;
            }
            if (isWin() == 1) {
                endGame.style.display = "flex";
                result.innerText = "X Win";
            } else if (isWin() == 2) {
                endGame.style.display = "flex";
                result.innerText = "O Win";
            }
        });
    };
};

function isWin() {
    for (let i=0; i<listY.length; i++) {
        for (let j=0; j<col; j++) {
            if (listY[i][j][0] != 0) {
                // Xét chiều ngang:
                for (let inRow=0; inRow<win-1; inRow++) {
                    if (listY[i][j + inRow][0] != listY[i][j + inRow +1][0]) {
                        break;
                    } else if (inRow == win-2) {
                        if (isBlocked==true) {
                            if (listY[i][j-1][0] != listY[i][j][0] && listY[i][j-1][0] != 0) {
                                if (listY[i][j + win-1][0] == listY[i][j + win][0]) {
                                    return listY[i][j][0];
                                } else  {
                                    break;
                                }
                            } else if (listY[i][j + win-1][0] != listY[i][j + win][0] && listY[i][j + win][0] != 0) {
                                if (listY[i][j-1][0] == listY[i][j][0]) {
                                    return listY[i][j][0];
                                } else  {
                                    break;
                                }
                            } else {
                                return listY[i][j][0];
                            }
                        } else {
                            return listY[i][j][0];
                        }
                    }
                }
    
                // Xét chiều dọc:
                for (let inCol=0; inCol<win-1; inCol++) {
                    if (listY[i + inCol][j][0] != listY[i +inCol + 1][j][0]) {
                        break;
                    } else if (inCol == win-2) {
                        if (isBlocked==true) {
                            if (listY[i-1][j][0] != listY[i][j][0] && listY[i-1][j][0]!=0) {
                                if (listY[i + win-1][j][0] == listY[i + win][j][0]) {
                                    return listY[i][j][0];
                                } else {
                                    break;
                                }
                            } else if (listY[i + win-1][j][0] != listY[i + win][j][0] && listY[i + win][j][0] != 0) {
                                if (listY[i-1][j][0] == listY[i][j][0]) {
                                    return listY[i][j][0];
                                } else {
                                    break;
                                }
                            } else {
                                return listY[i][j][0];
                            }
                        } else {
                            return listY[i][j][0];
                        }
                    }
                }
    
                // Xét chéo xuống phải:
                for (let rightDown=0; rightDown<win-1; rightDown++) {
                    if (listY[i + rightDown][j + rightDown][0] != listY[i + rightDown + 1][j + rightDown + 1][0]) {
                        break;
                    } else if (rightDown == win-2) {
                        if (isBlocked==true) {
                            if (listY[i][j][0] != listY[i-1][j-1][0]
                                && listY[i-1][j-1][0] != 0) {
                                if (listY[i + win-1][j + win-1][0] == listY[i + win][j + win][0]) {
                                    return listY[i][j][0];
                                } else {
                                    break;
                                }
                            } else if (listY[i + win-1][j + win-1][0] != listY[i + win][j + win][0]
                                && listY[i + win][j + win][0] != 0) {
                                if (listY[i-1][j-1][0] == listY[i][j][0]) {
                                    return listY[i][j][0];
                                } else {
                                    break;
                                }
                            } else {
                                return listY[i][j][0];
                            }
                        } else {
                            return listY[i][j][0];
                        }
                    }
                }
    
                // Xét chéo xuống trái:
                for (let leftDown=0; leftDown<win-1; leftDown++) {
                    if (listY[i + leftDown][j - leftDown][0] != listY[i + leftDown + 1][j - leftDown - 1][0]) {
                        break;
                    } else if (leftDown == win-2) {
                        if (isBlocked==true) {
                            if (listY[i][j][0] != listY[i-1][j+1][0]
                                && listY[i-1][j+1][0] != 0) {
                                if (listY[i + win-1][j - win-1][0] == listY[i + win][j - win][0]) {
                                    return listY[i][j][0];
                                } else {
                                    break;
                                }
                            } else if (listY[i + win-1][j - win-1][0] != listY[i + win][j - win][0]
                                && listY[i + win][j - win][0] != 0) {
                                if (listY[i][j][0] == listY[i-1][j+1][0]) {
                                    return listY[i][j][0];
                                } else {
                                    break;
                                }
                            } else {
                                return listY[i][j][0];
                            }
                        } else {
                            return listY[i][j][0];
                        }
                    }
                }
            }
        }
    }
};