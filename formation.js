var formMenu = document.getElementById("form");
var dirSwitch = document.getElementById("dirswitch");
const btnHeight = 15;
const btnWidth = 10;
var formTxt;

formMenu.onchange = function() {
    formTxt = formMenu.options[formMenu.selectedIndex].text;
    formPos = formationSel(formTxt);
    if (dirSwitch.checked==true) {
        for(var i = 0; i<=4; i++) {
            formPos[i][1] = 1-formPos[i][1];
            formPos[i][2] = 1-formPos[i][2];
        }
    }
    movePlayers(formPos);
}

dirSwitch.onclick = function() {
    formTxt = formMenu.options[formMenu.selectedIndex].text;
    formPos = formationSel(formTxt);
    if (dirSwitch.checked==true) {
        for(var i = 0; i<=4; i++) {
            formPos[i][1] = 1-formPos[i][1];
            formPos[i][2] = 1-formPos[i][2];
        }
    }
    movePlayers(formPos)
}

function formationSel(form) {
    var positions = [];
    // Positions: [position#, positionX, positionY];
    // 0 - GK, 1 - DF, 2 - MD, 3 - FW
    if (form=="1-2-1") {
        positions.push([0, 0.15, 0.5]);
        positions.push([1, 0.35, 0.5]);
        positions.push([2, 0.55, 0.25]);
        positions.push([2, 0.55, 0.75]);
        positions.push([3, 0.75, 0.5]);
    } else if (form=="1-1-2") {
        positions.push([0, 0.15, 0.5]);
        positions.push([1, 0.35, 0.5]);
        positions.push([2, 0.55, 0.5]);
        positions.push([3, 0.75, 0.25]);
        positions.push([3, 0.75, 0.75]);      
    } else if (form=="1-0-3") {
        positions.push([0, 0.15, 0.5]);
        positions.push([1, 0.35, 0.5]);
        positions.push([3, 0.65, 0.2]);
        positions.push([3, 0.75, 0.5]);
        positions.push([3, 0.65, 0.8]);
    } else if (form=="2-2") {
        positions.push([0, 0.15, 0.5]);
        positions.push([1, 0.4, 0.25]);
        positions.push([1, 0.4, 0.75]);
        positions.push([3, 0.8, 0.25]);
        positions.push([3, 0.8, 0.75]);
    } else if (form=="2-1-1") {
        positions.push([0, 0.15, 0.5]);
        positions.push([1, 0.35, 0.25]);
        positions.push([1, 0.35, 0.75]);
        positions.push([2, 0.65, 0.5]);
        positions.push([3, 0.85, 0.5]);
    } else if (form=="3-0-1") {
        positions.push([0, 0.15, 0.5]);
        positions.push([1, 0.4, 0.25]);
        positions.push([1, 0.3, 0.5]);
        positions.push([1, 0.4, 0.75]);
        positions.push([3, 0.85, 0.5]);
    } else if (form=="4-0") {
        positions.push([0, 0.15, 0.5]);
        positions.push([2, 0.6, 0.2]);
        positions.push([2, 0.4, 0.35]);
        positions.push([2, 0.4, 0.65]);
        positions.push([2, 0.6, 0.8]);
    } else if (form=="5-0") {
        positions.push([2, 0.35, 0.5]);
        positions.push([2, 0.65, 0.2]);
        positions.push([2, 0.5, 0.35]);
        positions.push([2, 0.5, 0.65]);
        positions.push([2, 0.65, 0.8]);
    }

    return positions
}

function movePlayers(positions) {
    var el;
    const prefix = 'play';
    for(var i = 1; i<=5; i++) {
        el = document.getElementById(prefix + i);

        el.style.left = (100*positions[i-1][1] - btnWidth/2) + "%"
        el.style.top = (100*positions[i-1][2] - btnHeight/2) + "%"
    }
}