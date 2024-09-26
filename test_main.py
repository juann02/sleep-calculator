#test_main.py
from main import calculate_alarm_time

def test_calculate_alarm_time():
    result = calculate_alarm_time(15)
    assert "current_time" in result
    assert "alarm_time" in result
    assert isinstance(result[alarm_time], str)
    
if __name__ == "__main__":
    test_calculate_alarm_time
    print("Passed")