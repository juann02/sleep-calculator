import datetime as dt
from datetime import datetime, timedelta

def get_sleep_time():
    """
    Determines what time the user should wake up to get an appropriate amount
    of sleep. 
    """
    time_now = dt.datetime.now()
    current_time = time_now.strftime("%H:%M")

    sleep_cycle = 90 # minutes

    time_to_fall_asleep = 15 # minutes

    # Using the optimal cycle time, aim for 5-6 sleep cycles.
    print("On average, how long does it take you to fall asleep? (press enter for the average time of 15 minutes)")
    sample_input = input("Time to fall asleep (default 15 mins): ")
    if sample_input:
        time_to_fall_asleep = int(sample_input)
        
    alarm_time = time_now + dt.timedelta(minutes=(time_to_fall_asleep + 5 * sleep_cycle))

    alarm_time_string = alarm_time.strftime("%H:%M")

    print(f"If you were to go to bed right now you should wake up in about 7.5 or 9 hours to feel well rested! (That's 5-6 sleep cycles, since the human sleep cycle is 1.5 hours long)")

    print(f"It is now {current_time}, and given that it takes you about {time_to_fall_asleep} minutes to fall asleep, you should set your alarm for {alarm_time_string}")

def get_wake_up_time():
    """
    Determines the appropriate time that the user should sleep in order to
    wake up at the end of a sleep cycle, as close to the desired time. 
    """
    time_now = dt.datetime.now()
    current_time = time_now.strftime("%H:%M")

    sleep_cycle = 90 # minutes

    time_to_fall_asleep = 15 # minutes

    print("What time would you like to wake up? (00:00 format)")
    # wake_up = input("Wake-up time: ")
    wake_up = "08:00"
    print("Default wake up time is", wake_up)
    wake_up = wake_up.split(":")

    # Using the optimal cycle time, aim for 5-6 sleep cycles.
    print("On average, how long does it take you to fall asleep? (press enter for the average time of 15 minutes)")
    # sample_input = input("Time to fall asleep (default 15 mins): ")
    # if sample_input:
        # time_to_fall_asleep = int(sample_input)
    print(f"Default sleep time is {time_to_fall_asleep}")
    #* This currently determines the alarm time based on the current time
    # alarm_time = time_now + timedelta(minutes=(time_to_fall_asleep + 5 * sleep_cycle))

    #* We would like to determine the sleep time based on the desired alarm time
    #* and a "full night's sleep" (5 sleep cycles)
    #* Start with the "wake up time", and subtract 5 sleep cycles

    date_time_combine = datetime.combine(dt.date.min, dt.time(int(wake_up[0]), int(wake_up[1]))) - dt.datetime.min

    sleep_time = date_time_combine - dt.timedelta(minutes=(time_to_fall_asleep + 5 * sleep_cycle))

    # TODO: correct the 'correction' to account for bedtime before and after midnight.
    # bedtime = sleep_time.strftime("%H:%M")
    correction = dt.datetime(2024, 4, 3, 0, 0, 0, 0) + sleep_time
    bedtime = correction.strftime("%H:%M")

    # print(f"If you were to go to bed right now you should wake up in about 7.5 or 9 hours to feel well rested! (That's 5-6 sleep cycles, since the human sleep cycle is 1.5 hours long)")

    print(f"If you would like to wake up at {wake_up[0]}:{wake_up[1]}, you should head to bed at {bedtime} to get a full night's sleep")

# get_sleep_time()
get_wake_up_time()