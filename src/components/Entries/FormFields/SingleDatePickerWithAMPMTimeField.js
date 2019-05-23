import React, { Component } from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

class SingleDatePickerField extends Component {
  state = {
    date: this.props.date ? moment(this.props.date) : moment(),
    time: this.props.date
      ? moment(this.props.date).format("h:mm")
      : moment().format("h:mm"),
    amPm: this.props.date
      ? moment(this.props.date).format("A")
      : moment().format("A"),
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

    if (this.state.amPm === "PM") {
      newHour = newHour + 12;
    }
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
  onAmPmChange = e => {
    const amPm = e.target.value;

    this.setState(() => ({ amPm }));
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
        <label className="label" htmlFor="amPmField">
          AM/PM
        </label>
        <select
          id="amPmField"
          className="select"
          value={amPm}
          onChange={this.onAmPmChange}
          onBlur={this.onDateChange}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    );
  }
}

export default SingleDatePickerField;
