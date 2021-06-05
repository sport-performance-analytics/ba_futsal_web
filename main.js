var formMenu = document.getElementById("form");

// INITIALIZATION
// Initialize Dictionaries
struct_general = {  // Generic Container
    "nplay": 5,
    "nsub": 10,
    "sequence": 0
};
struct_time = { // Time Container
    "period": document.getElementById("period").innerHTML,
    "clock_main": document.getElementById("clock-main").innerHTML,
    "clock_play": document.getElementById("clock-play").innerHTML,
    "kickofftgl": 0,
    "pausetgl": 0
}
struct_match = { // Match Information Container
    "date": [00, 00, 00], // YYYY-MM-DD
    "location": "Stadium",
    "competition": "Competition",
    "stage": "Stage",
    "kickoff": [00, 00], // 00h:00
    "score": [0, 0], // Home, Away
    "teams": ["Home Team", "Away Team"],
    "initials": ["HOM", "AWA"]
}
struct_team = { // Team Information Container
    "lastnames": ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen"],
    "name": "Team",
    "tgl_home": 1,
    "players": []
}
for(var i = 0; i<(struct_general["nplay"] + struct_general["nsub"]); i++) {
    var pinfo = {
        "pid": i+1,
        "nfirst": "Player",
        "nlast": struct_team["lastnames"][i],
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
struct_field = { // Field Player Properties Container
    "formation": formMenu.options[formMenu.selectedIndex].text,
    "direction": 0, // 0: L>R, 1: L<R
    "players": struct_team["players"].slice(0,struct_general["nplay"])
}

// Initialize Tables
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
    "index": [],
    "period": [],
    "min_run": [],
    "sec_run": [],
    "min_eff": [],
    "sec_eff": [],
    "result": [],
    "player_id1": [],
    "field_id1": [],
    "player_no1": [],
    "last_name1": [],
    "player_id2": [],
    "field_id2": [],
    "player_no2": [],
    "last_name2": [],
}
for(var i = 0; i<struct_general["nplay"]; i++) {
    var timeMain = parseClock(struct_time["clock_main"]);
    var timePlay = parseClock(struct_time["clock_play"]);
    tbl_match["index"].push(i);
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



function parseClock(clockTxt) {
    clockArr = clockTxt.split(":");
    minutes = clockArr[0];
    seconds = clockArr[1];

    return [minutes, seconds]
}

console.log(struct_team["players"])
console.log(tbl_match)