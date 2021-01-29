import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MixCalendar } from 'cx-ui-components';
import moment from 'moment';

import { memoizedRulesHandler } from './eventListHelper';

export default class CalendarEvents extends Component {
  constructor(props) {
    super();
    this.state = {
      calendarDateRange: {
        start: moment()
          .startOf('month')
          .startOf('week')
          .toString(),
        end: moment()
          .endOf('month')
          .endOf('week')
          .toString(),
      },
    };
  }

  eventListGenerator = memoizedRulesHandler();

  updateCalendarDateRange = ({ dateRange }) => {
    this.setState({
      calendarDateRange: dateRange,
    });
  };

  render() {
    const events = this.eventListGenerator(this.props.rules, this.state.calendarDateRange);
    return (
      <MixCalendar
        eventList={events}
        eventType={this.props.eventType}
        onChange={(e) => this.updateCalendarDateRange(e)}
      />
    );
  }
}

CalendarEvents.propTypes = {
  eventType: PropTypes.array,
  rules: PropTypes.array,
};
