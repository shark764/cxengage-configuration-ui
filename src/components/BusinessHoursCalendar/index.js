import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MixCalendar } from 'cx-ui-components';
import moment from 'moment';

const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const ordinalKeywords = ['first', 'second', 'third', 'fourth', 'last'];

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
          .toString()
      },
      eventList: []
    };
  }

  componentDidMount() {
    const { selectedBusinessHourVersion, rules } = this.props;
    if (selectedBusinessHourVersion && rules) {
      this.setState({
        eventList: this.handleCalendarEvents()
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedBusinessHourVersion: prevselectedBusinessHourVersion, rules: prevRules } = prevProps;
    const { selectedBusinessHourVersion, rules } = this.props;
    const { calendarDateRange: prevCalendarDateRange } = prevState;
    const { calendarDateRange } = this.state;
    if (
      selectedBusinessHourVersion !== prevselectedBusinessHourVersion ||
      (!prevRules && rules) ||
      prevCalendarDateRange.start !== calendarDateRange.start ||
      prevCalendarDateRange.end !== calendarDateRange.end
    ) {
      this.setState({
        eventList: this.handleCalendarEvents()
      });
    }
  }

  updateCalendarDateRange = ({ dateRange }) => {
    this.setState({
      calendarDateRange: dateRange
    });
  };

  handleCalendarEvents = () => {
    return this.props.rules && this.props.rules.length
      ? this.props.rules
          .reduce((eventList, rule) => {
            let calendarEventTypeId;
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
              const intervalEvents = rule.hours.intervals.map((interval, i) => {
                // Parse durations into timed format
                const intertvalStartTime = Math.floor(interval.start / 60) + ':' + interval.start % 60;
                const intertvalEndTime =
                  interval.end !== 1440 ? Math.floor(interval.end / 60) + ':' + interval.end % 60 : '23:59';
                // Add formatted durations to rule dates
                const ruleStartDate = moment(rule.startDate).format('LL');
                const ruleEndDate =
                  rule.endDate === undefined
                    ? moment(this.state.calendarDateRange.end).format('LL')
                    : moment(rule.endDate).format('LL');
                const intervalStartDate = moment(ruleStartDate + ' ' + intertvalStartTime);
                const intervalEndDate = moment(ruleEndDate + ' ' + intertvalEndTime);
                return {
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
              });
              return [...eventList, ...intervalEvents];
            } else {
              return [
                ...eventList,
                {
                  //Events without intervals
                  id: `v_` + rule.name,
                  type: rule.type,
                  title: rule.name,
                  ...(rule.hours && { ...rule.hours.allDay } && { allDay: rule.hours.allDay }),
                  start: new Date(rule.startDate),
                  ...(rule.endDate && { end: new Date(rule.endDate) }),
                  eventTypeID: calendarEventTypeId,
                  repeats: rule.repeats,
                  every: rule.every,
                  on: rule.on
                }
              ];
            }
          }, [])
          .filter(Boolean)
          .reduce((calendarEvents, calendarEvent) => {
            // Getting time of calendarEventEndDate so we can set it to calendar component end date
            const calendarEventEndDate = moment(calendarEvent.end),
              calendarEventEndDateHour = calendarEventEndDate.get('hour'),
              calendarEventEndDateMinutes = calendarEventEndDate.get('minute'),
              calendarEventEndDateSeconds = calendarEventEndDate.get('second');

            // Setting same time of calendarEventEndDate to calendar component end date
            const calendarEndDate = moment(this.state.calendarDateRange.end)
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
            const eventEndDate =
              calendarEvent.end === undefined ? new Date(calendarEndDate) : new Date(calendarEvent.end);
            const calendarEventRepeats = calendarEvent.repeats !== undefined ? calendarEvent.repeats : 'none';
            switch (calendarEventRepeats) {
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
                if (
                  calendarEvent.type === 'recurring-hours' ||
                  calendarEvent.type === 'blackout-recurring-exceptions'
                ) {
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
                    moment(dailyEvent.start).isBetween(
                      this.state.calendarDateRange.start,
                      this.state.calendarDateRange.end,
                      null,
                      '[]'
                    )
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
                return [...calendarEvents, ...dailyCalendarEvents];
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
                if (
                  calendarEvent.type === 'recurring-hours' ||
                  calendarEvent.type === 'blackout-recurring-exceptions'
                ) {
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
                    moment(weeklyEvent.start).isBetween(
                      this.state.calendarDateRange.start,
                      this.state.calendarDateRange.end,
                      null,
                      '[]'
                    )
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
                return [...calendarEvents, ...weeklyCalendarEvents];
              case 'monthly':
              case 'yearly':
                const startDate = moment(eventStartDate),
                  startOfMonth = moment(eventStartDate).startOf('month'), // Current month based on rule start date
                  endOfYear =
                    calendarEvent.end === undefined ? moment(eventEndDate).endOf('year') : moment(eventEndDate),
                  diffYears = moment(endOfYear).year() - moment(startDate).year();
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
                    if (
                      calendarEvent.type === 'recurring-hours' ||
                      calendarEvent.type === 'blackout-recurring-exceptions'
                    ) {
                      for (let i = 0; i <= diffYears; i++) {
                        const yearlyDayOfMonth = moment(dayOfMonth)
                          .add(i, 'years')
                          .date(day)
                          .set({
                            hour: calendarEventStartDateHour,
                            minute: calendarEventStartDateMinutes,
                            second: calendarEventStartDateSeconds
                          });
                        if (yearlyDayOfMonth >= startDate) {
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
                    if (
                      calendarEvent.type === 'recurring-hours' ||
                      calendarEvent.type === 'blackout-recurring-exceptions'
                    ) {
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
                        while (dayOfMonth.day() % 6 === 0) {
                          dayOfMonth = dayOfMonth.add(1, 'day');
                        }
                        dayOfMonth = dayOfMonth.add(onWeekInterval, 'day');
                        if (dayOfMonth.day() === 6) {
                          dayOfMonth = dayOfMonth.add(2, 'days');
                        } else if (dayOfMonth.day() === 0) {
                          dayOfMonth = dayOfMonth.add(2, 'days');
                        } else if (dayOfMonth.day() === 1 && onWeekInterval !== 0) {
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
                          dayOfMonth = this.getSpecificDayDate(
                            dayOfMonth,
                            onWeekInterval,
                            eventType === 'weekday' ? 1 : 6
                          );
                        }
                      } else {
                        //monthly
                        dayOfMonth = this.getSpecificDayDate(
                          startOfMonth,
                          onWeekInterval,
                          eventType === 'weekday' ? 1 : 6
                        );
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
                          // eslint-disable-next-line no-use-before-define
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
                    default:
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
                            while (yearlyDayOfMonth.day() % 6 === 0) {
                              yearlyDayOfMonth = yearlyDayOfMonth.add(1, 'days');
                            }
                            yearlyDayOfMonth = yearlyDayOfMonth.add(onWeekInterval, 'days');
                            if (
                              yearlyDayOfMonth.day() === 6 ||
                              yearlyDayOfMonth.day() === 0 ||
                              (yearlyDayOfMonth.day() === 1 && onWeekInterval !== 0)
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
                        yearlyDayOfMonth = yearlyDayOfMonth.set({
                          hour: calendarEventStartDateHour,
                          minute: calendarEventStartDateMinutes,
                          second: calendarEventStartDateSeconds
                        });
                        if (yearlyDayOfMonth >= eventStartDate && yearlyDayOfMonth <= eventEndDate) {
                          yearlyRecurringEvents.push({
                            start: moment(yearlyDayOfMonth).toDate(),
                            end: moment(yearlyDayOfMonth)
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
                      // monthly
                      let endOfNextMonth;
                      if (calendarEvent.end) {
                        // when there is endDate, we use endDate instaed of calendar endDate calculated range
                        endOfNextMonth = moment(eventEndDate);
                      } else {
                        endOfNextMonth = moment(eventEndDate)
                          .add(1, 'M')
                          .endOf('month'); // Current month based on rule start date
                      }
                      while (dayOfMonth <= endOfNextMonth) {
                        dayOfMonth = moment(dayOfMonth).set({
                          hour: calendarEventStartDateHour,
                          minute: calendarEventStartDateMinutes,
                          second: calendarEventStartDateSeconds
                        });
                        if (dayOfMonth >= eventStartDate) {
                          monthlyRecurringEvents.push({
                            start: moment(dayOfMonth).toDate(),
                            end: moment(dayOfMonth)
                              .set({
                                hour: calendarEventEndDateHour,
                                minute: calendarEventEndDateMinutes,
                                second: calendarEventEndDateSeconds
                              })
                              .toDate()
                          });
                        }
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
                            while (dayOfMonth.day() % 6 === 0) {
                              dayOfMonth = dayOfMonth.add(1, 'days');
                            }
                            dayOfMonth = dayOfMonth.add(onWeekInterval, 'days');
                            // Adding two extra days for saturday, sunday or monday
                            if (
                              dayOfMonth.day() === 6 ||
                              dayOfMonth.day() === 0 ||
                              (dayOfMonth.day() === 1 && onWeekInterval !== 0)
                            ) {
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
                      this.state.calendarDateRange.start,
                      this.state.calendarDateRange.end,
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
                return [...calendarEvents, ...monthYearEventList];
              case 'none':
                const oneTimeExceptionEvent = {
                  id: calendarEvent.title,
                  title: calendarEvent.title,
                  allDay: calendarEvent.allDay,
                  start: eventStartDate,
                  end: moment(eventStartDate)
                    .set({
                      hour: calendarEventEndDateHour,
                      minute: calendarEventEndDateMinutes,
                      second: calendarEventEndDateSeconds
                    })
                    .toDate(),
                  eventTypeID: calendarEvent.eventTypeID
                };
                return [...calendarEvents, oneTimeExceptionEvent];
              default:
                return calendarEvents;
            }
          }, [])
      : [];
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
    if (firstDay.month() !== date.month()) {
      nWeeks++;
    }
    return firstDay.add(nWeeks, 'weeks');
  };

  render() {
    const calendarEvents = this.handleCalendarEvents();
    return (
      <MixCalendar
        eventList={this.props.selectedBusinessHourVersion ? this.state.eventList : calendarEvents}
        eventType={this.props.eventType}
        onChange={e => this.updateCalendarDateRange(e)}
      />
    );
  }
}

CalendarEvents.propTypes = {
  eventType: PropTypes.array,
  rules: PropTypes.array,
  selectedBusinessHourVersion: PropTypes.string
};
