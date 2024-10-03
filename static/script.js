// index.html 
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('sleepForm');
    var input = document.getElementById('time_to_fall_asleep');
    var errorMessage = document.getElementById('error-message');
    var toggle = document.getElementById('time-format-toggle');
    var currentTimeDisplay = document.getElementById('current-time');
    
    // restore toggle state from localStorage
    if (toggle) {
        const savedToggleState = localStorage.getItem('timeFormatToggle') === 'true';
        toggle.checked = savedToggleState;
    }

    // initialize current time (local) WORK 
    function updateCurrentTime() {
        if (currentTimeDisplay) {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes().toString().padStart(2, '0');
            var suffix = '';

            if (!toggle.checked) { // 12-hour format
                suffix = hours >= 12 ? ' PM' : ' AM';
                hours = hours % 12 || 12;
                currentTimeDisplay.textContent = 'Current time: ' + hours + ':' + minutes + suffix;
            } else { // 24-hour format
                hours = hours.toString().padStart(2, '0');
                currentTimeDisplay.textContent = 'Current time: ' + hours + ':' + minutes;
            }
        }
    }

    // event listener for toggle change
    if (toggle) {
        toggle.addEventListener('change', function() {
            updateCurrentTime();
            localStorage.setItem('timeFormatToggle', toggle.checked);
        });
    }

    // update current time every minute
    if (currentTimeDisplay) {
        setInterval(updateCurrentTime, 60000);
        updateCurrentTime(); // Initial call
    }

    // form validation
    if (form) {
        form.addEventListener('submit', function(event) {
            var timeInput = parseInt(input.value, 10);
            if (isNaN(timeInput) || timeInput < 1 || timeInput > 120) {
                event.preventDefault();
                errorMessage.style.display = 'block';
                input.classList.add('input-error');
            } else {
                errorMessage.style.display = 'none';
                input.classList.remove('input-error');
            }
        });
    }
});

// result.html 
document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('time-format-toggle');
    var currentTimeElement = document.getElementById('currentTime');
    var alarmTimeElement = document.getElementById('alarmTime');
    var is24HourFormat = localStorage.getItem('timeFormatToggle') === 'true';

    // restore toggle state on loading and update the display
    if (toggle) {
        toggle.checked = is24HourFormat;
    }

    // 12-hour to 24-hour conversion
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

    // 24-hour to 12-hour conversion
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

    // update result time with toggle
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
            updateResultTime();
            localStorage.setItem('timeFormatToggle', toggle.checked);
        });
    }

    // initialize result time please
    if (currentTimeElement && alarmTimeElement) {
        updateResultTime();
    }
});

// Stars! (Starry background effect) 
document.addEventListener('DOMContentLoaded', function() {
    const starContainer = document.createElement('div');
    starContainer.classList.add('stars-background');
    document.body.appendChild(starContainer);

    const starCount = 222;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        star.style.top = Math.random() * 100 + 'vh'; // random vertical position
        star.style.left = Math.random() * 100 + 'vw'; // random horizontal position
        star.style.animationDuration = 1.2 + Math.random() * 1.5 + 's'; // random flicker effect

        starContainer.appendChild(star); // append star to container
    }
});

// IF I EVER SEE ANOTHER LINE OF JS IT WILL BE TOO SOON