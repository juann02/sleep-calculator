from datetime import datetime, timedelta

def get_sleep_time():
    time_now = datetime.now()
    current_time = time_now.strftime("%H:%M")

    sleep_cycle = 90 # minutes

    time_to_fall_asleep = 15 # minutes

    # Using the optimal cycle time, aim for 5-6 sleep cycles.
    print("On average, how long does it take you to fall asleep? (press enter for the average time of 15 minutes)")
    sample_input = input("Time to fall asleep (default 15 mins): ")
    if sample_input:
        time_to_fall_asleep = int(sample_input)
        
    alarm_time = time_now + timedelta(minutes=(time_to_fall_asleep + 5 * sleep_cycle))

    alarm_time_string = alarm_time.strftime("%H:%M")

    print(f"If you were to go to bed right now you should wake up in about 7.5 or 9 hours to feel well rested! (That's 5-6 sleep cycles, since the human sleep cycle is 1.5 hours long)")

    print(f"It is now {current_time}, and given that it takes you about {time_to_fall_asleep} minutes to fall asleep, you should set your alarm for {alarm_time_string}")

get_sleep_time()