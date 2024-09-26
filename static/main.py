from datetime import datetime, timedelta
import pytz #clock was reading wrong current time!

def calculate_alarm_time(time_to_fall_asleep=15):
    try:
        time_to_fall_asleep = int(time_to_fall_asleep)
    except ValueError:
        raise TypeError("time_to_fall_asleep #")
        
    time_zone = pytz.timezone('America/New_York') #added timezone
    time_now = datetime.now(time_zone)
    current_time = time_now.strftime("%H:%M")

    sleep_cycle = 90 # minutes 
    alarm_time = time_now + timedelta(minutes=(time_to_fall_asleep + 5 * sleep_cycle))
    alarm_time_string = alarm_time.strftime("%H:%M")
    
    return {
        "current_time": current_time,
        "time_to_fall_asleep": time_to_fall_asleep,
        "alarm_time": alarm_time_string
    }

   # print(f"If you were to go to bed right now you should wake up in about 7.5 or 9 hours to feel well rested! (That's 5-6 sleep cycles, since the human sleep cycle is 1.5 hours long)")

   # print(f"It is now {current_time}, and given that it takes you about {time_to_fall_asleep} minutes to fall asleep, you should set your alarm for {alarm_time_string}")
