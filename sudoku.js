
var numSelected = null;
var tileSelected = null;
var score;

var errors = 0;

//deklararasi variabel board susoku yang akan dimainkan
var board = [
    "-4----5-3",
    "3---4---2",
    "-----61--",
    "-7-9----6",
    "-6-----5-",
    "--3-6----",
    "-----2--1",
    "-3--7----",
    "----1--3-"
]

var solution = [
    "847291563",
    "316547982",
    "529386174",
    "274958316",
    "968123457",
    "153764829",
    "695832741",
    "431675298",
    "782419635"
]
window.onload = function() {
    setGame();

    var zero = 0,
        display = document.querySelector('#time');
    startTimer(zero, display);
}

function setGame() {
    
    //Digits 1-9
    for (let i = 1; i<=9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c=0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    
    }
}

function solver() {
    for (let r = 0; r < 9; r++) {
        for (let c=0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            
                tile.innerText = solution[r][c];
                tile.classList.add("tile-start");
            
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

//Membuat batasan error ketika salah menginputkan angka dari tile
function selectTile() {
    if (errors >= 5) {
        exitGame()
        
    }
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        //"0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
function exitGame() {
    alert('Anda kalah, Game Berakhir!')
    window.location.reload();
    
}

//Timer bermain sudoku
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        score =  minutes + ":" + seconds;
        if (++timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//funtion submit untuk memunculkan alert pada button submit
function submit() {
    alert(" Your Score : " +score)
}
  

