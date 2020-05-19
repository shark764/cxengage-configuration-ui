import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import SidePanelHeaderContainer from '../SidePanelHeader';
import BusinessHoursV2 from '../../../Form/BusinessHoursV2';
import UpdateBusinessHoursV2Form from '../../../Form/BusinessHoursV2/Update';
import SidePanelActionsContainer from '../../../../containers/SidePanelActions';
import { MixCalendar, DetailHeader, SidePanelTable } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import { detailHeaderText } from '../../../../utils';
import moment from 'moment';

const SidePanelHeader = styled(SidePanelHeaderContainer)`
  width: 75%;
`;

const HeaderContainer = styled.div`
  min-height: 86px;
  padding: 10px 14px 16px;
`;

const SidePanelActions = styled(SidePanelActionsContainer)`
  width: 25%;
  float: right;
`;

const FieldsColumn = styled.div`
  padding: 10px 14px;
  width: 30%;
  margin-rigth: 35px;
`;

const CalendarColumn = styled.div`
  width: 65%;
`;

const VersionsColumn = styled.div`
  width: 95%;
  margin-left: 50px;
`;

const RowWrapper = styled.div`
  width: 100%;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 55px;
  color: #2e9afe;
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const eventType = [
  {
    id: 0,
    state: true,
    name: 'Regular Hours',
    color: '#51CE90'
  },
  {
    id: 1,
    state: true,
    name: 'One-Time extended Hours',
    color: '#F1D29D'
  },
  {
    id: 2,
    state: true,
    name: 'Blackout Exceptions',
    color: '#F08695'
  },
  {
    id: 3,
    state: true,
    name: 'Blackout One-Time Exceptions',
    color: '#8383FD'
  }
];

const versionsEntitiyTableHeaders = [
  {
    type: 'string',
    name: 'version',
    label: 'Version',
    required: true
  },
  {
    type: 'string',
    name: 'name',
    label: 'Name',
    required: true
  },
  {
    type: 'string',
    name: 'createdBy',
    label: 'Created By',
    required: true
  },
  {
    type: 'string',
    name: 'createdOn',
    label: 'Created On',
    required: true
  }
];

const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const ordinalKeywords = ['first', 'second', 'third', 'fourth', 'last'];

export default class BusinessHoursV2UpdateFullPage extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedEvents: []
    };
    this.calendarDateRange = {};
    this.calendarEvents;
    this.formattedEvents = [];
  }

  componentWillUnmount() {
    this.props.setSelectedBusinessHourVersion(this.props.activeVersion);
  }

  updateCalendarDateRange = calendar => {
    if (this.calendarDateRange === calendar.dateRange) {
      return;
    }
    this.calendarDateRange = calendar.dateRange;
    if (this.calendarEvents === undefined) {
      this.handleRuleVersions();
    } else {
      this.handleCalendarEvents();
    }
  };

  handleCalendarEvents = () => {
    this.formattedEvents = []; // Empty each time it receives calendar events
    this.calendarEvents.map(calendarEvent => {
      // Getting time of calendarEventEndDate so we can set it to calendar component end date
      const calendarEventEndDate = moment(calendarEvent.end),
        calendarEventEndDateHour = calendarEventEndDate.get('hour'),
        calendarEventEndDateMinutes = calendarEventEndDate.get('minute'),
        calendarEventEndDateSeconds = calendarEventEndDate.get('second');

      // Setting same time of calendarEventEndDate to calendar component end date
      const calendarEndDate = moment(this.calendarDateRange.end)
        .set({
          hour: calendarEventEndDateHour,
          minute: calendarEventEndDateMinutes,
          second: calendarEventEndDateSeconds
        })
        .toDate();

      // Getting time of calendarEventStartDate so we can set it to calendar component start date
      const calendarEventStartDate = moment(calendarEvent.start),
        calendarEventStartDateHour = calendarEventStartDate.get('hour'),
        calendarEventStartDateMinutes = calendarEventStartDate.get('minute'),
        calendarEventStartDateSeconds = calendarEventStartDate.get('second');

      const eventStartDate = new Date(calendarEvent.start);
      // set calendarEventEndDate if rule finish after calendar end date visible range
      const eventEndDate = new Date(
        calendarEventEndDate.isSameOrAfter(calendarEndDate) ? calendarEvent.end : calendarEndDate
      );

      switch (calendarEvent.repeats) {
        case 'daily':
          // create array to hold result dates
          let dailyEvents = [],
            dailyRecurringEvents = [],
            start = eventStartDate,
            end = start;
          // Pushing the first events as initial value
          dailyEvents.push({
            start: eventStartDate,
            end: moment(eventStartDate)
              .set({
                hour: calendarEventEndDateHour,
                minute: calendarEventEndDateMinutes,
                second: calendarEventEndDateSeconds
              })
              .toDate()
          });
          // add recurring events until rule end date or calendar visible end date is reached up
          if (calendarEvent.type === 'recurring-hours' || calendarEvent.type === 'blackout-recurring-exceptions') {
            while ((start = this.addDays(start, calendarEvent.every)) <= eventEndDate) {
              end = moment(start)
                .set({
                  // finish same day, with specific endDate hour
                  hour: calendarEventEndDateHour,
                  minute: calendarEventEndDateMinutes,
                  second: calendarEventEndDateSeconds
                })
                .toDate();
              dailyRecurringEvents.push({
                start,
                end
              });
            }
          }
          const dailyCalendarEvents = dailyEvents
            .concat(dailyRecurringEvents)
            .filter(dailyEvent =>
              moment(dailyEvent.start).isBetween(this.calendarDateRange.start, this.calendarDateRange.end, null, '[]')
            )
            .map(dailyEvent => {
              return {
                id: calendarEvent.title,
                title: calendarEvent.title,
                allDay: calendarEvent.allDay,
                start: dailyEvent.start,
                end: dailyEvent.end,
                eventTypeID: calendarEvent.eventTypeID
              };
            });
          this.formattedEvents = this.formattedEvents.concat(dailyCalendarEvents);
          break;
        case 'weekly':
          const daysOfTheWeek = calendarEvent.on;
          let weeklyEvents = [],
            weeklyRecurringEvents = [];
          // Setting time to selected week days and pushing them in first week as initial values
          for (let i = 0; i < daysOfTheWeek.length; i++) {
            const weekDay = moment(eventStartDate).day(daysOfTheWeek[i]);
            weeklyEvents.push({
              start: weekDay.toDate(),
              end: moment(weekDay)
                .set({
                  hour: calendarEventEndDateHour,
                  minute: calendarEventEndDateMinutes,
                  second: calendarEventEndDateSeconds
                })
                .toDate()
            });
          }
          // Fill recurring data with initial week days with 'every' param from rule
          if (calendarEvent.type === 'recurring-hours' || calendarEvent.type === 'blackout-recurring-exceptions') {
            for (let i = 0; i < weeklyEvents.length; i++) {
              let weeklyCurrentDate = moment(weeklyEvents[i].start).add(calendarEvent.every, 'week');
              while (weeklyCurrentDate <= eventEndDate) {
                weeklyRecurringEvents.push({
                  start: weeklyCurrentDate.toDate(),
                  end: moment(weeklyCurrentDate)
                    .set({
                      hour: calendarEventEndDateHour,
                      minute: calendarEventEndDateMinutes,
                      second: calendarEventEndDateSeconds
                    })
                    .toDate()
                });
                weeklyCurrentDate = moment(weeklyCurrentDate).add(calendarEvent.every, 'week');
              }
            }
          }
          const weeklyCalendarEvents = weeklyEvents
            .concat(weeklyRecurringEvents)
            .filter(weeklyEvent =>
              moment(weeklyEvent.start).isBetween(this.calendarDateRange.start, this.calendarDateRange.end, null, '[]')
            )
            .map(weeklyEvent => {
              return {
                id: calendarEvent.title,
                title: calendarEvent.title,
                allDay: calendarEvent.allDay,
                start: weeklyEvent.start,
                end: weeklyEvent.end,
                eventTypeID: calendarEvent.eventTypeID
              };
            });
          this.formattedEvents = this.formattedEvents.concat(weeklyCalendarEvents);
          break;
        case 'monthly':
        case 'yearly':
          const startDate = moment(eventStartDate),
            startOfMonth = moment(eventStartDate).startOf('month'), // Current month based on rule start date
            endOfYear = moment(eventEndDate).endOf('year'),
            calendarViewYear = moment(endOfYear),
            initialYear = moment(startDate),
            diffYears = calendarViewYear.diff(initialYear, 'years');
          let monthlyEvents = [],
            monthlyRecurringEvents = [],
            yearlyEvents = [],
            yearlyRecurringEvents = [],
            dayOfMonth;
          if (typeof calendarEvent.on.value === 'number') {
            // type: day, value: input number
            const day = calendarEvent.on.value;
            dayOfMonth = moment(startOfMonth).date(day);
            if (calendarEvent.repeats === 'yearly') {
              dayOfMonth = moment(dayOfMonth).month(calendarEvent.every);
              // Yearly Recurring events
              if (calendarEvent.type === 'recurring-hours' || calendarEvent.type === 'blackout-recurring-exceptions') {
                for (let i = 0; i <= diffYears; i++) {
                  const yearlyDayOfMonth = moment(dayOfMonth)
                    .add(i, 'years')
                    .date(day);
                  yearlyRecurringEvents.push({
                    start: yearlyDayOfMonth.toDate(),
                    end: moment(yearlyDayOfMonth)
                      .set({
                        hour: calendarEventEndDateHour,
                        minute: calendarEventEndDateMinutes,
                        second: calendarEventEndDateSeconds
                      })
                      .toDate()
                  });
                }
              } else {
                // One-time events
                const yearlyDayOfMonth = moment(dayOfMonth).date(day);
                yearlyEvents.push({
                  start: yearlyDayOfMonth.toDate(),
                  end: moment(yearlyDayOfMonth)
                    .set({
                      hour: calendarEventEndDateHour,
                      minute: calendarEventEndDateMinutes,
                      second: calendarEventEndDateSeconds
                    })
                    .toDate()
                });
              }
            } else {
              // Monthly Recurring Events
              if (calendarEvent.type === 'recurring-hours' || calendarEvent.type === 'blackout-recurring-exceptions') {
                while (dayOfMonth <= endOfYear) {
                  monthlyRecurringEvents.push({
                    start: dayOfMonth.toDate(),
                    end: moment(dayOfMonth)
                      .set({
                        hour: calendarEventEndDateHour,
                        minute: calendarEventEndDateMinutes,
                        second: calendarEventEndDateSeconds
                      })
                      .toDate()
                  });
                  dayOfMonth = moment(dayOfMonth).add(calendarEvent.every, 'M');
                }
              } else {
                // Monthly Events
                monthlyEvents.push({
                  start: dayOfMonth.toDate(),
                  end: moment(dayOfMonth)
                    .set({
                      hour: calendarEventEndDateHour,
                      minute: calendarEventEndDateMinutes,
                      second: calendarEventEndDateSeconds
                    })
                    .toDate()
                });
              }
            }
          } else {
            const eventType = calendarEvent.on.type, // day, weekday, weekend-day, sunday, monday, tuesday, wednesday, thursday, friday, saturday
              eventValue = calendarEvent.on.value, // first, second, third, fourth, last //ordinalKeywords
              eventDayIndex = weekdays.indexOf(eventType),
              onWeekInterval = ordinalKeywords.indexOf(eventValue),
              endOfMonth = moment(startDate).endOf('month');
            dayOfMonth = startDate.startOf('month');
            const currentYear = moment(dayOfMonth).year();
            // Getting initial dates
            switch (eventType) {
              case 'day':
                if (calendarEvent.repeats === 'yearly') {
                  if (onWeekInterval === 4) {
                    dayOfMonth = startDate.month(calendarEvent.every).endOf('month');
                  } else {
                    dayOfMonth = moment(dayOfMonth)
                      .month(calendarEvent.every)
                      .year(currentYear)
                      .startOf('month')
                      .add(onWeekInterval, 'days');
                  }
                } else {
                  if (onWeekInterval > 0 && onWeekInterval <= 3) {
                    dayOfMonth = dayOfMonth.date(onWeekInterval + 1);
                  } else if (onWeekInterval === 4) {
                    dayOfMonth = startDate.endOf('month');
                  }
                }
                break;
              case 'weekday':
                if (calendarEvent.repeats === 'yearly') {
                  dayOfMonth = moment(dayOfMonth)
                    .month(calendarEvent.every)
                    .year(currentYear)
                    .startOf('month');
                } else {
                  dayOfMonth = moment(dayOfMonth).startOf('month');
                }
                if (onWeekInterval === 4) {
                  if (calendarEvent.repeats === 'yearly') {
                    dayOfMonth = moment(dayOfMonth)
                      .month(calendarEvent.every)
                      .year(currentYear)
                      .endOf('month');
                  } else {
                    dayOfMonth = moment(dayOfMonth).endOf('month');
                  }
                  dayOfMonth = moment(dayOfMonth).add(
                    dayOfMonth.day() % 6 !== 0 ? 0 : dayOfMonth.day() === 0 ? -2 : -1,
                    'day'
                  );
                } else {
                  dayOfMonth = new moment([currentYear, startOfMonth.month()]);
                  while (dayOfMonth.day() % 6 == 0) {
                    dayOfMonth = dayOfMonth.add(1, 'day');
                  }
                  dayOfMonth = dayOfMonth.add(onWeekInterval, 'day');
                  if (dayOfMonth.day() === 6) {
                    dayOfMonth = dayOfMonth.add(2, 'days');
                  } else if (dayOfMonth.day() === 0) {
                    dayOfMonth = dayOfMonth.add(2, 'days');
                  } else if (dayOfMonth.day() === 1) {
                    dayOfMonth = dayOfMonth.add(2, 'days');
                  }
                }
                break;
              case 'weekend-day':
                if (calendarEvent.repeats === 'yearly') {
                  dayOfMonth = moment(dayOfMonth)
                    .month(calendarEvent.every)
                    .year(currentYear)
                    .startOf('month');
                  if (onWeekInterval === 4) {
                    dayOfMonth = moment(dayOfMonth)
                      .month(calendarEvent.every)
                      .year(currentYear)
                      .endOf('month')
                      .day(0);
                    if (dayOfMonth > endOfMonth) {
                      while (dayOfMonth > endOfMonth) {
                        dayOfMonth.subtract(1, 'week');
                      }
                    }
                  } else {
                    dayOfMonth = this.getSpecificDayDate(dayOfMonth, onWeekInterval, eventType === 'weekday' ? 1 : 6);
                  }
                } else {
                  //monthly
                  dayOfMonth = this.getSpecificDayDate(startOfMonth, onWeekInterval, eventType === 'weekday' ? 1 : 6);
                  if (dayOfMonth > endOfMonth) {
                    while (dayOfMonth > endOfMonth) {
                      dayOfMonth.subtract(1, 'week');
                    }
                  }
                }
                break;
              case 'sunday':
              case 'monday':
              case 'tuesday':
              case 'wednesday':
              case 'thursday':
              case 'friday':
              case 'saturday':
                if (calendarEvent.repeats === 'yearly') {
                  let initialYearEveryMonth;
                  if (onWeekInterval === 4) {
                    const dayOfMonth = moment(dayOfMonth)
                      .month(calendarEvent.every)
                      .year(currentYear)
                      .endOf('month')
                      .day(eventDayIndex);
                  } else {
                    initialYearEveryMonth = moment(dayOfMonth)
                      .month(calendarEvent.every)
                      .year(currentYear)
                      .startOf('month');
                    dayOfMonth = this.getSpecificDayDate(initialYearEveryMonth, onWeekInterval, eventDayIndex);
                  }
                } else {
                  if (onWeekInterval <= 3) {
                    dayOfMonth = this.getSpecificDayDate(startOfMonth, onWeekInterval, eventDayIndex);
                  } else {
                    //last
                    dayOfMonth = startDate.endOf('month');
                    while (dayOfMonth.day() !== eventDayIndex) {
                      dayOfMonth.subtract(1, 'day');
                    }
                    if (dayOfMonth < eventStartDate) {
                      dayOfMonth = startDate.endOf('month').add(1, 'M');
                      while (dayOfMonth.day() !== eventDayIndex) {
                        dayOfMonth.subtract(1, 'day');
                      }
                    }
                  }
                }
                break;
            }
            if (
              calendarEvent.type === 'one-time-extended-hours' ||
              calendarEvent.type === 'blackout-one-time-exceptions'
            ) {
              if (calendarEvent.repeats === 'yearly') {
                yearlyEvents.push({
                  start: moment(dayOfMonth)
                    .set({
                      hour: calendarEventStartDateHour,
                      minute: calendarEventStartDateMinutes,
                      second: calendarEventStartDateSeconds
                    })
                    .toDate(),
                  end: moment(dayOfMonth)
                    .set({
                      hour: calendarEventEndDateHour,
                      minute: calendarEventEndDateMinutes,
                      second: calendarEventEndDateSeconds
                    })
                    .toDate()
                });
              } else {
                monthlyEvents.push({
                  start: moment(dayOfMonth)
                    .set({
                      hour: calendarEventStartDateHour,
                      minute: calendarEventStartDateMinutes,
                      second: calendarEventStartDateSeconds
                    })
                    .toDate(),
                  end: moment(dayOfMonth)
                    .set({
                      hour: calendarEventEndDateHour,
                      minute: calendarEventEndDateMinutes,
                      second: calendarEventEndDateSeconds
                    })
                    .toDate()
                });
              }
            } else {
              // Manipulating initial days to calculate rule intervals and push to event list
              if (calendarEvent.repeats === 'yearly') {
                for (let i = 0; i <= diffYears; i++) {
                  const currentMonth = moment(dayOfMonth)
                    .add(i, 'year')
                    .endOf('month');
                  let yearlyDayOfMonth;
                  if (eventType === 'day') {
                    if (onWeekInterval === 4) {
                      yearlyDayOfMonth = moment(dayOfMonth)
                        .add(i, 'year')
                        .endOf('month');
                    } else {
                      yearlyDayOfMonth = moment(dayOfMonth)
                        .add(i, 'year')
                        .startOf('month')
                        .add(onWeekInterval, 'days');
                    }
                  } else if (eventType === 'weekday') {
                    yearlyDayOfMonth = moment(dayOfMonth).add(i, 'years');
                    if (onWeekInterval === 4) {
                      yearlyDayOfMonth = moment(yearlyDayOfMonth)
                        .month(calendarEvent.every)
                        .year(currentYear)
                        .endOf('month');
                      yearlyDayOfMonth = moment(yearlyDayOfMonth).add(
                        yearlyDayOfMonth.day() % 6 !== 0 ? 0 : yearlyDayOfMonth.day() === 0 ? -2 : -1,
                        'day'
                      );
                    } else {
                      yearlyDayOfMonth = new moment([
                        yearlyDayOfMonth.year(),
                        moment(yearlyDayOfMonth)
                          .month(calendarEvent.every)
                          .month()
                      ]);
                      while (yearlyDayOfMonth.day() % 6 == 0) {
                        yearlyDayOfMonth = yearlyDayOfMonth.add(1, 'days');
                      }
                      yearlyDayOfMonth = yearlyDayOfMonth.add(onWeekInterval, 'days');
                      if (
                        yearlyDayOfMonth.day() === 6 ||
                        yearlyDayOfMonth.day() === 0 ||
                        yearlyDayOfMonth.day() === 1
                      ) {
                        yearlyDayOfMonth = yearlyDayOfMonth.add(2, 'days');
                      }
                    }
                  } else if (eventType === 'weekend-day') {
                    if (onWeekInterval === 4) {
                      yearlyDayOfMonth = moment(yearlyDayOfMonth)
                        .add(i, 'year')
                        .endOf('month')
                        .day(6);
                      if (yearlyDayOfMonth > currentMonth) {
                        yearlyDayOfMonth = yearlyDayOfMonth.subtract(1, 'week');
                      }
                    } else {
                      yearlyDayOfMonth = moment(dayOfMonth).add(i, 'years');
                      yearlyDayOfMonth = this.getSpecificDayDate(
                        moment(yearlyDayOfMonth).startOf('month'),
                        onWeekInterval,
                        6
                      );
                    }
                  } else {
                    if (onWeekInterval === 4) {
                      yearlyDayOfMonth = moment()
                        .month(calendarEvent.every)
                        .add(i, 'year')
                        .endOf('month')
                        .day(eventDayIndex);
                      if (yearlyDayOfMonth > currentMonth) {
                        yearlyDayOfMonth = yearlyDayOfMonth.subtract(1, 'week');
                      }
                    } else {
                      yearlyDayOfMonth = moment(dayOfMonth).add(i, 'years');
                      yearlyDayOfMonth = this.getSpecificDayDate(
                        moment(yearlyDayOfMonth).startOf('month'),
                        onWeekInterval,
                        eventDayIndex
                      );
                    }
                  }
                  yearlyRecurringEvents.push({
                    start: moment(yearlyDayOfMonth)
                      .set({
                        hour: calendarEventStartDateHour,
                        minute: calendarEventStartDateMinutes,
                        second: calendarEventStartDateSeconds
                      })
                      .toDate(),
                    end: moment(yearlyDayOfMonth)
                      .set({
                        hour: calendarEventEndDateHour,
                        minute: calendarEventEndDateMinutes,
                        second: calendarEventEndDateSeconds
                      })
                      .toDate()
                  });
                }
              } else {
                // monthly
                const endOfNextMonth = moment(eventEndDate)
                  .add(1, 'M')
                  .endOf('month'); // Current month based on rule start date
                while (dayOfMonth <= endOfNextMonth) {
                  monthlyRecurringEvents.push({
                    start: moment(dayOfMonth)
                      .set({
                        hour: calendarEventStartDateHour,
                        minute: calendarEventStartDateMinutes,
                        second: calendarEventStartDateSeconds
                      })
                      .toDate(),
                    end: moment(dayOfMonth)
                      .set({
                        hour: calendarEventEndDateHour,
                        minute: calendarEventEndDateMinutes,
                        second: calendarEventEndDateSeconds
                      })
                      .toDate()
                  });
                  if (eventType === 'day') {
                    switch (eventValue) {
                      case 'first':
                        dayOfMonth = moment(dayOfMonth)
                          .add(5, 'week')
                          .startOf('month');
                        break;
                      case 'second':
                      case 'third':
                      case 'fourth':
                        dayOfMonth = moment(dayOfMonth)
                          .add(1, 'M')
                          .date(onWeekInterval + 1);
                        break;
                      case 'last':
                        dayOfMonth = moment(dayOfMonth)
                          .add(1, 'M')
                          .endOf('month');
                        break;
                      default:
                        break;
                    }
                  } else if (eventType === 'weekday') {
                    if (onWeekInterval === 4) {
                      dayOfMonth = moment(dayOfMonth)
                        .add(1, 'M')
                        .endOf('month');
                      dayOfMonth = moment(dayOfMonth).add(
                        dayOfMonth.day() % 6 !== 0 ? 0 : dayOfMonth.day() === 0 ? -2 : -1,
                        'day'
                      );
                    } else {
                      dayOfMonth = moment(dayOfMonth)
                        .add(1, 'M')
                        .startOf('month');
                      while (dayOfMonth.day() % 6 == 0) {
                        dayOfMonth = dayOfMonth.add(1, 'days');
                      }
                      dayOfMonth = dayOfMonth.add(onWeekInterval, 'days');
                      // Adding two extra days for saturday, sunday or monday
                      if (dayOfMonth.day() === 6 || dayOfMonth.day() === 0 || dayOfMonth.day() === 1) {
                        dayOfMonth = dayOfMonth.add(2, 'days');
                      }
                    }
                  } else {
                    const currentMonth = moment(dayOfMonth),
                      nextMonth = moment(dayOfMonth).add(1, 'M'),
                      numDayInWeek = this.getAmountOfWeekDaysInMonth(currentMonth, eventDayIndex),
                      nextNumDayInWeek = this.getAmountOfWeekDaysInMonth(nextMonth, eventDayIndex);
                    if (eventValue === 'last') {
                      dayOfMonth = moment(dayOfMonth).add(nextNumDayInWeek, 'week');
                    } else {
                      if (
                        (numDayInWeek === 4 && nextNumDayInWeek === 5) ||
                        (numDayInWeek === 4 && nextNumDayInWeek === 4)
                      ) {
                        dayOfMonth = moment(dayOfMonth).add(4, 'week');
                      } else if (numDayInWeek === 5 && nextNumDayInWeek === 4) {
                        dayOfMonth = moment(dayOfMonth).add(5, 'week');
                      }
                    }
                  }
                }
                let monthlyEveryEvents = [];
                for (let i = 0; i < monthlyRecurringEvents.length; i += calendarEvent.every) {
                  monthlyEveryEvents.push(monthlyRecurringEvents[i]);
                }
                monthlyRecurringEvents = monthlyEveryEvents;
              }
            }
          }
          const monthlyYearlyCalendarEvents =
            calendarEvent.repeats === 'yearly'
              ? yearlyEvents.concat(yearlyRecurringEvents)
              : monthlyEvents.concat(monthlyRecurringEvents);
          const monthYearEventList = monthlyYearlyCalendarEvents
            .filter(monthYearEvent =>
              moment(monthYearEvent.start).isBetween(
                this.calendarDateRange.start,
                this.calendarDateRange.end,
                null,
                '[]'
              )
            )
            .map(monthYearEvent => ({
              id: calendarEvent.title,
              title: calendarEvent.title,
              allDay: calendarEvent.allDay,
              start: monthYearEvent.start,
              end: monthYearEvent.end,
              eventTypeID: calendarEvent.eventTypeID
            }));
          this.formattedEvents = this.formattedEvents.concat(monthYearEventList);
          break;
        default:
          break;
      }
    });
    this.setState({
      selectedEvents: this.formattedEvents
    });
  };

  addDays = (date, days) => {
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  getAmountOfWeekDaysInMonth = (date, weekday) => {
    date.date(1);
    var dif = (7 + (weekday - date.weekday())) % 7 + 1;
    return Math.floor((date.daysInMonth() - dif) / 7) + 1;
  };

  getSpecificDayDate = (date, interval, dayIndex) => {
    // Convert date to moment (month 0-11)
    const myMonth = moment(date);
    // Get first day of the first week of the month usin dayIndex (0-6)
    const firstDay = myMonth.weekday(dayIndex);
    let nWeeks = interval;
    // Check if first day is in the given month
    if (firstDay.month() != date.month()) {
      nWeeks++;
    }
    return firstDay.add(nWeeks, 'weeks');
  };

  handleRuleVersions = selectedVersion => {
    let rules = this.props.rules;
    if (selectedVersion && selectedVersion.rules !== undefined) {
      // Selected rule from entity table
      this.props.setSelectedBusinessHourVersion(selectedVersion.id);
      rules = selectedVersion.rules;
    }
    let selectedVersionEvents,
      selectedVersionIntervalEvents = [],
      calendarEventTypeId;
    if (rules.length > 0) {
      // Create Events for all rules
      selectedVersionEvents = rules
        .map(rule => {
          switch (rule.type) {
            case 'recurring-hours':
              calendarEventTypeId = 0;
              break;
            case 'one-time-extended-hours':
              calendarEventTypeId = 1;
              break;
            case 'blackout-recurring-exceptions':
              calendarEventTypeId = 2;
              break;
            case 'blackout-one-time-exceptions':
              calendarEventTypeId = 3;
              break;
            default:
              break;
          }
          if (rule.hours && !rule.hours.allDay) {
            // Events with intervals
            for (let i = 0; i < rule.hours.intervals.length; i++) {
              // Parse durations into timed format
              const intertvalStartTime =
                Math.floor(rule.hours.intervals[i].start / 60) + ':' + rule.hours.intervals[i].start % 60;
              const intertvalEndTime =
                Math.floor(rule.hours.intervals[i].end / 60) + ':' + rule.hours.intervals[i].end % 60;

              // Add formatted durations to rule dates
              const ruleStartDate = moment(rule.startDate).format('LL');
              const ruleEndDate = moment(
                rule.endDate === undefined ? new Date(rule.startDate) : new Date(rule.endDate)
              ).format('LL');
              const intervalStartDate = moment(ruleStartDate + ' ' + intertvalStartTime);
              const intervalEndDate = moment(ruleEndDate + ' ' + intertvalEndTime);

              const ruleInterval = {
                id: `v0_${i}_` + rule.name,
                type: rule.type,
                title: rule.name,
                ...(rule.hours && { ...rule.hours.allDay } && { allDay: rule.hours.allDay }),
                start: intervalStartDate,
                end: intervalEndDate,
                eventTypeID: calendarEventTypeId,
                repeats: rule.repeats,
                every: rule.every,
                on: rule.on
              };
              selectedVersionIntervalEvents.push(
                // Array of intervals
                ruleInterval
              );
            }
          } else {
            return {
              //Events without intervals
              id: `v_` + rule.name,
              type: rule.type,
              title: rule.name,
              ...(rule.hours && { ...rule.hours.allDay } && { allDay: rule.hours.allDay }),
              start: new Date(rule.startDate),
              end: rule.endDate === undefined ? new Date(rule.startDate) : new Date(rule.endDate),
              eventTypeID: calendarEventTypeId,
              repeats: rule.repeats,
              every: rule.every,
              on: rule.on
            };
          }
        })
        .filter(Boolean);
    } else {
      selectedVersionEvents = [];
    }
    this.calendarEvents = selectedVersionEvents.concat(selectedVersionIntervalEvents);
    this.handleCalendarEvents();
  };
  render() {
    return (
      <Fragment>
        <HeaderContainer>
          <SidePanelActions />
          <SidePanelHeader />
        </HeaderContainer>
        <WrapperDiv>
          <FieldsColumn>
            <BusinessHoursV2 />
          </FieldsColumn>
          <CalendarColumn>
            <MixCalendar
              eventList={this.state.selectedEvents}
              eventType={eventType}
              onChange={e => this.updateCalendarDateRange(e)}
            />
          </CalendarColumn>
          <br />
          <RowWrapper>
            <DetailWrapper customCaretIcon="margin-top: 6px;display: inline-block;margin-left: 23px;" open>
              <WrappedDetailHeader
                customLineSpacer="border-top: 1px solid #2E9AFE; flex-grow: 1; margin: 10px 10px 0;align-self: center;"
                fontSize="20px"
                text="Versions"
              />
              <br />
              <VersionsColumn>
                <label>Versioning ({this.props.versions.length} Published)</label>
                <DetailHeader
                  //userHasUpdatePermission={!this.props.versionsFetching && !this.props.inherited && this.props.userHasUpdatePermission} //ToDo
                  text={detailHeaderText(this.props.versions, 'Published')}
                  //onActionButtonClick={() => setSelectedSubEntityId('versions')}  //ToDo
                  inherited={this.props.inherited}
                  open
                />
                <SidePanelTable
                  items={this.props.versions}
                  fields={versionsEntitiyTableHeaders}
                  defaultSorted={[{ id: 'numericOrderVersion', desc: true }]}
                  userHasUpdatePermission={this.props.userHasUpdatePermission}
                  userHasViewPermission={this.props.userHasViewPermission}
                  //copySubEntity={() => alert('Copy Selected')}  //ToDo
                  viewSubEntity={(listItemId, row) => this.handleRuleVersions(row)}
                  fetching={this.props.versionsFetching && !this.props.versions.length}
                  itemApiPending={this.props.itemApiPending}
                />
              </VersionsColumn>
            </DetailWrapper>
          </RowWrapper>
          <br />
          <RowWrapper>
            <UpdateBusinessHoursV2Form rules={this.props.rules} />
          </RowWrapper>
        </WrapperDiv>
      </Fragment>
    );
  }
}

BusinessHoursV2UpdateFullPage.propTypes = {
  versions: PropTypes.array,
  activeVersion: PropTypes.string,
  rules: PropTypes.array,
  setSelectedBusinessHourVersion: PropTypes.func,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  sharedFormValue: PropTypes.bool,
  itemApiPending: PropTypes.string,
  versionsFetching: PropTypes.bool
};

BusinessHoursV2UpdateFullPage.defaultProps = {
  events: []
};
