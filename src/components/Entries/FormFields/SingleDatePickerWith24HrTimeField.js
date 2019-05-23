import React, { Component } from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

class SingleDatePickerField extends Component {
  state = {
    date: this.props.date ? moment(this.props.date) : moment(),
    time: this.props.date
      ? moment(this.props.date).format("H:mm")
      : moment().format("H:mm"),
    calendarFocused: false,
    error_time: null
  };

  onDateChange = date => {
    const newTimeArray = this.state.time.split(":");
    const newMinutes = parseInt(newTimeArray[1]);
    let newHour = parseInt(newTimeArray[0]);
    let newDate =
      date.valueOf() && Number.isInteger(date.valueOf())
        ? date
        : this.state.date;

    newDate = newDate.hour(newHour).minute(newMinutes);

    const hourFormats = ["HH", "H", "hh", "h"];
    const minuteFormats = ["mm", "m"];
    if (
      moment(newHour, hourFormats, true).isValid() &&
      moment(newMinutes, minuteFormats, true).isValid()
    ) {
      this.setState(() => ({ date: newDate, error_time: null }));
      this.props.onChange(newDate.valueOf(), this.props.name);
    } else {
      this.setState(() => ({ error_time: "The entered time is not valid." }));
    }
  };
  onTimeChange = e => {
    const time = e.target.value;

    this.setState(() => ({
      time
    }));
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({
      calendarFocused: focused
    }));
  };

  render() {
    const { date, time, amPm, calendarFocused, error_time } = this.state;
    return (
      <div>
        <SingleDatePicker
          date={date}
          onDateChange={this.onDateChange}
          focused={calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={day => false}
        />
        <label className="label" htmlFor="timeField">
          Time
        </label>
        <input
          id="timeField"
          type="text"
          className="text-input"
          value={time}
          onChange={this.onTimeChange}
          onBlur={this.onDateChange}
        />
        {error_time && <p className="form__error">{error_time}</p>}
      </div>
    );
  }
}

export default SingleDatePickerField;
