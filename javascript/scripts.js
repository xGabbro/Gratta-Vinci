var number1_100 = [];
var winNumber = [];
var probability = [];
var index = 0;

function buildGeV() {

    for (var i = 1; i < 101; i++) number1_100.push(i);

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

        var p = document.createElement("p");

        p.setAttribute("class", "gvNumber");

        var number = Math.floor(Math.random() * 100) + 1;

        winNumber.push(number);

        p.appendChild(document.createTextNode(number));

        gv.appendChild(p);

        number1_100.splice( number1_100.indexOf(n), 1 );

    }

    gv.innerHTML += "</br>";

    for (var n = 1; n < 16; n++) {
        var a = document.createElement("a");

        a.setAttribute("id", n);
        a.setAttribute("class", "gvButton");
        a.setAttribute("onClick", "sas(" + n + ")");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode("XX"));

        gv.appendChild(a);

        if (n % 5 == 0) gv.innerHTML += "</br>";
    }

}

function sas(i) {

    var cel = document.getElementById(i);
    
    var number = Math.floor(Math.random() * probability[index]) + 1;
    console.log(number);

    var finalnumber;

    if (number == probability[index]) {

        finalnumber = winNumber[index];
        index++;

    }
    else {

        finalnumber = number1_100[Math.floor(Math.random() * number1_100.length) + 1];
        number1_100.splice( number1_100.indexOf(finalnumber), 1 );

    }

    cel.innerHTML = finalnumber;

    cel.setAttribute("style", "pointer-events: none; cursor: default;");

}

function error(code, description) {

    alert("Errore: " + code + "\n" + description);

}