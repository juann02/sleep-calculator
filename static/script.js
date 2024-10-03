//index.html

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('sleepForm');
    var input = document.getElementById('time_to_fall_asleep');
    var errorMessage = document.getElementById('error-message');
    var toggle = document.getElementById('time-format-toggle');
    var currentTimeDisplay = document.getElementById('current-time');
    

    //restore toggle state 
    if (toggle) {
        const savedToggleState = localStorage.getItem('timeFormatToggle') === 'true';
        toggle.checked = savedToggleState;
    }

    //initialize current time
    function updateCurrentTime() {
        if (currentTimeDisplay) {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes().toString().padStart(2, '0');
            var suffix = '';

            if (!toggle.checked) { // If not 24-hour format (i.e., 12-hour format)
                var suffix = hours >= 12 ? ' PM' : ' AM';
                hours = hours % 12 || 12;
                currentTimeDisplay.textContent = 'Current time: ' + hours + ':' + minutes + suffix;
            } else { // 24-hour format
                hours = hours.toString().padStart(2, '0'); //pad hours with leading zero if needed
                currentTimeDisplay.textContent = 'Current time: ' + hours + ':' + minutes;
            }
        }
            //currentTimeDisplay.textContent = 'Current time: ' + hours + ':' + minutes + suffix;
    }
    

    //event listener for toggle change
    if (toggle) {
        toggle.addEventListener('change', function() {
            updateCurrentTime(); //updates current time display in front page
            localStorage.setItem('timeFormatToggle', toggle.checked); //save toggle state
        });
    }

    // update time every minute
    if (currentTimeDisplay) {
        setInterval(updateCurrentTime, 60000);
        updateCurrentTime(); //initial call to display current time
    }

    // form validation
    if (form) {
        form.addEventListener('submit', function(event) {
            var timeInput = parseInt(input.value, 10);
            if (isNaN(timeInput) || timeInput < 1 || timeInput > 120) {
                event.preventDefault(); //prevent form submission
                errorMessage.style.display = 'block'; //show cute lil error message
                input.classList.add('input-error'); // add red border
            } else {
                errorMessage.style.display = 'none'; // hide error message
                input.classList.remove('input-error'); // remove red border
            }
        });
    }
});


//results page

document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('time-format-toggle');
    var currentTimeElement = document.getElementById('currentTime');
    var alarmTimeElement = document.getElementById('alarmTime');
    var is24HourFormat = localStorage.getItem('timeFormatToggle') === 'true';

    // restore toggle state on loading and update the display
    if (toggle) {
        toggle.checked = is24HourFormat;
    }

    //24 to 12
    function convertTo12Hour(timeString) {
        var parts = timeString.split(":");
        var hour = parseInt(parts[0]);
        var minute = parts[1];
        var period = "AM";

        if (hour >= 12) {
            period = "PM";
            if (hour > 12) {
                hour -= 12;
            }
        } else if (hour === 0) {
            hour = 12;
        }

        return hour + ":" + minute + " " + period;
    }

    //convert 12 to 24
    function convertTo24Hour(timeString) {
        var parts = timeString.split(":");
        var hour = parseInt(parts[0]);
        var minute = parts[1];

        if (timeString.includes("PM") && hour !== 12) {
            hour += 12;
        } else if (timeString.includes("AM") && hour === 12) {
            hour = 0;
        }

        return hour.toString().padStart(2, '0') + ":" + minute;
    }

    // update the result time format with toggle :3 no need 4 button
    function updateResultTime() {
        if (currentTimeElement && alarmTimeElement) {
            var originalCurrentTime= currentTimeElement.getAttribute('data-original-time');
            var originalAlarmTime = alarmTimeElement.getAttribute('data-original-time');

            if (toggle.checked) {
                currentTimeElement.innerHTML = convertTo24Hour(originalCurrentTime);
                alarmTimeElement.innerHTML = convertTo24Hour(originalAlarmTime);
            } else {
                currentTimeElement.innerHTML = convertTo12Hour(originalCurrentTime);
                alarmTimeElement.innerHTML = convertTo12Hour(originalAlarmTime);
            }
        }
    }

    // event listener for toggle change
    if (toggle) {
        toggle.addEventListener('change', function() {
            updateResultTime(); //update result time display
            localStorage.setItem('timeFormatToggle', toggle.checked); //saves toggle
        });
    }

    // initialize result time
    if (currentTimeElement && alarmTimeElement) {
        updateResultTime(); // initial call to update result time
    }
}); 

//stars! i love this part

document.addEventListener('DOMContentLoaded', function() {
    const starContainer = document.createElement('div');
    starContainer.classList.add('stars-background');
    document.body.appendChild(starContainer);

    const starCount = 222;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        star.style.top = Math.random() * 100 + 'vh'; //random position on le screen
        star.style.left = Math.random() * 100 + 'vw';

        star.style.animationDuration = 1.2 + Math.random() * 1.5 + 's'; //random flicker

        starContainer.appendChild(star); //append star 2 container
    }
});