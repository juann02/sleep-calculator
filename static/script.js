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

            if (!toggle.checked) { // 12-hour format
                suffix = hours >= 12 ? ' PM' : ' AM';
                hours = hours % 12 || 12;
            }

            currentTimeDisplay.textContent = 'Current time: ' + hours + ':' + minutes + suffix;
        }
    }

    //event listener for toggle change
    if (toggle) {
        toggle.addEventListener('change', function() {
            updateCurrentTime(); // Update current time display
            localStorage.setItem('timeFormatToggle', toggle.checked); // Save toggle state
        });
    }

    // update time every minute
    if (currentTimeDisplay) {
        setInterval(updateCurrentTime, 60000); // Update every minute
        updateCurrentTime(); // Initial call to display current time
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

    // restore toggle state on load and update the display
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

    // update the result time format
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
            updateResultTime(); // Update result time display
            localStorage.setItem('timeFormatToggle', toggle.checked); // Save toggle state
        });
    }

    // initialize result time on `result.html`
    if (currentTimeElement && alarmTimeElement) {
        updateResultTime(); // initial call to update result time
    }
}); 