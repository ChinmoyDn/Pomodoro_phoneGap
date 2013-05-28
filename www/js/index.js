/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        console.log('inside initalize');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //the following line is commented for testing in the pc browser
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        console.log('inside bind events');
       //line added for testing in the pc browser
       app.receivedEvent('deviceready');
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log('inside ondevice ready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        app.initUi();

    },
    
    activityName : null,
    minutes      : 0,
    hours        : 0,
    
   //function to check any field for numbers
   validate: function (elemntId) {
        var a = document.getElementById(elemntId).value;
        var filter = /^[0-9]+$/;
        if (filter.test(a)) {
            return true;
        } else {
            return false;
        }
    },

    //function to validate the hours and minutes fields and initialize the variables
   intiFeilds: function(){
       var flag = true;
       if(!document.getElementById("activityName").value){
               alert("please enter Activity name");
               return false;
           }
        if(!document.getElementById("hours").value) //if hours field is empty set it to zero
                document.getElementById("hours").value = 0;
            if(!document.getElementById("minutes").value)
                document.getElementById("minutes").value = 0;
            if(document.getElementById("hours").value == 0 && document.getElementById("minutes").value == 0 ){
                    flag = false;
                    alert("Minute and hour fields cannot be zero");
             }
            if(!app.validate("hours") || !app.validate("minutes") || flag    == false) {
                //if validation is ok then set flag to true
                flag = false;
                alert("Please enter a valid time");
            }else{
                app.activityName = document.getElementById("activityName").value;
                app.hours = document.getElementById("hours").value;
                app.minutes = document.getElementById("minutes").value;
            }
            return flag;
   },
   
   initUi: function () {
        console.log('initializing ui');
        jQuery(document).ready(function() {
            var validFlag = true; //flag set true on validating the hours and minutes fields
            jQuery("#dia1").show();
            jQuery("#createBut").bind("click", function(event, ui) {
        	//validate fields and initialize the variables
                if(app.intiFeilds() == true){
                    var toatal_minutes = (app.hours * 60) + app.minutes;
                    console.log(pomodoro.setTimer(app.minutes));
                    jQuery("#dia1").hide();
                    jQuery("#dialog1").show();
                    //on clicking start button show next screen
                    jQuery("#startBut").bind("click", function(event, ui) {
                        jQuery("#dialog1").hide();
                        jQuery("#dialog2").show();
                        jQuery("#popupDialog").popup();
                        //alert(document.getElementById("minutes").value);
                        //on tap show the popup
                        jQuery("#dialog2").click(function() {
                            jQuery("#popupDialog").popup('open');
                            jQuery(".exitBut").bind("click", function(event, ui) {
                                jQuery("#popupDialog").popup('close');
                                jQuery("#dialog2").hide();
                                //reset the values
                                document.getElementById("minutes").value = null;
                                document.getElementById("hours").value = null;
                                jQuery("#startBut").unbind();
                                jQuery("#dia1").show();
                            })
                        });
                    });
                }
            });
        });
    },
};


