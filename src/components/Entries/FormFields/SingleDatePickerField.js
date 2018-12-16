import React, { Component } from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

class SingleDatePickerField extends Component {
  state = {
    date: this.props.date ? moment(this.props.date) : moment(),
    calendarFocused: false
  };

  onDateChange = date => {
    if (date) {
      this.setState(() => ({ date }));
    }

    this.props.onChange(date.valueOf(), this.props.name);
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({
      calendarFocused: focused
    }));
  };

  render() {
    const { date, calendarFocused } = this.state;
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
      </div>
    );
  }
}

export default SingleDatePickerField;
