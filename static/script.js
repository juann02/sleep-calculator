//index.html

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('sleepForm');
    var input = document.getElementById('time_to_fall_asleep');
    var errorMessage = document.getElementById('error-message');
    var toggle = document.getElementById('time-format-toggle');
    var currentTimeDisplay = document.getElementById('current-time');
    var currentTimeElement = document.getElementById('currentTime');
    var alarmTimeElement = document.getElementById('alarmTime');
    var is24HourFormat = localStorage.getItem('timeFormatToggle') === 'true';

    // restore toggle state
    if (toggle) {
        toggle.checked = is24HourFormat;
    }

    function updateCurrentTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var formattedTime = '';

        if (!toggle.checked) { 
            var period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // convert to 12-hour format, ensure hour 0 becomes 12
            formattedTime = hours + ':' + minutes + ' ' + period;
        } else { // if 24-hour format
            hours = hours.toString().padStart(2, '0'); //pad hours with leading zero if needed
            formattedTime = hours + ':' + minutes;
        }

        if (currentTimeDisplay) {
            currentTimeDisplay.textContent = 'Current time: ' + formattedTime;
        }

        if (currentTimeElement) {
            currentTimeElement.textContent = formattedTime;
        }
    }

    // event listener for toggle change
    if (toggle) {
        toggle.addEventListener('change', function() {
            updateCurrentTime(); // updates current time display
            updateResultTime(); // updates result page if applicable
            localStorage.setItem('timeFormatToggle', toggle.checked); // save toggle state
        });
    }

    // update time every minute
    setInterval(updateCurrentTime, 60000);
    updateCurrentTime(); // initial call to display current time

    // form validation
    if (form) {
        form.addEventListener('submit', function(event) {
            var timeInput = parseInt(input.value, 10);
            if (isNaN(timeInput) || timeInput < 1 || timeInput > 120) {
                event.preventDefault(); // prevent form submission
                errorMessage.style.display = 'block'; // show error message
                input.classList.add('input-error'); // add red border
            } else {
                errorMessage.style.display = 'none'; // hide error message
                input.classList.remove('input-error'); // remove red border
            }
        });
    }

    //updates the result time format with toggle
    function updateResultTime() {
        if (currentTimeElement && alarmTimeElement) {
            var originalCurrentTime = currentTimeElement.getAttribute('data-original-time');
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

    //12-24
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

    //24-12
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

    if (currentTimeElement && alarmTimeElement) {
        updateResultTime();
    }
});

//results page

document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('time-format-toggle');
    var currentTimeElement = document.getElementById('currentTime');
    var alarmTimeElement = document.getElementById('alarmTime');
    var is24HourFormat = localStorage.getItem('timeFormatToggle') === 'true';

    //restore toggle state on loading and update the display
    if (toggle) {
        toggle.checked = is24HourFormat;
    }

    //12-24
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

    //24-12
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

    // update the result time format with toggle
    function updateResultTime() {
        if (currentTimeElement && alarmTimeElement) {
            var originalCurrentTime = currentTimeElement.getAttribute('data-original-time');
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
            localStorage.setItem('timeFormatToggle', toggle.checked); // save toggle
        });
    }

    //initialize result time
    if (currentTimeElement && alarmTimeElement) {
        updateResultTime();
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

        star.style.top = Math.random() * 100 + 'vh'; //random position on the screen
        star.style.left = Math.random() * 100 + 'vw';

        star.style.animationDuration = 1.2 + Math.random() * 1.5 + 's'; // random flicker

        starContainer.appendChild(star); //append star to container
    }
});