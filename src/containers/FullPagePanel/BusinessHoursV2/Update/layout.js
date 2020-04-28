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
          let dates = [];
          let start = eventStartDate,
            end = start;
          // Pushing the first event as initial value
          dates.push({
            start: eventStartDate,
            end: moment(eventStartDate)
              .set({
                hour: calendarEventEndDateHour,
                minute: calendarEventEndDateMinutes,
                second: calendarEventEndDateSeconds
              })
              .toDate()
          });
          // add new dates until rule end date or calendar visible end date is reached up
          while ((start = this.addDays(start, calendarEvent.every)) <= eventEndDate) {
            end = moment(start)
              .set({
                // finish same day, with specific endDate hour
                hour: calendarEventEndDateHour,
                minute: calendarEventEndDateMinutes,
                second: calendarEventEndDateSeconds
              })
              .toDate();
            dates.push({
              start,
              end
            });
          }
          const dailyCalendarEvents = dates
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
          let daysOfFirstWeek = [];
          let recurringWeekDays = [];
          // Setting time to selected week days and pushing them in first week as initial values
          for (let i = 0; i < daysOfTheWeek.length; i++) {
            const weekDay = moment(eventStartDate).day(daysOfTheWeek[i]);
            daysOfFirstWeek.push({
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
          for (let i = 0; i < daysOfFirstWeek.length; i++) {
            let weeklyCurrentDate = moment(daysOfFirstWeek[i].start).add(calendarEvent.every, 'week');
            while (weeklyCurrentDate <= eventEndDate) {
              recurringWeekDays.push({
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
          const currentCalendarWeekEvents = daysOfFirstWeek
            .concat(recurringWeekDays)
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
          this.formattedEvents = this.formattedEvents.concat(currentCalendarWeekEvents);
          break;
        case 'monthly':
        case 'yearly':
          const startDate = moment(eventStartDate),
            startOfMonth = moment(eventStartDate).startOf('month'), // Current month based on rule start date
            endOfYear = moment(eventEndDate).endOf('year'),
            calendarViewYear = moment(endOfYear),
            initialYear = moment(startDate),
            diffYears = calendarViewYear.diff(initialYear, 'years');
          let monthYearRecurringEvents = [],
            dayOfMonth; // = moment(dayOfMonth).month(calendarEvent.every);

          if (typeof calendarEvent.on.value === 'number') {
            // type: day, value: input number
            const day = calendarEvent.on.value;
            dayOfMonth = moment(startOfMonth).date(day);
            if (dayOfMonth < eventStartDate) {
              // if rule start date is greater than day found, search day in next month
              dayOfMonth = moment(startOfMonth)
                .add(1, 'M')
                .date(day);
            }
            if (calendarEvent.repeats === 'yearly') {
              dayOfMonth = moment(dayOfMonth).month(calendarEvent.every);
              for (let i = 0; i <= diffYears; i++) {
                const yearlyDayOfMonth = moment(dayOfMonth)
                  .add(i, 'years')
                  .date(day);
                monthYearRecurringEvents.push({
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
              // monthly
              while (dayOfMonth <= endOfYear) {
                monthYearRecurringEvents.push({
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
            }
          } else {
            const eventType = calendarEvent.on.type, // day, weekend, weekend-day, sunday, monday, tuesday, wednesday, thursday, friday, saturday
              eventValue = calendarEvent.on.value, // first, second, third, fourth, last //ordinalKeywords
              eventDayIndex = weekdays.indexOf(eventType),
              onWeekInterval = ordinalKeywords.indexOf(eventValue),
              endOfMonth = moment(startDate).endOf('month');
            let isDateInValidRange,
              monthWeekend = [];
            dayOfMonth = startDate.startOf('month');
            // Getting initial dates
            switch (eventType) {
              case 'day':
                if (dayOfMonth < eventStartDate && onWeekInterval < 4) {
                  dayOfMonth = startDate.add(1, 'M').startOf('month');
                }
                if (onWeekInterval > 0 && onWeekInterval <= 3) {
                  dayOfMonth = dayOfMonth.date(onWeekInterval + 1);
                } else if (onWeekInterval === 4) {
                  // last
                  dayOfMonth = startDate.endOf('month');
                }
                break;
              case 'weekend':
              case 'weekend-day':
                dayOfMonth = this.getSpecificDayDate(startOfMonth, onWeekInterval, 6);
                if (dayOfMonth <= eventStartDate) {
                  while (dayOfMonth < endOfMonth) {
                    dayOfMonth = moment(dayOfMonth).add(1, 'week');
                  }
                  dayOfMonth = dayOfMonth.add(onWeekInterval, 'week');
                } else {
                  if (dayOfMonth > endOfMonth) {
                    while (dayOfMonth > endOfMonth) {
                      dayOfMonth.subtract(1, 'week');
                    }
                  }
                }
                if (eventType === 'weekend-day') {
                  dayOfMonth = moment(dayOfMonth).add(1, 'days'); //second weekend day
                }
                if (eventType === 'weekend') {
                  monthWeekend.push(dayOfMonth.toDate());
                  monthWeekend.push(dayOfMonth.add(1, 'days').toDate());
                }
                break;
              case 'sunday':
              case 'monday':
              case 'tuesday':
              case 'wednesday':
              case 'thursday':
              case 'friday':
              case 'saturday':
                isDateInValidRange = false;
                if (onWeekInterval <= 3) {
                  dayOfMonth = this.getSpecificDayDate(startOfMonth, onWeekInterval, eventDayIndex);
                  if (dayOfMonth <= eventStartDate) {
                    while (dayOfMonth < eventStartDate) {
                      dayOfMonth = moment(dayOfMonth).add(1, 'week');
                    }
                  } else {
                    isDateInValidRange = true;
                  }
                  if (!isDateInValidRange) {
                    while (dayOfMonth < endOfMonth) {
                      dayOfMonth = moment(dayOfMonth).add(1, 'week');
                    }
                    if (onWeekInterval > 0 && onWeekInterval < 3) {
                      dayOfMonth = moment(dayOfMonth).add(onWeekInterval, 'week');
                    }
                  }
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
                break;
            }
            // Manipulating initial days to calculate rule intervals and push to event list
            if (calendarEvent.repeats === 'yearly') {
              if (monthWeekend.length > 0) {
                for (let i = 0; i < dayOfMonth.length; i++) {
                  const yearlyDayOfMonth = moment(dayOfMonth[i]).add(i, 'years');
                  monthYearRecurringEvents.push({
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
                for (let i = 0; i <= diffYears; i++) {
                  const yearlyDayOfMonth = moment(dayOfMonth).add(i, 'years');
                  monthYearRecurringEvents.push({
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
              }
            } else {
              // monthly
              const endOfNextMonth = moment(eventEndDate)
                .add(1, 'M')
                .endOf('month'); // Current month based on rule start date
              //weekends
              if (monthWeekend.length > 0) {
                // 0 = Saturdays && 1 = Sundays
                for (let i = 0; i < monthWeekend.length; i++) {
                  dayOfMonth = moment(monthWeekend[i]);
                  //.add(5, 'weeks');
                  // Pushing first weekend day
                  monthYearRecurringEvents.push({
                    start: moment(monthWeekend[i])
                      .set({
                        hour: calendarEventStartDateHour,
                        minute: calendarEventStartDateMinutes,
                        second: calendarEventStartDateSeconds
                      })
                      .toDate(),
                    end: moment(monthWeekend[i])
                      .set({
                        hour: calendarEventEndDateHour,
                        minute: calendarEventEndDateMinutes,
                        second: calendarEventEndDateSeconds
                      })
                      .toDate()
                  });
                  while (dayOfMonth <= endOfNextMonth) {
                    const currentMonth = moment(dayOfMonth),
                      nextMonth = moment(dayOfMonth).add(1, 'M'),
                      numDayInWeek = this.getAmountOfWeekDaysInMonth(currentMonth, eventDayIndex),
                      nextNumDayInWeek = this.getAmountOfWeekDaysInMonth(nextMonth, eventDayIndex);
                    if (eventValue === 'last') {
                      if (
                        (numDayInWeek === 5 && nextNumDayInWeek === 4) ||
                        (numDayInWeek === 4 && nextNumDayInWeek === 4)
                      ) {
                        dayOfMonth = moment(dayOfMonth).add(4, 'week');
                      } else if (numDayInWeek === 4 && nextNumDayInWeek === 5) {
                        dayOfMonth = moment(dayOfMonth).add(5, 'week');
                      }
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
                    monthYearRecurringEvents.push({
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
                }
              } else {
                while (dayOfMonth <= endOfNextMonth) {
                  monthYearRecurringEvents.push({
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
              }
              let monthlyYearlyEvents = [];
              for (let i = 0; i < monthYearRecurringEvents.length; i += calendarEvent.every) {
                monthlyYearlyEvents.push(monthYearRecurringEvents[i]);
              }
              monthYearRecurringEvents = monthlyYearlyEvents;
            }
          }
          const currentCalendarMonthlyEvents = monthYearRecurringEvents
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
          this.formattedEvents = this.formattedEvents.concat(currentCalendarMonthlyEvents);
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
                id: rule.name + i.toString(),
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
              id: rule.name,
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
