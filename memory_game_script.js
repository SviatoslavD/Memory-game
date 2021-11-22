// 2021=)
var memoryArray = [];   // array to store clicked cells images
var imagesArray = [];   // array to store images
var memoryCellId = [];  // array to store clicked cells id
var flipped = 0;        // array to store flipped cells
var toggle = true;      // shuffle state, ON - by default

Array.prototype.shuffle = Array.prototype.shuffle || function() {       // add shuffle method to Array constructor
    var i = this.length, j, temp;
    while(--i > 0) {
        j = Math.floor(Math.random()*(i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

var Board = function (cells) {                                 
    this.cells = cells;
    this.initBoard = function() {                              // initiate new game board  
        var grid = $("#grid");
        for (var i = 0; i < (Math.pow(cells,2) * 0.5); i++) {      // filed array with images, every image doubled
            for (var j = 0; j < 2; j++) {
                imagesArray.push('<img src="images/nix_' + (i + 1) + '.jpg" alt="Nix" style="width:75px;height:75px;">');
            }
        }
        if (toggle){
            imagesArray.shuffle();
        }
        var str = "<table>";
        var m = 0;
        for (var k = 0; k < this.cells; k++) {                      // create table
            str += "<tr>";
            for (var z = 0; z < this.cells; z++) {
                m++;
                str += '<td id="cell_' + m + '" onclick="flipCell(this,imagesArray[' + (m - 1) + '])"></td>';
            }
            str += "</tr>";
        }
        str += "</table>"; 
        grid.append(str);                                       // add created table to div with id="grid"
    };
}

function displayBoard (cells) {
    var table = $("table");
    if (table.length > 0) {
        $(document).ready(function(){        
            $("table").remove();
        })
    }
    imagesArray = [];
    flipped = 0;
    var table = new Board(cells);    
    table.initBoard();
}

function flipCell (cell, image){                                // flip the clicked cell
    var firstCell;
    var secondCell;
    if(cell.innerHTML == "" && memoryArray.length < 2) {
        cell.style.background = '#FFF';
        cell.innerHTML = image;
        if (memoryArray.length == 0) {
            memoryArray.push(image);
            memoryCellId.push(cell.id);
        } else if (memoryArray.length == 1) {
            memoryArray.push(image);
            memoryCellId.push(cell.id);
            if (memoryArray[0] == memoryArray[1]) {             // compare of a clicked cells
                function cellMatched () {
                    flipped += 2;
                    firstCell = document.getElementById(memoryCellId[0]);
                    secondCell = document.getElementById(memoryCellId[1]);
                    firstCell.innerHTML = "";
                    secondCell.innerHTML = "";;
                    memoryArray = [];                           // clear memory arrays
                    memoryCellId = [];
                    if(flipped == imagesArray.length) {
                        flipped = 0;
                        alert("Congratulation !!! +1 to your memory skills !");
                        displayBoard(Math.sqrt(imagesArray.length));
                    }
                }
                setTimeout(cellMatched, 600);
            } else {
                function hahaNotGuessed () {                    // flip cells back over
                    firstCell = document.getElementById(memoryCellId[0]);
                    secondCell = document.getElementById(memoryCellId[1]);
                    firstCell.style.background = "url(images/main.jpg)";
                    firstCell.style.backgroundSize = "80px 80px"; 
                    firstCell.style.backgroundRepeat = "no-repeat";;
                    firstCell.innerHTML = "";
                    secondCell.style.background = "url(images/main.jpg)";
                    secondCell.style.backgroundSize = "80px 80px"; 
                    secondCell.style.backgroundRepeat = "no-repeat";
                    secondCell.innerHTML = "";
                    memoryArray = [];                             // clear memory arrays
                    memoryCellId = [];
                }
                setTimeout(hahaNotGuessed, 600);
            }
        }
    }
}

function switchOffShuffle ()    {                                 // OFF/ON shuffle
    toggle = document.getElementById("toggle");
    if (toggle.innerHTML == "OFF") {
        toggle.innerHTML = "ON";
        toggle = true;
    } else {
        toggle.innerHTML = "OFF";
        toggle = false;
    }
}

displayBoard(4);
$('#newGameFour').click(function() {  
    displayBoard(4);  
})
$('#newGameSix').click(function() {  
    displayBoard(6);  
})
$('#toggle').click(function() {  
    switchOffShuffle();  
})
