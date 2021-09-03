//#region var/const declarations;
var lastNames = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen","Sixteen"]
// Header
var btnLoadTeam = document.getElementById("head-team");
var btnLoadMatch = document.getElementById("head-match");
var btnSave = document.getElementById("head-save");
var btnExport = document.getElementById("head-export");
var lblLoadTeam = document.getElementById("lbl-head-team");
var lblLoadMatch = document.getElementById("lbl-head-match");
// Time
var clockMain = document.getElementById("clock-main");
var clockPlay = document.getElementById("clock-play");
var clockPer = document.getElementById("period");
var clockKickOff = document.getElementById("kick-off");
var clockBreak = document.getElementById("break");
var clockPause = document.getElementById("pause");
var clockStop = document.getElementById("stoppage");
var secondsM = 0;
var minutesM = 0;
var secondsP = 0;
var minutesP = 0;
var IntervalM;
var IntervalP;
// Team
var txtHScore = document.getElementById("score-h")
var txtAScore = document.getElementById("score-a")
var listBench = document.getElementById("bench");
var formMenu = document.getElementById("form");
var btnP1 = document.getElementById("btn1");
var btnP2 = document.getElementById("btn2");
var btnP3 = document.getElementById("btn3");
var btnP4 = document.getElementById("btn4");
var btnP5 = document.getElementById("btn5");
var formMenu = document.getElementById("form");
var dirSwitch = document.getElementById("dirswitch");
const btnHeight = 15;
const btnWidth = 10;
// Actions
var btnUndo = document.getElementById("undo");
var btnPINC = document.getElementById("pass-inc");
var btnDWON = document.getElementById("duel-won");
var btnPLOSS = document.getElementById("duel-loss");
var btnPGAIN = document.getElementById("recovery");
var btnBLK = document.getElementById("block");
var btnSEQ = document.getElementById("seq-brk");
var btnSON = document.getElementById("shot-on");
var btnSOFF = document.getElementById("shot-off");
var btnSBLK = document.getElementById("shot-block");
var btnFK = document.getElementById("f-kick");
var btnCK = document.getElementById("c-kick");
var btnPK1 = document.getElementById("pk1");
var btnPK2 = document.getElementById("pk2");
var btnGH = document.getElementById("goal-h");
var btnGA = document.getElementById("goal-a");
// Opp
var btnOSON = document.getElementById("obtn-son");
var btnOSOFF = document.getElementById("obtn-soff");
var btnOFK = document.getElementById("obtn-fk");
var btnOCK = document.getElementById("obtn-ck");
var btnOPK1 = document.getElementById("obtn-pk1");
var btnOPK2 = document.getElementById("obtn-pk2");
var txtOSON = document.getElementById("otxt-son");
var txtOSOFF = document.getElementById("otxt-soff");
var txtOFK = document.getElementById("otxt-fk");
var txtOCK = document.getElementById("otxt-ck");
var txtOPK1 = document.getElementById("otxt-pk1");
var txtOPK2 = document.getElementById("otxt-pk2");
// Stats
var txtPATT = document.getElementById("txt-patt");
var txtPCMP = document.getElementById("txt-pcmp");
var txtPEFF = document.getElementById("txt-peff");
var txtSON = document.getElementById("txt-son");
var txtSOFF = document.getElementById("txt-soff");
var txtSEFF = document.getElementById("txt-seff");
//Analysis
var tblAnl = document.getElementById("tbl-anl");

// Helper
const arrSum = arr => arr.reduce((a,b) => a + b, 0);
//#endregion

//#region  INITIALIZATION
//#region  Initialize Dictionaries
var struct_general = {  // Generic Container
    "nplay": 5,
    "nsub": 11
};
var struct_time = { // Time Container
    "period": clockPer.innerHTML,
    "clock_main": clockMain.innerHTML,
    "clock_play": clockPlay.innerHTML,
    "kickofftgl": 0,
    "pausetgl": 0,
    "stoptgl": 0
}
var struct_match = { // Match Information Container
    "date": [00, 00, 00], // YYYY-MM-DD
    "location": "Stadium",
    "competition": "Competition",
    "stage": "Stage",
    "kickoff": [00, 00], // 00h:00
    "score": [0, 0], // Home, Away
    "teams": ["Home Team", "Away Team"],
    "initials": ["HOME", "AWAY"]
}
var struct_team = { // Team Information Container
    "name": "Team",
    "tgl_home": 1,
    "players": []
}
for(var i = 0; i<(struct_general["nplay"] + struct_general["nsub"]); i++) {
    var pinfo = {
        "pid": i+1,
        "nfirst": "Player",
        "nlast": lastNames[i],
        "pno": i+1,
        "position": "",
        "selected": 0,
        "active": 0
    }
    if (i<struct_general["nplay"]) {
        pinfo.active = 1;
        pinfo.rotations = 1;
    }
    struct_team["players"].push(pinfo)
}
var struct_field = { // Field Player Properties Container
    "formation": formMenu.options[formMenu.selectedIndex].text,
    "formationid": 0,
    "direction": 0, // 0: L>R, 1: L<R
    "players": struct_team["players"].slice(0,struct_general["nplay"])
}
//#endregion
//#region Initialize Tables
var tbl_cpass = {
    "index": [],
    "sequence": [],
    "pass_num": [],
    "period": [],
    "min_run": [],
    "sec_run": [],
    "min_eff": [],
    "sec_eff": [],
    "player_id": [],
    "field_id": [],
    "player_no": [],
    "last_name": [],
    "result": []
}
var tbl_player = {
    "pid": [],
    "pass_complete": [],
    "pass_incomplete": [],
    "shot_on": [],
    "shot_off": [],
    "sourcesink": []
}
for (i=0; i<struct_team.players.length; i++) {
    tbl_player.pid.push(struct_team.players[i].pid);
    tbl_player.pass_complete.push(0);
    tbl_player.pass_incomplete.push(0);
    tbl_player.shot_on.push(0);
    tbl_player.shot_off.push(0);
    tbl_player.sourcesink.push(0);
}
var tbl_pass = {
    "index": [],
    "sequence": [],
    "pass_num": [],
    "period": [],
    "min_run": [],
    "sec_run": [],
    "min_eff": [],
    "sec_eff": [],
    "player_id": [],
    "field_id": [],
    "player_no": [],
    "last_name": [],
    "result": []
}
var tbl_actions = {
    "index": [],
    "sequence": [],
    "pass_num": [],
    "period": [],
    "min_run": [],
    "sec_run": [],
    "min_eff": [],
    "sec_eff": [],
    "player_id": [],
    "field_id": [],
    "player_no": [],
    "last_name": [],
    "result": []
}
var tbl_opp = {
    "index": [],
    "period": [],
    "min_run": [],
    "sec_run": [],
    "min_eff": [],
    "sec_eff": [],
    "result": []
}
var tbl_match = {
    "index": [1],
    "period": ["0"],
    "min_run": ["00"],
    "sec_run": ["00"],
    "min_eff": ["00"],
    "sec_eff": ["00"],
    "result": ["1-2-1"],
    "player_id1": [-1],
    "field_id1": [-1],
    "player_no1": [-1],
    "last_name1": [""],
    "player_id2": [-1],
    "field_id2": [-1],
    "player_no2": [-1],
    "last_name2": [""],
}
for (var i = 0; i<struct_general["nplay"]; i++) {
    var timeMain = parseClock(struct_time["clock_main"],0);
    var timePlay = parseClock(struct_time["clock_play"],1);
    tbl_match["index"].push(i+2);
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push("lineup");
    tbl_match["player_id1"].push(struct_field["players"][i]["pid"]);
    tbl_match["field_id1"].push(i+1);
    tbl_match["player_no1"].push(struct_field["players"][i]["pno"]);
    tbl_match["last_name1"].push(struct_field["players"][i]["nlast"]);
    tbl_match["player_id2"].push(-1);
    tbl_match["field_id2"].push(-1);
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");
}
var tbl_anl = {
    "Rotations": [],
    "Rotation Play Time (s)": [],
    "Rotation Rest Time (s)": [],
    "Play Time (s)": [],
    "Rest Time (s)": [],
    "W/R Ratio": [],
    "Pass %": [],
    "Shot %": [],
    "Duels Won": [],
    "Source-Sink": [],
}
for (var i = 0; i<struct_general["nplay"]+struct_general["nsub"]; i++) {
    tbl_anl["Rotations"].push(0);
    tbl_anl["Rotation Play Time (s)"].push(0);
    tbl_anl["Rotation Rest Time (s)"].push(0);
    tbl_anl["Play Time (s)"].push(0);
    tbl_anl["Rest Time (s)"].push(0);
    tbl_anl["W/R Ratio"].push(0);
    tbl_anl["Pass %"].push(0);
    tbl_anl["Shot %"].push(0);
    tbl_anl["Duels Won"].push(0);
    tbl_anl["Source-Sink"].push(0);
    if (i<struct_general["nplay"]) {
        tbl_anl.Rotations[tbl_anl.Rotations.length-1] = 1;
    }
}
//#endregion
//#endregion

//#region Clock Functions
clockKickOff.onclick = function() {
    struct_time["period"]++;
    clockPer.innerHTML = struct_time["period"];

    clearInterval(IntervalM);
    clearInterval(IntervalP);
    IntervalM = setInterval(startMain, 1000);
    IntervalP = setInterval(startPlay, 1000);

    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"],0);
    var timePlay = parseClock(struct_time["clock_play"],1);
    tbl_match["index"].push(tbl_match["index"].length + 1)
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push("kick off");
    tbl_match["player_id1"].push(-1);
    tbl_match["field_id1"].push(-1);
    tbl_match["player_no1"].push(-1);
    tbl_match["last_name1"].push("");
    tbl_match["player_id2"].push(-1);
    tbl_match["field_id2"].push(-1);
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");

    // Toggles
    struct_time["kickofftgl"] = 1;
    // Button Enables
    buttonEnable(clockKickOff, false)
    buttonEnable(clockBreak, true)
    buttonEnable(clockPause, true)
    buttonEnable(clockStop, true)
    buttonEnable(btnLoadTeam, false)
    buttonEnable(btnLoadMatch, false)
    buttonEnable(btnSave, false)
    buttonEnable(btnExport, false)
    toggleOpp(true)
    toggleMatch(true)
    togglePlayers(true)
    toggleStats(true)
    // Button Aesthetics
    clockPer.classList.remove('break');
    clockMain.classList.remove('break');
    clockPlay.classList.remove('break');
    lblLoadTeam.classList.add('break');
    lblLoadMatch.classList.add('break');
}
clockBreak.onclick = function() {
    clearInterval(IntervalM);
    clearInterval(IntervalP);
    
    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"],0);
    var timePlay = parseClock(struct_time["clock_play"],1);
    tbl_match["index"].push(tbl_match["index"].length + 1)
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push("break");
    tbl_match["player_id1"].push(-1);
    tbl_match["field_id1"].push(-1);
    tbl_match["player_no1"].push(-1);
    tbl_match["last_name1"].push("");
    tbl_match["player_id2"].push(-1);
    tbl_match["field_id2"].push(-1);
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");

    minutesM = "0";
    secondsM = "0";
    displayClock(clockMain, minutesM, secondsM, 0)

    minutesP = "0";
    secondsP = "0";
    displayClock(clockPlay, minutesP, secondsP, 1)

    // Toggles
    struct_time["kickofftgl"] = 0;
    struct_time["pausetgl"] = 0;
    struct_time["stoptgl"] = 0;
    // Button Enables
    buttonEnable(clockKickOff, true)
    buttonEnable(clockBreak, false)
    buttonEnable(clockPause, false)
    buttonEnable(clockStop, false)
    buttonEnable(btnSave, true)
    buttonEnable(btnExport, true)
    toggleActions(false)
    toggleOpp(false)
    toggleMatch(false)
    togglePlayers(false)
    toggleStats(false)
    // Button Aesthetics
    clockPer.classList.add('break');
    clockMain.classList.add('break');
    clockPlay.classList.add('break');
    clockPause.classList.remove('toggle');
    clockStop.classList.remove('toggle');
    clockMain.classList.remove('pause');
    clockPlay.classList.remove('pause');
}
clockPause.onclick = function() {
    if(struct_time["pausetgl"]==0){
        clearInterval(IntervalM);
        clearInterval(IntervalP);
        
        struct_time["pausetgl"] = 1;

        buttonEnable(clockStop, false);
        buttonEnable(btnSave, true)
        
        clockPause.classList.add('toggle');
        clockMain.classList.add('pause');
        clockPlay.classList.add('pause');
    } else {
        IntervalM = setInterval(startMain, 1000);
        IntervalP = setInterval(startPlay, 1000);
        
        struct_time["pausetgl"] = 0;
        
        buttonEnable(btnLoadTeam, false)
        buttonEnable(btnLoadMatch, false)
        buttonEnable(clockStop, true)
        buttonEnable(btnSave, false)
        
        clockPause.classList.remove('toggle');
        clockMain.classList.remove('pause');
        clockPlay.classList.remove('pause');
        lblLoadTeam.classList.add('break');
        lblLoadMatch.classList.add('break');
    }
}
clockStop.onclick = function() {
    if(struct_time["stoptgl"]==0){
        clearInterval(IntervalP);
        struct_time["stoptgl"] = 1;

        buttonEnable(clockPause, false)
        togglePlayers(false);
        
        clockStop.classList.add('toggle');
        clockPlay.classList.add('pause');
    } else {
        IntervalP = setInterval(startPlay, 1000);
        struct_time["stoptgl"] = 0;

        buttonEnable(clockPause, true)
        togglePlayers(true);
        
        clockStop.classList.remove('toggle');
        clockPlay.classList.remove('pause');
    }
}
function startMain() {
    secondsM++;
    
    if (secondsM > 59) {
    minutesM++;
    secondsM = 0;
    }

    displayClock(clockMain, minutesM, secondsM, 0)
}
function startPlay() {
    secondsP++;
    
    if (secondsP > 59) {
    minutesP++;
    secondsP = 0;
    }

    displayClock(clockPlay, minutesP, secondsP, 1)

    for (i=0; i<struct_team.players.length; i++) {
        if (struct_team.players[i].active==1) {
            tbl_anl["Play Time (s)"][i]++;
            tbl_anl["Rotation Play Time (s)"][i]++;
        } else {
            tbl_anl["Rest Time (s)"][i]++;
            tbl_anl["Rotation Rest Time (s)"][i]++;
        }
        tbl_anl["W/R Ratio"][i] = Math.round(100*tbl_anl["Play Time (s)"][i] / (tbl_anl["Rest Time (s)"][i]+1))/100;
    }
    updateAnlUITable()
}
function displayClock(clockTxt, minutes, seconds, mode) {
    // mode: 0 - Main Clock, 1 - Play Clock
    if (mode==0) {
        var minutesTxt = parseInt(minutes)
        var secondsTxt = parseInt(seconds)
        if(minutes<=9){
            minutesTxt = "0" + parseInt(minutes)
        }
        if(seconds<=9){
            secondsTxt = "0" + parseInt(seconds)
        }
        clockTxt.innerHTML = minutesTxt + ":" + secondsTxt;
    } else {
        var secondsTotal = 1200 - (seconds + 60*minutes)
        if (secondsTotal>=0) {
            clockTxt.innerHTML = setClock(secondsTotal)
        } else {
            var minutesTxt = Math.ceil(secondsTotal/60);
            var secondsTxt = Math.abs(secondsTotal - 60*minutesTxt);
            if (minutesTxt>-10) {
                minutesTxt = "-0" + Math.abs(minutesTxt);
            }
            if (secondsTxt<10) {
                secondsTxt = "0" + secondsTxt;
            }
            clockTxt.innerHTML = minutesTxt + ":" + secondsTxt
        }
    }
}
function parseClock(clockTxt, mode) {
    // 0: Main Clock, 1: Play Clock
    if (mode==0) {
        clockArr = clockTxt.split(":");
        minutes = clockArr[0];
        seconds = clockArr[1];
    } else {
        clockArr = clockTxt.split(":");
        console.log(clockArr)
        secondsTotal = 1200 - (60*parseInt(clockArr[0]) + parseInt(clockArr[1]));
        console.log(secondsTotal)
        minutes = Math.floor(secondsTotal/60);
        seconds = secondsTotal - 60*minutes;
        if (minutes<=9) {
            minutes = "0"+minutes;
        } else {
            minutes = minutes.toString();
        }
        if (seconds<=9) {
            seconds = "0"+seconds;
        } else {
            seconds = seconds.toString();
        }
    }

    return [minutes, seconds]
}
function setClock(seconds) {
    minutes = Math.floor(seconds/60);
    sec = seconds - 60*minutes;
    if (minutes<10) {
        minutes = "0"+minutes;
    }
    if (sec<10) {
        sec = "0" + sec;
    }
    return minutes + ":" + sec
}
function updateTime() {
    struct_time["clock_main"] = clockMain.innerHTML;
    struct_time["clock_play"] = clockPlay.innerHTML;
    struct_time["period"] = clockPer.innerHTML;
}
//#endregion

//#region Player Switch/Sub Functions
//#region Initialize Player Select
document.getElementById("chk1").onclick = function() {
    //  && tbl_cpass.pass_num.length==0
    if (document.getElementById("chk1").checked==true) {
        struct_field["players"][0]["selected"] = 1;
    } else {
        document.getElementById("chk1").checked = false
        struct_field["players"][0]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk2").onclick = function() {
    if (document.getElementById("chk2").checked==true) {
        struct_field["players"][1]["selected"] = 1;
    } else {
        document.getElementById("chk2").checked = false
        struct_field["players"][1]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk3").onclick = function() {
    if (document.getElementById("chk3").checked==true) {
        struct_field["players"][2]["selected"] = 1;
    } else {
        document.getElementById("chk3").checked = false
        struct_field["players"][2]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk4").onclick = function() {
    if (document.getElementById("chk4").checked==true) {
        struct_field["players"][3]["selected"] = 1;
    } else {
        document.getElementById("chk4").checked = false
        struct_field["players"][3]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk5").onclick = function() {
    if (document.getElementById("chk5").checked==true) {
        struct_field["players"][4]["selected"] = 1;
    } else {
        document.getElementById("chk5").checked = false
        struct_field["players"][4]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
//#endregion

function enableSubSwitch(selArray) {
    if (arrSum(selArray)==1) {
    } else if (arrSum(selArray)==2) {
        switchPlayers();
    }
}

function switchPlayers() {
    var selArray = getKeyArray(struct_field["players"], "selected");
    var selIdx = getAllIndexes(selArray, 1);
    var player1 = struct_field["players"][selIdx[0]];
    var player2 = struct_field["players"][selIdx[1]];

    struct_field["players"][selIdx[0]] = player2;
    struct_field["players"][selIdx[1]] = player1;

    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"],0);
    var timePlay = parseClock(struct_time["clock_play"],1);
    tbl_match["index"].push(tbl_match["index"].length + 1);
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push("switch positions");
    tbl_match["player_id1"].push(player1["pid"]);
    tbl_match["field_id1"].push(selIdx[0]+1);
    tbl_match["player_no1"].push(player1["pno"]);
    tbl_match["last_name1"].push(player1["nlast"]);
    tbl_match["player_id2"].push(player2["pid"]);
    tbl_match["field_id2"].push(selIdx[1]+1);
    tbl_match["player_no2"].push(player2["pno"]);
    tbl_match["last_name2"].push(player2["nlast"]);

    updateButtonLabels();
    enableSubSwitch(getKeyArray(struct_field["players"], "selected"));
}

listBench.onchange = function(){
    var selArray = getKeyArray(struct_field["players"], "selected");
    if (arrSum(selArray)==1) {
        var selIdx = getAllIndexes(selArray, 1)[0];
        var offNo = struct_field["players"][selIdx]["pno"];
        var offID = getAllIndexes(getKeyArray(struct_team["players"], "pno"), offNo)[0];

        var benchLbl = listBench.options[listBench.selectedIndex].text;
        var onNo = benchLbl.split("] ")[0].split("[")[1];
        var onID = getAllIndexes(getKeyArray(struct_team["players"], "pno"), onNo)[0];

        struct_team["players"][offID]["active"] = 0;
        struct_team["players"][onID]["active"] = 1;
        struct_field["players"][selIdx] = struct_team["players"][onID];
        tbl_anl.Rotations[onID] += 1;
        tbl_anl["Rotation Play Time (s)"][offID] = 0;
        tbl_anl["Rotation Rest Time (s)"][onID] = 0;

        // Update Match Table
        updateTime();
        var timeMain = parseClock(struct_time["clock_main"],0);
        var timePlay = parseClock(struct_time["clock_play"],1);
        tbl_match["index"].push(tbl_match["index"].length + 1);
        tbl_match["period"].push(struct_time["period"]);
        tbl_match["min_run"].push(timeMain[0]);
        tbl_match["sec_run"].push(timeMain[1]);
        tbl_match["min_eff"].push(timePlay[0]);
        tbl_match["sec_eff"].push(timePlay[1]);
        tbl_match["result"].push("substitution");
        tbl_match["player_id1"].push(struct_team["players"][offID]["pid"]);
        tbl_match["field_id1"].push(selIdx+1);
        tbl_match["player_no1"].push(struct_team["players"][offID]["pno"]);
        tbl_match["last_name1"].push(struct_team["players"][offID]["nlast"]);
        tbl_match["player_id2"].push(struct_team["players"][onID]["pid"]);
        tbl_match["field_id2"].push(-1);
        tbl_match["player_no2"].push(struct_team["players"][onID]["pno"]);
        tbl_match["last_name2"].push(struct_team["players"][onID]["nlast"]);

        updateButtonLabels();
        updateBenchList();
        enableSubSwitch(getKeyArray(struct_field["players"], "selected"));
        updateAnlUITable();
    }
    listBench.selectedIndex = -1;
}
//#endregion

//#region Opposition Actions
function registerOppAction(txt, action) {
    txt.innerHTML++;
    // Update Opp Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"],0);
    var timePlay = parseClock(struct_time["clock_play"],1);
    tbl_opp["index"].push(tbl_opp["index"].length + 1)
    tbl_opp["period"].push(struct_time["period"]);
    tbl_opp["min_run"].push(timeMain[0]);
    tbl_opp["sec_run"].push(timeMain[1]);
    tbl_opp["min_eff"].push(timePlay[0]);
    tbl_opp["sec_eff"].push(timePlay[1]);
    tbl_opp["result"].push(action);
}
btnOSON.onclick = function(){registerOppAction(txtOSON, "shot on")};
btnOSOFF.onclick = function(){registerOppAction(txtOSOFF, "shot off")};
btnOFK.onclick = function(){registerOppAction(txtOFK, "free kick")};
btnOCK.onclick = function(){registerOppAction(txtOCK, "corner kick")};
btnOPK1.onclick = function(){registerOppAction(txtOPK1, "penalty 1")};
btnOPK2.onclick = function(){registerOppAction(txtOPK2, "penalty 2")};

//#endregion

//#region Analysis
function updateAnlUITable() {
    tblAnl.innerHTML = "";
    
    var table = "";
    var metrics = Object.keys(tbl_anl)
    var rows = metrics.length + 1;
    var cols = struct_team.players.length;
    for (var r=0; r<rows; r++) {
        table += "<tr>";
        if (r==0) {
            table += "<th style='background-color:black; text-align: right'>Team &nbsp &nbsp</th>";
        } else {
            table += "<th style='background-color:black; text-align: right'>" + metrics[r-1] +" &nbsp &nbsp</th>";
        }
        // Row Colors
        if (r==2 || r==4) {
            rCol = [104,108,115,79,191,111]
        } else if (r==3 || r==5) {
            rCol = [104,108,115,240,65,80]
        } else if (r==6) {
            rCol = [216,110,11,79,191,111]
        } else {
            rCol = [104,108,115,59,111,209]
        }
        for (var c=0; c<cols; c++) {
            // Data Format
            if (r>0) {
                var cellData = tbl_anl[metrics[r-1]][c];
                if (r==2 || r==3 || r==4 || r==5) {
                    cellData = setClock(cellData);
                }
                // Cell Color
                if (r==6) {
                    cCol = getCellColorWR(tbl_anl[metrics[r-1]], c, rCol)
                } else {
                    cCol = getCellColor(tbl_anl[metrics[r-1]], c, rCol)
                }
            }
            // Add Cells
            if (r==0) {
                if (struct_team.players[c].active==1) {
                    table += "<th style='background-color:black; border-style: solid; border-color: coral'>" + struct_team.players[c].nlast + "</th>"
                } else {
                    table += "<th style='background-color:var(--grey3)'>" + struct_team.players[c].nlast + "</th>"
                }
            } else {
                table += "<th style=" + 
                            "'background-color:" + cCol + ";" + 
                            "color:var(--grey6);" + 
                            "'>" + cellData + "</th>"
            }
        }
        table += "</tr>";
    }
    tblAnl.innerHTML = table;
}
function getCellColor(dataArr, idx, rgb) {
    rVal = rgb[0]+(rgb[3]-rgb[0])*(dataArr[idx] / (Math.max(...dataArr)+0.01));
    gVal = rgb[1]+(rgb[4]-rgb[1])*(dataArr[idx] / (Math.max(...dataArr)+0.01));
    bVal = rgb[2]+(rgb[5]-rgb[2])*(dataArr[idx] / (Math.max(...dataArr)+0.01));

    return "rgb(" + rVal + "," + gVal + "," + bVal + ")"
}
function getCellColorWR(dataOG, idx, rgb) {
    var dataArr = []
    for (i=0; i<dataOG.length; i++) {
        if (dataOG[i]>1) {
            dataArr.push(1/dataOG[i])
        } else {
            dataArr.push(dataOG[i])
        }
    }
    rVal = rgb[0]+(rgb[3]-rgb[0])*(dataArr[idx]);
    gVal = rgb[1]+(rgb[4]-rgb[1])*(dataArr[idx]);
    bVal = rgb[2]+(rgb[5]-rgb[2])*(dataArr[idx]);

    return "rgb(" + rVal + "," + gVal + "," + bVal + ")"
}

function updateAnlPlayStats() {
    for (i=0; i<struct_team.players.length; i++) {
        if (tbl_player.pass_complete[i]>0 || tbl_player.pass_incomplete[i]>0) {
            tbl_anl["Pass %"][i] =
                Math.round(100*(tbl_player.pass_complete[i] / (tbl_player.pass_complete[i] + tbl_player.pass_incomplete[i])));
        } else {
            tbl_anl["Pass %"][i] = 0;
        }
        if (tbl_player.shot_on[i]>0 || tbl_player.shot_off[i]>0) {
            tbl_anl["Shot %"][i] =
                Math.round(100*(tbl_player.shot_on[i] / (tbl_player.shot_on[i] + tbl_player.shot_off[i])));
        } else {
            tbl_anl["Shot %"][i] = 0;
        }
        tbl_anl["Source-Sink"][i] = Math.round(100*tbl_player.sourcesink[i]);
    }
}
//#endregion

//#region Team Actions+Passing
function addPassCur(pID) {
    if (tbl_cpass["index"].length==0 ||
    tbl_cpass["player_no"][tbl_cpass["player_no"].length-1] !== struct_field["players"][pID-1]["pno"]) {
        updateTime();
        var player = struct_field["players"][pID-1]
        var timeMain = parseClock(struct_time["clock_main"],0);
        var timePlay = parseClock(struct_time["clock_play"],1);
        tbl_cpass["index"].push(tbl_pass["index"].length + tbl_cpass["index"].length + 1);
        tbl_cpass["sequence"].push(getSequenceNo());
        tbl_cpass["pass_num"].push(tbl_cpass["index"].length);
        tbl_cpass["period"].push(struct_time["period"]);
        tbl_cpass["min_run"].push(timeMain[0]);
        tbl_cpass["sec_run"].push(timeMain[1]);
        tbl_cpass["min_eff"].push(timePlay[0]);
        tbl_cpass["sec_eff"].push(timePlay[1]);
        tbl_cpass["player_id"].push(player["pid"]);
        tbl_cpass["field_id"].push(pID);
        tbl_cpass["player_no"].push(player["pno"]);
        tbl_cpass["last_name"].push(player["nlast"]);
        tbl_cpass["result"].push("pass");
    }
}
function addAction(lbl) {
    console.log(struct_field)
    pID = tbl_cpass.player_id[tbl_cpass.player_id.length-1]
    updateTime();
    var player = struct_team.players[pID-1]
    var timeMain = parseClock(struct_time["clock_main"],0);
    var timePlay = parseClock(struct_time["clock_play"],1);
    tbl_actions["index"].push(tbl_pass["index"].length + tbl_cpass["index"].length + 1);
    tbl_actions["sequence"].push(getSequenceNo());
    tbl_actions["pass_num"].push(tbl_cpass["index"].length);
    tbl_actions["period"].push(struct_time["period"]);
    tbl_actions["min_run"].push(timeMain[0]);
    tbl_actions["sec_run"].push(timeMain[1]);
    tbl_actions["min_eff"].push(timePlay[0]);
    tbl_actions["sec_eff"].push(timePlay[1]);
    tbl_actions["player_id"].push(player["pid"]);
    tbl_actions["field_id"].push(pID);
    tbl_actions["player_no"].push(player["pno"]);
    tbl_actions["last_name"].push(player["nlast"]);
    tbl_actions["last_name"].push(player["nlast"]);
    tbl_actions["result"].push(lbl);

    if (lbl=="duel won") {
        tbl_anl["Duels Won"][pID-1]++;
        updateAnlUITable();
    }
}
function remPassCur() {
    for (entry in tbl_cpass) {
        tbl_cpass[entry].pop();
    }
}
function finalizeSeq(lbl) {
    buttonEnable(clockStop, true);
    // Own Goal Case
    if (lbl=="goal for" && tbl_cpass["index"].length==0) {
        updateTime();
        var timeMain = parseClock(struct_time["clock_main"],0);
        var timePlay = parseClock(struct_time["clock_play"],1);
        tbl_cpass["index"].push(tbl_pass["index"].length + tbl_cpass["index"].length + 1);
        tbl_cpass["sequence"].push(getSequenceNo());
        tbl_cpass["pass_num"].push(1);
        tbl_cpass["period"].push(struct_time["period"]);
        tbl_cpass["min_run"].push(timeMain[0]);
        tbl_cpass["sec_run"].push(timeMain[1]);
        tbl_cpass["min_eff"].push(timePlay[0]);
        tbl_cpass["sec_eff"].push(timePlay[1]);
        tbl_cpass["player_id"].push("");
        tbl_cpass["field_id"].push("");
        tbl_cpass["player_no"].push("");
        tbl_cpass["last_name"].push("");
        tbl_cpass["result"].push("own goal for");
    } else {
        tbl_cpass["result"][tbl_cpass["result"].length - 1] = lbl;
    }

    // Append to pass table
    for (i=0; i<tbl_cpass["index"].length; i++) {
        tbl_pass["index"].push(tbl_cpass["index"][i]);
        tbl_pass["sequence"].push(tbl_cpass["sequence"][i]);
        tbl_pass["pass_num"].push(tbl_cpass["pass_num"][i]);
        tbl_pass["period"].push(tbl_cpass["period"][i]);
        tbl_pass["min_run"].push(tbl_cpass["min_run"][i]);
        tbl_pass["sec_run"].push(tbl_cpass["sec_run"][i]);
        tbl_pass["min_eff"].push(tbl_cpass["min_eff"][i]);
        tbl_pass["sec_eff"].push(tbl_cpass["sec_eff"][i]);
        tbl_pass["player_id"].push(tbl_cpass["player_id"][i]);
        tbl_pass["field_id"].push(tbl_cpass["field_id"][i]);
        tbl_pass["player_no"].push(tbl_cpass["player_no"][i]);
        tbl_pass["last_name"].push(tbl_cpass["last_name"][i]);
        tbl_pass["result"].push(tbl_cpass["result"][i]);
    }

    // Update Player Table
    updatePlayerTable()
    updateAnlPlayStats()

    // Clear Current Sequence
    tbl_cpass["index"] = [];
    tbl_cpass["sequence"] = [];
    tbl_cpass["pass_num"] = [];
    tbl_cpass["period"] = [];
    tbl_cpass["min_run"] = [];
    tbl_cpass["sec_run"] = [];
    tbl_cpass["min_eff"] = [];
    tbl_cpass["sec_eff"] = [];
    tbl_cpass["player_id"] = [];
    tbl_cpass["field_id"] = [];
    tbl_cpass["player_no"] = [];
    tbl_cpass["last_name"] = [];
    tbl_cpass["result"] = [];

    updateStats();
}
function togglePassActor() {
    for(var i = 1; i<=5; i++) {
        el = document.getElementById("btn" + i);
        buttonEnable(el, true)
    }
    if (tbl_cpass["field_id"].length > 0) {
        pfieldid = tbl_cpass["field_id"][tbl_cpass["field_id"].length-1];
        el = document.getElementById("btn" + pfieldid);
        buttonEnable(el, false)
    }
}
function updatePlayerTable() {
    for (i=0; i<tbl_cpass.pass_num.length; i++) {
        var pid = tbl_cpass.player_id[i]-1;
        // Source Sink
        if (tbl_cpass.pass_num.length>1) {
            ssVal = i/(tbl_cpass.pass_num.length-1);
            nPasses = tbl_player.pass_complete[i] + tbl_player.pass_incomplete[i]
            tbl_player.sourcesink[pid] = (tbl_player.sourcesink[pid]*nPasses + ssVal) / (nPasses+1);
        }
        // Stats
        if (i<tbl_cpass.pass_num.length-1) {
            tbl_player.pass_complete[pid]++;
        } else {
            if (tbl_cpass.result[i]=="pass incomplete") {
                tbl_player.pass_incomplete[pid]++;
            } else if (tbl_cpass.result[i]=="shot on") {
                tbl_player.shot_on[pid]++;
            } else if (tbl_cpass.result[i]=="shot off") {
                tbl_player.shot_off[pid]++;
            }
        }
    }
    console.log(Object.keys(tbl_anl))
}
btnP1.onclick = function(){addPassCur(1);toggleActions(true);buttonEnable(clockStop, false);togglePassActor()}
btnP2.onclick = function(){addPassCur(2);toggleActions(true);buttonEnable(clockStop, false);togglePassActor()}
btnP3.onclick = function(){addPassCur(3);toggleActions(true);buttonEnable(clockStop, false);togglePassActor()}
btnP4.onclick = function(){addPassCur(4);toggleActions(true);buttonEnable(clockStop, false);togglePassActor()}
btnP5.onclick = function(){addPassCur(5);toggleActions(true);buttonEnable(clockStop, false);togglePassActor()}
btnUndo.onclick = function() {
    remPassCur();
    if (tbl_cpass["index"].length==0) {
        toggleActions(false);
    }
    togglePassActor()
}
btnPINC.onclick = function() {finalizeSeq("pass incomplete");toggleActions(false);togglePassActor()}
btnDWON.onclick = function() {addAction("duel won")}
btnPLOSS.onclick = function() {finalizeSeq("possession loss");toggleActions(false);togglePassActor()}
btnBLK.onclick = function() {addAction("block")}
btnPGAIN.onclick = function() {addAction("possession gain")}
btnSEQ.onclick = function() {finalizeSeq("sequence break");toggleActions(false);togglePassActor()}
btnSON.onclick = function() {finalizeSeq("shot on");toggleActions(false);togglePassActor()}
btnSOFF.onclick = function() {finalizeSeq("shot off");toggleActions(false);togglePassActor()}
btnSBLK.onclick = function() {finalizeSeq("shot block");toggleActions(false);togglePassActor()}
btnCK.onclick = function() {finalizeSeq("corner kick");toggleActions(false);togglePassActor()}
btnFK.onclick = function() {finalizeSeq("free kick");toggleActions(false);togglePassActor()}
btnPK1.onclick = function() {finalizeSeq("penalty 1");toggleActions(false);togglePassActor()}
btnPK2.onclick = function() {finalizeSeq("penalty 2");toggleActions(false);togglePassActor()}
btnGH.onclick = function() {
    struct_match["score"][0]++
    if (struct_team["tgl_home"]==1) {
        finalizeSeq("goal for");
        txtHScore.innerHTML++;
        toggleActions(false);
        togglePassActor();
    } else {
        registerOppAction(txtHScore, "goal against")
    }
}
btnGA.onclick = function() {
    struct_match["score"][1]++
    if (struct_team["tgl_home"]==0) {
        finalizeSeq("goal for");
        txtHScore.innerHTML++;
        toggleActions(false);
        togglePassActor();
    } else {
        registerOppAction(txtAScore, "goal against")
    }
}

//#endregion

//#region Formation
formMenu.onchange = function() {
    var formTxt = formMenu.options[formMenu.selectedIndex].text;
    var formPos = formationSel(formTxt);
    struct_field["formation"] = formTxt;
    struct_field["formationid"] = formMenu.selectedIndex;
    movePlayers(formPos);

    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"],0);
    var timePlay = parseClock(struct_time["clock_play"],1);
    tbl_match["index"].push(tbl_match["index"].length + 1)
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push(formTxt);
    tbl_match["player_id1"].push(-1);
    tbl_match["field_id1"].push(-1);
    tbl_match["player_no1"].push(-1);
    tbl_match["last_name1"].push("");
    tbl_match["player_id2"].push(-1);
    tbl_match["field_id2"].push(-1);
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");
}
dirSwitch.onclick = function() {
    struct_field["direction"] = -1*struct_field["direction"] + 1;
    movePlayers(formationSel(struct_field["formation"]));
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
    if (struct_field["direction"]==1) {
        for(var i = 0; i<=4; i++) {
            positions[i][1] = 1-positions[i][1];
            positions[i][2] = 1-positions[i][2];
        }
    }
    var el;
    const prefix = 'play';
    for(var i = 1; i<=5; i++) {
        el = document.getElementById(prefix + i);

        el.style.left = (100*positions[i-1][1] - btnWidth/2) + "%"
        el.style.top = (100*positions[i-1][2] - btnHeight/2) + "%"
    }
}
//#endregion

//#region Load Team
btnLoadTeam.onchange = function() {loadTeamInfo()};

function loadTeamInfo() {
    var files = btnLoadTeam.files || [];
    if (!files.length) return;
    var file = files[0];
  
    var reader = new FileReader();
    reader.onloadend = function(event) {
      var arrayBuffer = reader.result;
 
      var options = { type: 'array' };
      var workbook = XLSX.read(arrayBuffer, options);
  
      var sheetName = workbook.SheetNames[0]
      var sheet = workbook.Sheets[sheetName]
      
      var matchInfo = {};
      for (var i=1; i<11; i++) {
        matchInfo[sheet["A"+i]["v"]] = sheet["B"+i]["v"];
      }
      var playerInfo = {
        "pid": [],
        "pno": [],
        "nfirst": [],
        "nlast": [],
        "position": []
      };
      for (var i=14; i<30; i++) {
        playerInfo["pid"].push(sheet["A"+i]["v"]);
        playerInfo["pno"].push(sheet["B"+i]["v"]);
        playerInfo["nfirst"].push(sheet["C"+i]["v"]);
        playerInfo["nlast"].push(sheet["D"+i]["v"]);
        playerInfo["position"].push(sheet["E"+i]["v"]);
      }

      updateTeamInfo(matchInfo, playerInfo);
      updateButtonLabels();
      updateBenchList();
      updateAnlUITable();
    };
    reader.readAsArrayBuffer(file);
}
function updateTeamInfo(mInfo, pInfo) {
    // Match Info
    struct_match["date"] = mInfo["Match Date"];
    struct_match["location"] = mInfo["Location"];
    struct_match["competition"] = mInfo["Competition"];
    struct_match["stage"] = mInfo["Stage"];
    struct_match["kickoff"] = mInfo["Kick Off Time"];
    struct_match["teams"] = [mInfo["Home Team"], mInfo["Away Team"]];
    struct_match["initials"] = [mInfo["Home Display"], mInfo["Away Display"]];

    // Team Info
    struct_team["name"] = mInfo["Team Analyzed"];
    if (mInfo["Home Team"]==mInfo["Team Analyzed"]) {
        struct_team["tgl_home"] = 1;
    } else {
        struct_team["tgl_home"] = 0;
    }
    for(var i=0; i<(struct_general["nplay"] + struct_general["nsub"]); i++) {
        struct_team["players"][i]["pno"] = pInfo["pno"][i];
        struct_team["players"][i]["nfirst"] = pInfo["nfirst"][i];
        struct_team["players"][i]["nlast"] = pInfo["nlast"][i];
        struct_team["players"][i]["position"] = pInfo["position"][i];
    }
}
//#endregion

//#region Load Match
btnLoadMatch.onchange = function() {
    let file = btnLoadMatch.files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
            let text = e.target.result;
            var match_data = JSON.parse(text);

            // UPDATE STRUCTURES
            struct_general = match_data["general"];
            struct_match = match_data["match"];
            struct_time = match_data["time"];
            struct_team = match_data["team"];
            struct_field = match_data["field"];
            tbl_cpass = match_data["tbl_cpass"];
            tbl_pass = match_data["tbl_pass"];
            tbl_actions = match_data["tbl_actions"];
            tbl_opp = match_data["tbl_opp"];
            tbl_match = match_data["tbl_match"];
            tbl_anl = match_data["tbl_anl"];

            // UPDATE MINUTES + SECONDS        
            var timeMain = parseClock(struct_time["clock_main"],0);
            var timePlay = parseClock(struct_time["clock_play"],1);
            minutesM = timeMain[0];
            secondsM = timeMain[1];
            minutesP = timePlay[0];
            secondsP = timePlay[1];

            // UPDATE INFO
            updateButtonLabels();
            updateBenchList();
            updateStats();
            updateAnlUITable();
            clockPer.innerHTML = struct_time["period"];
            clockMain.innerHTML = struct_time["clock_main"];
            clockPlay.innerHTML = struct_time["clock_play"];
            txtHScore.innerHTML = struct_match["score"][0];
            txtAScore.innerHTML = struct_match["score"][1];
            txtOSON.innerHTML = getAllIndexes(tbl_opp["result"], "shot on").length;
            txtOSOFF.innerHTML = getAllIndexes(tbl_opp["result"], "shot off").length;
            txtOFK.innerHTML = getAllIndexes(tbl_opp["result"], "free kick").length;
            txtOCK.innerHTML = getAllIndexes(tbl_opp["result"], "corner kick").length;
            txtOPK1.innerHTML = getAllIndexes(tbl_opp["result"], "penalty 1").length;
            txtOPK2.innerHTML = getAllIndexes(tbl_opp["result"], "penalty 2").length;
            // UPDATE ENABLES
            if (struct_time["pausetgl"]==1) {
                buttonEnable(clockKickOff, false);
                buttonEnable(clockBreak, true);
                buttonEnable(clockPause, true);
                buttonEnable(clockStop, false);
                buttonEnable(btnSave, true);
                buttonEnable(btnExport, false);
                
                clockPause.classList.add('toggle');
                clockMain.classList.remove('break');
                clockPlay.classList.remove('break');
                clockPer.classList.remove('break');
                clockMain.classList.add('pause');
                clockPlay.classList.add('pause');

                togglePlayers(true);
                toggleMatch(true);
                toggleOpp(true);
                toggleStats(true);
            } else {
                buttonEnable(btnExport, true);
            }

            if (struct_field["direction"]==1) {
                dirSwitch.checked = true;
            } else {
                dirSwitch.checked = false;
            }
            formMenu.selectedIndex = struct_field["formationid"];
            movePlayers(formationSel(struct_field["formation"]));

            togglePassActor();
    });
    reader.readAsText(file);
};
//#endregion

//#region Save Match
btnSave.onclick = function() {
    updateTime();
    var struct = {
        "general": struct_general,
        "match": struct_match,
        "time": struct_time,
        "team": struct_team,
        "field": struct_field,
        "tbl_cpass": tbl_cpass,
        "tbl_pass": tbl_pass,
        "tbl_actions": tbl_actions,
        "tbl_opp": tbl_opp,
        "tbl_match": tbl_match,
        "tbl_anl": tbl_anl
    }
    var blob = new Blob([JSON.stringify(struct)], {type: "text/plain;charset=utf-8"});
    var fileName = struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + ".txt";
    saveAs(blob, fileName);
}
//#endregion

//#region Export Data
function getPassMatrix() {
    var playerNums = getKeyArray(struct_team["players"], "pno");
    var nPlayers = 0;
    for (i=0; i<playerNums.length; i++) {
        if (playerNums[i]>=0) {
            nPlayers++;
        }
    }
    var passMat = Array(nPlayers).fill().map(_ => Array(nPlayers).fill(0));
    var passIndex = getAllIndexes(tbl_pass["result"], "pass");
    for (var row=0; row<passIndex.length; row++) {
        pID1 = tbl_pass["player_id"][passIndex[row]];
        pID2 = tbl_pass["player_id"][passIndex[row]+1];
        passMat[pID1-1][pID2-1]++;
    }

    return passMat
}
function pushSheet(wb, name, data) {
    var ws = XLSX.utils.aoa_to_sheet(data);
    wb.SheetNames.push(name);
    wb.Sheets[name] = ws;

    return wb
}
function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
}

btnExport.onclick = function() {
    var head;
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "BreakAway Futsal",
        Author: "Sport Performance Analytics Inc.",
        CreatedDate: new Date()
    };

    // Match Info Tab
    var dataMatchInfo = [];
    // Header
    dataMatchInfo.push(["Team Analyzed", "Date", "Location", "Competition", "Stage", "KickOff",
    "Home Team", "Away Team", "Home Initials", "Away Initials", "Goals (Home)", "Goals (Away)"]);
    dataMatchInfo.push([struct_team["name"], struct_match["date"], struct_match["location"], struct_match["competition"],
    struct_match["stage"], struct_match["kickoff"], struct_match["teams"][0], struct_match["teams"][1],
    struct_match["initials"][0], struct_match["initials"][1], struct_match["score"][0], struct_match["score"][1]]);

    // Team Info Tab
    var dataTeamInfo = [];
    // Header
    dataTeamInfo.push(["Player ID", "Player No", "First Name", "Last Name", "Position"]);
    // Data
    for (var row=0; row<struct_team["players"].length; row++) {
        dataTeamInfo.push([
            struct_team["players"][row]["pid"],
            struct_team["players"][row]["pno"],
            struct_team["players"][row]["nfirst"],
            struct_team["players"][row]["nlast"],
            struct_team["players"][row]["position"]
        ]);
    }

    // Match Events Tab
    var dataMatchEvents = [];
    // Header
    dataMatchEvents.push(Object.keys(tbl_match));
    // Data
    if (tbl_match["index"].length > 0) {
        for (var row=0; row<tbl_match["index"].length; row++) {
            var datarow = [];
            for (var col=0; col<Object.keys(tbl_match).length; col++) {
                datarow.push(tbl_match[Object.keys(tbl_match)[col]][row])
            }
            dataMatchEvents.push(datarow.slice());
        }
    }

    // Opp Events Tab
    var dataOppEvents = [];
    // Header
    dataOppEvents.push(Object.keys(tbl_opp));
    // Data
    if (tbl_opp["index"].length > 0) {
        for (var row=0; row<tbl_opp["index"].length; row++) {
            var datarow = [];
            for (var col=0; col<Object.keys(tbl_opp).length; col++) {
                datarow.push(tbl_opp[Object.keys(tbl_opp)[col]][row])
            }
            dataOppEvents.push(datarow.slice());
        }
    }

    // Team Events Tab
    var dataTeamEvents = [];
    // Header
    dataTeamEvents.push(Object.keys(tbl_pass));
    // Data
    if (tbl_pass["index"].length > 0) {
        for (var row=0; row<tbl_pass["index"].length; row++) {
            var datarow = [];
            for (var col=0; col<Object.keys(tbl_pass).length; col++) {
                datarow.push(tbl_pass[Object.keys(tbl_pass)[col]][row])
            }
            dataTeamEvents.push(datarow.slice());
        }
    }

    // Team Actions Tab
    var dataTeamActions = [];
    // Header
    dataTeamActions.push(Object.keys(tbl_pass));
    // Data
    if (tbl_actions["index"].length > 0) {
        for (var row=0; row<tbl_actions["index"].length; row++) {
            var datarow = [];
            for (var col=0; col<Object.keys(tbl_actions).length; col++) {
                datarow.push(tbl_actions[Object.keys(tbl_actions)[col]][row])
            }
            dataTeamActions.push(datarow.slice());
        }
    }

    // Playing Stats Tab
    var dataPlayEvents = [];
    // Header
    var headerrow = []
    headerrow.push('Jersey #')
    headerrow.push('Display Name')
    dataPlayEvents.push(headerrow.concat(Object.keys(tbl_anl)));
    // Data
    if (tbl_anl.Rotations.length > 0) {
        for (var row=0; row<tbl_anl.Rotations.length; row++) {
            var datarow = [];
            datarow.push(struct_team.players[row].pno)
            datarow.push(struct_team.players[row].nlast)
            for (var col=0; col<Object.keys(tbl_anl).length; col++) {
                datarow.push(tbl_anl[Object.keys(tbl_anl)[col]][row])
            }
            dataPlayEvents.push(datarow.slice());
        }
    }

    // Pass Matrix Tab
    var dataPassMatrix = [[],[],[],[],[]];
    var passMat = getPassMatrix();
    //Header Rows
    for (col=-5; col<passMat.length; col++) {
        if (col<0) {
            dataPassMatrix[0].push("");
            dataPassMatrix[1].push("");
            dataPassMatrix[2].push("");
            dataPassMatrix[3].push("");
            dataPassMatrix[4].push("");
        } else {
            if (struct_team["players"][col]["pno"]>=0) {
                dataPassMatrix[0].push(struct_team["players"][col]["pid"]);
                dataPassMatrix[1].push(struct_team["players"][col]["pno"]);
                dataPassMatrix[2].push(struct_team["players"][col]["position"]);
                dataPassMatrix[3].push(struct_team["players"][col]["nfirst"]);
                dataPassMatrix[4].push(struct_team["players"][col]["nlast"]);
            }
        }
    }
    // Data Rows
    for (row=0; row<passMat.length; row++) {
        var datarow = [];
        for (col=-1; col<passMat.length; col++) {
            if (col<0) {
                datarow.push(struct_team["players"][row]["pid"]);
                datarow.push(struct_team["players"][row]["pno"]);
                datarow.push(struct_team["players"][row]["position"]);
                datarow.push(struct_team["players"][row]["nfirst"]);
                datarow.push(struct_team["players"][row]["nlast"]);
            } else {
                datarow.push(passMat[row][col]);
            }
        }
        dataPassMatrix.push(datarow.slice());
    }

    wb = pushSheet(wb, "Match Info", dataMatchInfo);
    wb = pushSheet(wb, "Team Info", dataTeamInfo);
    wb = pushSheet(wb, "Match Events", dataMatchEvents);
    wb = pushSheet(wb, "Opposition Events", dataOppEvents);
    wb = pushSheet(wb, "Team Events", dataTeamEvents);
    wb = pushSheet(wb, "Team Actions", dataTeamActions);
    wb = pushSheet(wb, "Playing Stats", dataPlayEvents);
    wb = pushSheet(wb, "Pass Matrix", dataPassMatrix);

    // Export
    var fileName = struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + ".xlsx";
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fileName);
};
//#endregion

//#region UI SET
window.onload = function() {
    toggleActions(false);
    toggleMatch(false);
    toggleOpp(false);
    togglePlayers(false);
    toggleStats(false);
    buttonEnable(clockBreak, false);
    buttonEnable(clockPause, false);
    buttonEnable(clockStop, false);
    buttonEnable(btnSave, false);
    buttonEnable(btnExport, false);
    enableSubSwitch(getKeyArray(struct_field["players"], "selected"));
    updateAnlUITable();
}
//#endregion

function updateButtonLabels() {
    var lbl;
    var btn;
    for(var i = 1; i<=5; i++) {
        lbl = document.getElementById("lbl" + i);
        lbl.innerHTML = struct_field["players"][i-1]["nlast"];
        btn = document.getElementById("btn" + i);
        btn.innerHTML = "#"+struct_field["players"][i-1]["pno"];
        chk = document.getElementById("chk" + i);
        chk.checked = false;
        struct_field["players"][i-1]["selected"] = 0;
    }
}
function updateBenchList() {
    var benchID = getAllIndexes(getKeyArray(struct_team["players"], "active"), 0);
    listBench.options.length = 0;
    for(i=0; i<benchID.length; i++) {
        var player = struct_team["players"][benchID[i]];
        var benchName = "[" + player["pno"] + "]" + " " + player["nlast"];
        listBench.options[listBench.options.length] = new Option(benchName, i);
    }
    listBench.selectedIndex = 0;
}
function buttonEnable(button, tgl) {
    if (tgl) {
        button.disabled = false;
        button.classList.remove('disabled');
    } else {
        button.disabled = true;
        button.classList.add('disabled');
    }
}
function toggleActions(tgl) {
    buttonEnable(btnPINC, tgl);
    buttonEnable(btnDWON, tgl);
    buttonEnable(btnPLOSS, tgl);
    buttonEnable(btnBLK, tgl);
    buttonEnable(btnPGAIN, tgl);
    buttonEnable(btnSEQ, tgl);
    buttonEnable(btnSON, tgl);
    buttonEnable(btnSOFF, tgl);
    buttonEnable(btnSBLK, tgl);
    buttonEnable(btnFK, tgl);
    buttonEnable(btnCK, tgl);
    buttonEnable(btnPK1, tgl);
    buttonEnable(btnPK2, tgl);
    buttonEnable(btnUndo, tgl)
}
function togglePlayers(tgl) {
    buttonEnable(btnP1, tgl)
    buttonEnable(btnP2, tgl)
    buttonEnable(btnP3, tgl)
    buttonEnable(btnP4, tgl)
    buttonEnable(btnP5, tgl)
}
function toggleOpp(tgl) {
    buttonEnable(btnOSON, tgl);
    buttonEnable(btnOSOFF, tgl);
    buttonEnable(btnOFK, tgl);
    buttonEnable(btnOCK, tgl);
    buttonEnable(btnOPK1, tgl);
    buttonEnable(btnOPK2, tgl);
    if (tgl==false) {
        txtOSON.classList.add("break");
        txtOSOFF.classList.add("break");
        txtOFK.classList.add("break");
        txtOCK.classList.add("break");
        txtOPK1.classList.add("break");
        txtOPK2.classList.add("break");
    } else {
        txtOSON.classList.remove("break");
        txtOSOFF.classList.remove("break");
        txtOFK.classList.remove("break");
        txtOCK.classList.remove("break");
        txtOPK1.classList.remove("break");
        txtOPK2.classList.remove("break");
    }
}
function toggleMatch(tgl) {
    buttonEnable(btnGH, tgl);
    buttonEnable(btnGA, tgl);
    if (tgl==false) {
        txtHScore.classList.add("break");
        txtAScore.classList.add("break");
    } else {
        txtHScore.classList.remove("break");
        txtAScore.classList.remove("break");
    }
}
function toggleStats(tgl) {
    if (tgl==false) {
        txtPATT.classList.add("break");
        txtPCMP.classList.add("break");
        txtPEFF.classList.add("break");
        txtSON.classList.add("break");
        txtSOFF.classList.add("break");
        txtSEFF.classList.add("break");
    } else {
        txtPATT.classList.remove("break");
        txtPCMP.classList.remove("break");
        txtPEFF.classList.remove("break");
        txtSON.classList.remove("break");
        txtSOFF.classList.remove("break");
        txtSEFF.classList.remove("break");
    }
}
function getKeyArray(dictname, keyname) {
    var valueArray = [];
    for (i=0; i<dictname.length; i++) {
        valueArray.push(dictname[i][keyname])
    }

    return valueArray
}
function getAllIndexes(arr, val) {
    var indexes = [];
    for(var i = 0; i < arr.length; i++)
        if (arr[i] == val)
            indexes.push(i);
    return indexes;
}
function getSequenceNo() {
    if (tbl_pass["sequence"].length==0) {
        seqNo = 1;
    } else {
        seqNo = Math.max.apply(null, tbl_pass["sequence"]) + 1;
    }
    return seqNo
}
function updateStats() {
    // PASS
    var pC = getAllIndexes(tbl_pass["result"], "pass").length;
    var pI = getAllIndexes(tbl_pass["result"], "pass incomplete").length;
    var pA = pI + pC;
    var pE = 0;
    if (pA > 0) {
        var pE = pC / pA;
    }
    // SHOT
    var sOn = getAllIndexes(tbl_pass["result"], "shot on").length + getAllIndexes(tbl_pass["result"], "goal for").length;
    var sOff = getAllIndexes(tbl_pass["result"], "shot off").length;
    var sT = sOn + sOff;
    var sE = 0;
    if (sT > 0) {
        var sE = sOn / sT;
    }

    // UPDATE
    txtPATT.innerHTML = pA;
    txtPCMP.innerHTML = pC;
    txtPEFF.innerHTML = Math.round(100*pE) + "%";
    txtSON.innerHTML = sOn;
    txtSOFF.innerHTML = sOff;
    txtSEFF.innerHTML = Math.round(100*sE) + "%";
}
