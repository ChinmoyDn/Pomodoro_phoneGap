var pomodoro = (function(pomodoro) {

    var tickCounter = 0,
    	sec = 5,
    	interval = 0,
        pomodoroTimeLimit = 5, //time period for each pomodoro
        sBreakTimeLimit = 1, //time period for short breaks
        lBreakTimeLimit = 3; //time period for long breaks
    
    /*Object.defineProperties(pomodoro, {
	sec : {
	    get : function(){
		return sec;
	    },
	    set : function(totalSec){
		
	    }
	}
    });*/

    var pomodoroObj = {
        pomodoroCounter : 0, //counts number of pomodoros completed
        sBreaks : 0, //counts number of short breaks completed
        lBreaks : 0, //counts number of long breaks completed
        pomodoroTick : 0, //timer for pomodoro
        sBreakTick : 0, //timer for small breaks
        lBreakTick : 0, //timer for long breaks
        stage : "pomodoro", // values = pomodoro / break
        breakStage : "short" // values = long / short
    };

    //function to set the timer for the pomodoro activity
    pomodoro.setTimer = function(minutes) {//later on add activityName as another parameter
	pomodoro.sec = minutes*60;//to be converted to seconds
        console.log("in Pomodoro seconds: "+ pomodoro.sec);
        this.calucatePomodoros();
        return this;
    };
    
    pomodoro.calucatePomodoros = function(){
	var s = pomodoro.sec , ticks = 0, shCount = 1,  pCounter = 0, lCount = 0, sh = 0;
	console.log("Sec: " + sec);
	console.log("pomodoroTimeLimit: " + pomodoroTimeLimit);
	console.log("sBreakTimeLimit: " + sBreakTimeLimit);
	console.log("lBreakTimeLimit" + lBreakTimeLimit);
	while(ticks<s){
	    ticks = ticks + pomodoroTimeLimit;
	    pCounter++;
	    //ticks++;
	    if(shCount<3){
		ticks = ticks + sBreakTimeLimit; 
		sh++;
    	    	shCount++;
	    }else{
		ticks = ticks + lBreakTimeLimit;
		lCount++;
		shCount = 1;
	    }
	    if(ticks + pomodoroTimeLimit > s)
		break;
	}		
	console.log("Time in seconds: " + s);
	console.log("Total Pomodors: " + pCounter);
	console.log("Toatal Short Breaks: " + sh);
	console.log("Total Long breaks" + lCount);
    }

    pomodoro.resetTimer = function() {
        console.log('*******timer reset**********');
        tickCounter = 0;
        pomodoroObj.pomodoroCounter = 0;
        pomodoroObj.sBreaks = 0;
        pomodoroObj.lBreaks = 0;
        pomodoroObj.pomodoroTick = 0;
        pomodoroObj.sBreakTick = 0;
        pomodoroObj.lBreakTick = 0;
        pomodoroObj.stage = "pomodoro";
        pomodoroObj.breakStage = "short";
    }

    pomodoroObj.start = function() {
        if (this.stage === "pomodoro") {
            // check for pomodoro timer
            if (this.pomodoroTick >= pomodoroTimeLimit) {
                // pomodoro is complete so reset pomodoro timer
                this.pomodoroTick = 0;
                this.stage = 'break';
                this.pomodoroCounter++; // increment the number of pomodoros
                console.log("Pomodoros completed: " + this.pomodoroCounter);
            } else {
                this.pomodoroTick++; // increment the pomodoro counter
                console.log("pomodoro Tick: " + this.pomodoroTick);
            }
        } else if (this.breakStage === "long") {
        // check for long break counter
            if (this.lBreakTick >= lBreakTimeLimit) {
                // long break is completed reset the long break timer
                this.lBreakTick = 0;
                this.stage = "pomodoro";
                this.breakStage = "short"; // next break would be a short break
                this.lBreaks++; // increment the number of long breaks
                console.log("long breaks completed: " + this.lBreaks);
            } else {
                this.lBreakTick++;
                console.log("long BreakTick: " + this.lBreakTick);
            }
        } else {
            // check for short break counter
            if (this.sBreakTick >= sBreakTimeLimit) {
                // short break is completed reset the long break timer
                this.sBreakTick = 0;
                this.stage = "pomodoro";
                this.sBreaks++; // increment the number of long breaks
                console.log("short breaks completed: " + this.sBreaks);
                if (this.sBreaks % 3 === 0) {
                    // 3 short breaks are complete next break would be a long break
                    this.breakStage = "long";
                }
            } else {
                this.sBreakTick++;
                console.log("short BreakTick: " + this.sBreakTick);
            }
        }
    };

    /*
     *Timer function executing after every 1 second
     */
    pomodoro.tick = function() {
    //console.log("this.sec: " + sec + " this.tickCounter: " + tickCounter);
        if (tickCounter < sec) {
            tickCounter++;
            console.log('Time in seconds: ' + tickCounter);
            if (tickCounter < sec) {
                pomodoroObj.start();
                interval = setTimeout('pomodoro.tick()', 1000); // might be a memory problem coz of calling pomodoro everytime
            } else {
                this.resetTimer();
            }
        }
    //console.log('Time in seconds: ' + tickCounter);
    };

    return pomodoro;
}(pomodoro || {}));


