window.onload = function () {
  var secondsM = 0;
  var minutesM = 0;
  var secondsP = 0;
  var minutesP = 0;
  var clockMain = document.getElementById("clock-main")
  var clockPlay = document.getElementById("clock-play")
  var buttonKick = document.getElementById('kick-off');
  var buttonBreak = document.getElementById('break');
  var buttonPause = document.getElementById('pause');
  var buttonStop = document.getElementById('stoppage');
  var periodTxt = document.getElementById('period');

  var pauseTgl = 0;
  var stopTgl = 0;
  var IntervalM;
  var IntervalP;

  buttonKick.onclick = function() {
    periodTxt.innerHTML++;

     clearInterval(IntervalM);
     clearInterval(IntervalP);
     IntervalM = setInterval(startMain, 1000);
     IntervalP = setInterval(startPlay, 1000);

     // Button Enables
     buttonDisable(buttonKick)
     buttonEnable(buttonBreak)
     buttonEnable(buttonPause)
     buttonEnable(buttonStop)
     // Button Aesthetics
     periodTxt.classList.remove('break');
     clockMain.classList.remove('break');
     clockPlay.classList.remove('break');
  }

  buttonBreak.onclick = function() {
    clearInterval(IntervalM);
    clearInterval(IntervalP);
    minutesM = "0";
  	secondsM = "00";
    displayClock(clockMain, minutesM, secondsM)

    minutesP = "0";
  	secondsP = "00";
    displayClock(clockPlay, minutesP, secondsP)

    // Button Enables
    buttonEnable(buttonKick)
    buttonDisable(buttonBreak)
    buttonDisable(buttonPause)
    buttonDisable(buttonStop)
    // Button Aesthetics
    periodTxt.classList.add('break');
    clockMain.classList.add('break');
    clockPlay.classList.add('break');
  }

  buttonPause.onclick = function() {
    if(pauseTgl==0){
        clearInterval(IntervalM);
        clearInterval(IntervalP);
        pauseTgl = 1;
        buttonDisable(buttonStop)
        buttonPause.classList.add('toggle');
        clockMain.classList.add('pause');
        clockPlay.classList.add('pause');
    } else {
        IntervalM = setInterval(startMain, 1000);
        IntervalP = setInterval(startPlay, 1000);
        pauseTgl = 0;
        buttonEnable(buttonStop)
        buttonPause.classList.remove('toggle');
        clockMain.classList.remove('pause');
        clockPlay.classList.remove('pause');
    }

    // Button Enables
    buttonDisable(buttonKick)
    buttonEnable(buttonBreak)
    buttonEnable(buttonPause)
}
  
    buttonStop.onclick = function() {
        if(stopTgl==0){
            clearInterval(IntervalP);
            stopTgl = 1;
            buttonDisable(buttonPause)
            buttonStop.classList.add('toggle');
            clockPlay.classList.add('pause');
        } else {
            IntervalP = setInterval(startPlay, 1000);
            stopTgl = 0;
            buttonEnable(buttonPause)
            buttonStop.classList.remove('toggle');
            clockPlay.classList.remove('pause');
        }

        // Button Enables
        buttonDisable(buttonKick)
        buttonEnable(buttonBreak)
        buttonEnable(buttonStop)
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

  function buttonDisable(button) {
      button.disabled = true;
      button.classList.add('disabled');
  }
  function buttonEnable(button) {
    button.disabled = false;
    button.classList.remove('disabled');
}
}