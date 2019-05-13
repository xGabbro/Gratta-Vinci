var number1_100;
var winNumber;
var probability;
var index;

function buildGeV() {
    index = 0;
    winNumber = [];
    probability = [];
    number1_100 = [];

    for (var i = 1; i < 100; i++) number1_100.push(i);

    var probabilityStr = document.getElementById("probabilityBox").value;

    if (probabilityStr == "" || probabilityStr == null) {
        error(0, "Inserire le probabilità!");
        return;
    }

    var _probability = probabilityStr.split(",");

    _probability.forEach(element => {
        try {
            var number = Number(element);
            probability.push(number);
        }
        catch(err) {
            error(1, "inserire numeri validi!");
            return;
        }
    });

    var gv = document.getElementById("Gratta&Vinci");

    gv.innerHTML = "";

    for (var n = 0; n < 5; n++) {

        var div = document.createElement("div");

        div.setAttribute("class", "gvNumber");

        var number = number1_100[Math.floor(Math.random() * number1_100.length)];

        winNumber.push(number);

        div.appendChild(document.createTextNode(number));

        gv.appendChild(div);

        number1_100.splice( number1_100.indexOf(number), 1 );

    }

    gv.innerHTML += "</br>";
    gv.innerHTML += "</br>";
    gv.innerHTML += "</br>";

    for (var n = 1; n < 16; n++) {
        var div = document.createElement("div");

        div.setAttribute("id", n);
        div.setAttribute("class", "gvButton");
        div.setAttribute("onClick", "sas(" + n + ")");
        div.appendChild(document.createTextNode("XX"));

        gv.appendChild(div);

        if (n % 5 == 0) gv.innerHTML += "</br>";
    }

}

function sas(i) {

    var win = false;
    var cel = document.getElementById(i);
    
    var number = Math.floor(Math.random() * probability[index]) + 1;
    console.log(number);

    var finalnumber;

    if (number == probability[index]) {

        win = true;
        finalnumber = winNumber[index];
        index++;

    }
    else {

        var sus = Math.floor(Math.random() * 3) + 1;

        var pari = false;

        var offset = Math.floor(Math.random() * 3) + 1;;

        if (sus == 2) {

            if (winNumber % 2 == 0) {

                finalnumber = winNumber[index] + offset;
                pari = true;

            } 
            else {

                finalnumber = winNumber[index] - offset;

            }

            if (number1_100.indexOf(finalnumber) == -1) {

                if (pari) finalnumber -= offset * -2;
                else finalnumber += offset * -2;
                
                if (number1_100.indexOf(finalnumber) == -1)
                    finalnumber = number1_100[Math.floor(Math.random() * number1_100.length)];

            }

        }
        else {

            finalnumber = number1_100[Math.floor(Math.random() * number1_100.length)];

        }

        number1_100.splice( number1_100.indexOf(finalnumber), 1 );

    }

    cel.innerHTML = finalnumber;

    if (win) cel.setAttribute("style", "pointer-events: none; content: none; cursor: none; background-color: forestgreen;");
    else cel.setAttribute("style", "pointer-events: none; content: none; cursor: none; background-color: darkred;");

}

function error(code, description) {

    alert("Errore: " + code + "\n" + description);

}