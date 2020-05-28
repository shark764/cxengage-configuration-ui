import { isEmpty } from 'serenova-js-utils/strings';

const repeats = {
  weekly: 'every how many weeks',
  daily: 'every how many days',
  monthly: 'every how many months'
};

const daysOnMonth = {
  january: 31,
  febraury: 29, //Max number fo days febraury can have (leap year)
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31
};

export const formValidation = values => {
  let errors = {};
  let rulesErrors = [];
  if (values.get('rules') && values.get('rules').size) {
    values.get('rules').forEach((rule, index, rules) => {
      const error = ruleValidation(rule, rules);
      if (error) {
        rulesErrors[index] = error;
      }
    });
  }

  if (rulesErrors.length) {
    errors.rules = rulesErrors;
  }
  return errors;
};

export const ruleValidation = (rule, rules) => {
  let error;
  if (isEmpty(rule.name)) {
    error = {
      name: true,
      message: 'The rule should have a name'
    };
  } else if (rules.some(r => r.name.trim() === rule.name.trim() && !isEmpty(rule.name) && r.id !== rule.id)) {
    error = {
      name: true,
      message: 'Rule name should be unique within the draft'
    };
  } else if (isEmpty(rule.type)) {
    error = {
      type: true,
      message: 'The rule should have a type'
    };
  } else if (!rule.startDate) {
    error = {
      startDate: true,
      message: 'You should select a start date'
    };
  } else if (rule.startDate && !rule.type.includes('one-time') && rule.endDate && rule.startDate > rule.endtDate) {
    error = {
      endDate: true,
      message: 'end date should be after start date'
    };
  } else if (!rule.type.includes('one-time') && !rule.repeats) {
    error = {
      repeats: true,
      message: 'You should select the rate at which the rule repeats'
    };
  } else if (!rule.type.includes('one-time') && !rule.every) {
    error = {
      every: true,
      message: `You should set ${repeats[rule.repeats]} should the rule take effect`
    };
  } else if (!rule.type.includes('one-time') && isNaN(rule.every) && rule.repeats !== 'yearly') {
    error = {
      every: true,
      message: 'The Every field should be a number'
    };
  } else if (!rule.type.includes('one-time') && !Number.isInteger(+rule.every) && rule.repeats !== 'yearly') {
    error = {
      every: true,
      message: 'The Every field should be a integer value'
    };
  } 
  else if (!rule.type.includes('one-time') && rule.repeats === 'weekly' && (!rule.on || !Array.isArray(rule.on) || rule.on.length < 1)) {
    error = {
      on: true,
      message: 'You should select the days on the week in which the rule should take effect'
    };
  } else if (!rule.type.includes('one-time') &&
    ((rule.repeats === 'monthly' || rule.repeats === 'yearly') && (!rule.on || !rule.on.type || !rule.on.value)))  {
    error = {
      on: {
        type: !rule.on || !rule.on.type,
        value: !rule.on || !rule.on.value
      },
      message: 'type or value on the "On" field is undefined'
    };
  } else if (!rule.type.includes('one-time') &&
  ((rule.repeats === 'monthly' || rule.repeats === 'yearly') && 
  (rule.on &&
    rule.on.value === 'day' &&
    (rule.on && (isNaN(rule.on.type) || !Number.isInteger(+rule.on.type)))))) {
      error = {
        on: {
          type: true
        },
        message: 'value on the "On" field should be a number'
      };
  } else if (
    !rule.type.includes('one-time') &&
    rule.repeats === 'monthly' &&
    rule.on &&
    rule.on.value === 'day' &&
    (rule.on.type < 1 || rule.on.type > 31)
  ) {
    error = {
      on: {
        type: true,
      },
      message: 'The numeric value in the "On" field has to be between 1 and 31(days on a month)'
    };
  } else if (
    !rule.type.includes('one-time') &&
    rule.repeats === 'yearly' &&
    rule.on &&
    rule.on.value === 'day' &&
    rule.every &&
    (rule.on.type < 1 || rule.on.type > daysOnMonth[rule.every])
  ) {
    error = {
      on: {
        type: true
      },
      errorMessage: `The numeric value in the "On" field has to be between 1 and ${
        daysOnMonth[rule.every]
      } (Number of days on ${rule.every}, considering a day more when leap year on Febraury)`
    };
  } else if (
    rule.hours &&
    !rule.hours.allDay &&
    rule.hours.intervals &&
    rule.hours.intervals.findIndex(
      (interval, ind, intervals) =>
        interval.start > interval.end ||
        intervals.some(
          (int, i) =>
            i !== ind &&
            ((interval.start >= int.start && interval.start <= int.end) ||
              (interval.end >= int.start && interval.end <= int.end))
        )
    ) > -1
  ) {
    const index = rule.hours.intervals.findIndex(
      (interval, ind, intervals) =>
        interval.start > interval.end ||
        intervals.some((int, i) => i !== ind && ((interval.start >= int.start && interval.start <= int.end) || 
          (interval.end >= int.start && interval.end <= int.end)))
    );
    let intervalErrors = Array(rule.hours.intervals.length).fill({
      start: false,
      end: false
    });
    intervalErrors[index] = {
      start: true,
      end: true
    };

    error = {
      hours: {
        intervals: intervalErrors
      },
      message: 'An interval has a greater start time than its end time'
    };
  }

  return error;
}
