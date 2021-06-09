//#region var/const declarations;
var lastNames = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen"]
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
var btnSub = document.getElementById("sub");
var btnSwitch = document.getElementById("switch");
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
var btnPLOSS = document.getElementById("poss-loss");
var btnSEQ = document.getElementById("seq-brk");
var btnKIN = document.getElementById("kick-in");
var btnSON = document.getElementById("shot-on");
var btnSOFF = document.getElementById("shot-off");
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
var tblPass = document.getElementById("tbl-pass");
var txtPATT = document.getElementById("txt-patt");
var txtPCMP = document.getElementById("txt-pcmp");
var txtPEFF = document.getElementById("txt-peff");
var txtSON = document.getElementById("txt-son");
var txtSOFF = document.getElementById("txt-soff");
var txtSEFF = document.getElementById("txt-seff");

// Helper
const arrSum = arr => arr.reduce((a,b) => a + b, 0);
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
}
//#endregion

//#region  INITIALIZATION
//#region  Initialize Dictionaries
var struct_general = {  // Generic Container
    "nplay": 5,
    "nsub": 10
};
var struct_time = { // Time Container
    "period": clockPer.innerHTML,
    "clock_main": clockMain.innerHTML,
    "clock_play": clockMain.innerHTML,
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
        pinfo["active"] = 1;
    }
    struct_team["players"].push(pinfo)
}
var struct_field = { // Field Player Properties Container
    "formation": formMenu.options[formMenu.selectedIndex].text,
    "direction": 0, // 0: L>R, 1: L<R
    "players": struct_team["players"].slice(0,struct_general["nplay"])
}
//#endregion
//#region Initialize Tables
tbl_cpass = {
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
tbl_pass = {
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
tbl_opp = {
    "index": [],
    "period": [],
    "min_run": [],
    "sec_run": [],
    "min_eff": [],
    "sec_eff": [],
    "result": []
}
tbl_match = {
    "index": [1],
    "period": [0],
    "min_run": [00],
    "sec_run": [00],
    "min_eff": [00],
    "sec_eff": [00],
    "result": ["1-2-1"],
    "player_id1": [""],
    "field_id1": [""],
    "player_no1": [""],
    "last_name1": [""],
    "player_id2": [""],
    "field_id2": [""],
    "player_no2": [""],
    "last_name2": [""],
}
for(var i = 0; i<struct_general["nplay"]; i++) {
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
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
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
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
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
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
    secondsM = "00";
    displayClock(clockMain, minutesM, secondsM)

    minutesP = "0";
    secondsP = "00";
    displayClock(clockPlay, minutesP, secondsP)

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
        
        buttonEnable(clockStop, true)
        buttonEnable(btnSave, false)
        
        clockPause.classList.remove('toggle');
        clockMain.classList.remove('pause');
        clockPlay.classList.remove('pause');
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

    if(secondsM <= 9){
    secondsM = "0" + secondsM;
    }
    
    if (secondsM > 59) {
    minutesM++;
    secondsM = 0;
    }

    displayClock(clockMain, minutesM, secondsM)
}
function startPlay() {
    secondsP++; 

    if(secondsP <= 9){
    secondsP = "0" + secondsP;
    }
    
    if (secondsP > 59) {
    minutesP++;
    secondsP = 0;
    }

    displayClock(clockPlay, minutesP, secondsP)
}
function displayClock(clockTxt, minutes, seconds) {
    if(minutesP <= 9){
        clockTxt.innerHTML = "0" + minutes + ":" + seconds;
    } else {
        clockTxt.innerHTML = minutes + ":" + seconds;
    }
}
function parseClock(clockTxt) {
    clockArr = clockTxt.split(":");
    minutes = clockArr[0];
    seconds = clockArr[1];

    return [minutes, seconds]
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
    if (document.getElementById("chk1").checked==true) {
        struct_field["players"][0]["selected"] = 1;
    } else {
        struct_field["players"][0]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk2").onclick = function() {
    if (document.getElementById("chk2").checked==true) {
        struct_field["players"][1]["selected"] = 1;
    } else {
        struct_field["players"][1]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk3").onclick = function() {
    if (document.getElementById("chk3").checked==true) {
        struct_field["players"][2]["selected"] = 1;
    } else {
        struct_field["players"][2]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk4").onclick = function() {
    if (document.getElementById("chk4").checked==true) {
        struct_field["players"][3]["selected"] = 1;
    } else {
        struct_field["players"][3]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
document.getElementById("chk5").onclick = function() {
    if (document.getElementById("chk5").checked==true) {
        struct_field["players"][4]["selected"] = 1;
    } else {
        struct_field["players"][4]["selected"] = 0;
    }
    var selArray = getKeyArray(struct_field["players"], "selected");
    enableSubSwitch(selArray);
}
//#endregion

function enableSubSwitch(selArray) {
    if (arrSum(selArray)==1) {
        buttonEnable(btnSub, true);
        buttonEnable(btnSwitch, false);
    } else if (arrSum(selArray)==2) {
        buttonEnable(btnSub, false);
        buttonEnable(btnSwitch, true);
    } else {
        buttonEnable(btnSub, false);
        buttonEnable(btnSwitch, false);
    }
}

btnSub.onclick = function() {
    var selArray = getKeyArray(struct_field["players"], "selected");
    var selIdx = getAllIndexes(selArray, 1)[0];
    var offNo = struct_field["players"][selIdx]["pno"];
    var offID = getAllIndexes(getKeyArray(struct_team["players"], "pno"), offNo)[0];

    var benchLbl = listBench.options[listBench.selectedIndex].text;
    var onNo = benchLbl.split("] ")[0].split("[")[1];
    var onID = getAllIndexes(getKeyArray(struct_team["players"], "pno"), onNo)[0];

    struct_team["players"][offID]["active"] = 0;
    struct_team["players"][onID]["active"] = 1;
    struct_field["players"][selIdx] = struct_team["players"][onID];

    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
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

    console.log(tbl_match)
}

btnSwitch.onclick = function() {
    var selArray = getKeyArray(struct_field["players"], "selected");
    var selIdx = getAllIndexes(selArray, 1);
    var player1 = struct_field["players"][selIdx[0]];
    var player2 = struct_field["players"][selIdx[1]];

    struct_field["players"][selIdx[0]] = player2;
    struct_field["players"][selIdx[1]] = player1;

    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
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

    console.log(tbl_match)
}
//#endregion

//#region Opposition Actions
function registerOppAction(txt, action) {
    txt.innerHTML++;
    // Update Opp Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
    tbl_opp["index"].push(tbl_opp["index"].length + 1)
    tbl_opp["period"].push(struct_time["period"]);
    tbl_opp["min_run"].push(timeMain[0]);
    tbl_opp["sec_run"].push(timeMain[1]);
    tbl_opp["min_eff"].push(timePlay[0]);
    tbl_opp["sec_eff"].push(timePlay[1]);
    tbl_opp["result"].push(action);

    console.log(tbl_opp)
}
btnOSON.onclick = function(){registerOppAction(txtOSON, "shot on")};
btnOSOFF.onclick = function(){registerOppAction(txtOSOFF, "shot off")};
btnOFK.onclick = function(){registerOppAction(txtOFK, "free kick")};
btnOCK.onclick = function(){registerOppAction(txtOCK, "corner kick")};
btnOPK1.onclick = function(){registerOppAction(txtOPK1, "penalty 1")};
btnOPK2.onclick = function(){registerOppAction(txtOPK2, "penalty 2")};

//#endregion

//#region Team Actions+Passing
function addPassCur(pID) {
    updateTime();
    var player = struct_field["players"][pID-1]
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
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
function remPassCur() {
    for (entry in tbl_cpass) {
        tbl_cpass[entry].pop();
    }
}
function updatePassTable() {
    tblPass.innerHTML = "";
    
    var data = [tbl_cpass["pass_num"], tbl_cpass["player_no"], tbl_cpass["last_name"]];
    var table = "";
    var rows = data[0].length;
    var cols = data.length;
    for (var r=0; r<rows; r++) {
        table += "<tr>";
        for (var c=0; c<cols; c++) {
            table += "<th>" + data[c][r] + "</th>"
        }
        table += "</tr>";
    }
    tblPass.innerHTML = table;
}
function finalizeSeq(lbl) {
    buttonEnable(clockStop, true);
    // Own Goal Case
    if (lbl=="goal for" && tbl_cpass["index"].length==0) {
        updateTime();
        var timeMain = parseClock(struct_time["clock_main"]);
        var timePlay = parseClock(struct_time["clock_play"]);
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

    updatePassTable();
    updateStats();
    console.log(tbl_pass)
}

btnP1.onclick = function(){addPassCur(1);updatePassTable();toggleActions(true);buttonEnable(clockStop, false)}
btnP2.onclick = function(){addPassCur(2);updatePassTable();toggleActions(true);buttonEnable(clockStop, false)}
btnP3.onclick = function(){addPassCur(3);updatePassTable();toggleActions(true);buttonEnable(clockStop, false)}
btnP4.onclick = function(){addPassCur(4);updatePassTable();toggleActions(true);buttonEnable(clockStop, false)}
btnP5.onclick = function(){addPassCur(5);updatePassTable();toggleActions(true);buttonEnable(clockStop, false)}
btnUndo.onclick = function() {
    remPassCur();
    updatePassTable();
    if (tbl_cpass["index"].length==0) {
        toggleActions(false);
    }
}
btnPINC.onclick = function() {finalizeSeq("pass incomplete");toggleActions(false);}
btnPLOSS.onclick = function() {finalizeSeq("possession loss");toggleActions(false);}
btnSEQ.onclick = function() {finalizeSeq("sequence break");toggleActions(false);}
btnKIN.onclick = function() {finalizeSeq("kick in");toggleActions(false);}
btnSON.onclick = function() {finalizeSeq("shot on");toggleActions(false);}
btnSOFF.onclick = function() {finalizeSeq("shot off");toggleActions(false);}
btnCK.onclick = function() {finalizeSeq("corner kick");toggleActions(false);}
btnFK.onclick = function() {finalizeSeq("free kick");toggleActions(false);}
btnPK1.onclick = function() {finalizeSeq("penalty 1");toggleActions(false);}
btnPK2.onclick = function() {finalizeSeq("penalty 2");toggleActions(false);}
btnGH.onclick = function() {
    struct_match["score"][0]++
    if (struct_team["tgl_home"]==1) {
        finalizeSeq("goal for");
        txtHScore.innerHTML++;
        toggleActions(false);
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
    movePlayers(formPos);

    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
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
    formTxt = formMenu.options[formMenu.selectedIndex].text;
    formPos = formationSel(formTxt);
    if (dirSwitch.checked==true) {
        struct_field["direction"] = 1;
    } else {
        struct_field["direction"] = 0;
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
      console.log(sheet)
      
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
      for (var i=14; i<29; i++) {
        playerInfo["pid"].push(sheet["A"+i]["v"]);
        playerInfo["pno"].push(sheet["B"+i]["v"]);
        playerInfo["nfirst"].push(sheet["C"+i]["v"]);
        playerInfo["nlast"].push(sheet["D"+i]["v"]);
        playerInfo["position"].push(sheet["E"+i]["v"]);
      }

      updateTeamInfo(matchInfo, playerInfo);
      updateButtonLabels();
      updateBenchList();
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

    console.log(struct_match)

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

    console.log(struct_team)
}
//#endregion

//#region Load Match
btnLoadMatch.onchange = function() {
    let file = btnLoadMatch.files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
            let text = e.target.result;
            var match_data = JSON.parse(text);
            console.log(match_data);

            // UPDATE STRUCTURES
            struct_general = match_data["general"];
            struct_match = match_data["match"];
            struct_time = match_data["time"];
            struct_team = match_data["team"];
            struct_field = match_data["field"];
            tbl_cpass = match_data["tbl_cpass"];
            tbl_pass = match_data["tbl_pass"];
            tbl_opp = match_data["tbl_opp"];
            tbl_match = match_data["tbl_match"];

            // UPDATE INFO
            updateButtonLabels();
            updateBenchList();
            updatePassTable();
            updateStats();
            clockPer.innerHTML = struct_time["period"];
            clockMain.innerHTML = struct_time["clock_main"];
            clockPlay.innerHTML = struct_time["clock_play"];
            // UPDATE ENABLES
            if (struct_time["pausetgl"]==1) {
                buttonEnable(clockKickOff, false);
                buttonEnable(clockBreak, true);
                buttonEnable(clockPause, true);
                buttonEnable(clockStop, false);
                buttonEnable(btnSave, true)
                
                clockPause.classList.add('toggle');
                clockMain.classList.remove('break');
                clockPlay.classList.remove('break');
                clockMain.classList.add('pause');
                clockPlay.classList.add('pause');
            }
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
        "tbl_opp": tbl_opp,
        "tbl_match": tbl_match
    }
    var blob = new Blob([JSON.stringify(struct)], {type: "text/plain;charset=utf-8"});
    var filename = struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + ".txt";
    saveAs(blob, filename);
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
    buttonEnable(btnPLOSS, tgl);
    buttonEnable(btnSEQ, tgl);
    buttonEnable(btnKIN, tgl);
    buttonEnable(btnSON, tgl);
    buttonEnable(btnSOFF, tgl);
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
    if (Math.max(tbl_pass["sequence"])==0) {
        seqNo = 1;
    } else {
        seqNo = Math.max(...tbl_pass["sequence"]) + 1;
    }
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
