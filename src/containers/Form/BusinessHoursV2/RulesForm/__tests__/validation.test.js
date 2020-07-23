import { formValidation } from '../validation';
import { List, Map } from 'immutable';

const validRule = {
  id: 'rule-id',
  name: 'rule name',
  type: 'regular-hours',
  startDate: new Date('1995-12-17T03:24:00'),
  repeats: 'weekly',
  every: 1,
  on: ['monday', 'wednesday', 'friday'],
  hours: {
    allDay: true
  }
};

describe('formValidation', () => {
  it("if no rules are provided then there's no error", () => {
    const values = Map({});
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule has no name it returns an error', () => {
    const values = Map({
      rules: List([
        {
          repeats: 'weekly'
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if two rules have the same name it returns an error', () => {
    const values = Map({
      rules: List([
        {
          id: 'random-rule-uuid',
          name: 'rule name'
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule has no type it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule'
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule has no startDate it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception'
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it("if a rule has an endDate and it's lesser than the startDate it should return an error", () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          endDate: new Date('1994-12-17T03:24:00')
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule has no repeat attribute it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00')
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule has no every attribute it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'daily'
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it("if a rule every attribute it's not a number when repeats it's not yearly it should return an error", () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'daily',
          every: 'random string'
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it("if a rule every attribute it's not a number when repeats it's not yearly it should return an error", () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'daily',
          every: 'random string'
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it("if a rule every attribute it's not a integer when repeats it's not yearly it should return an error", () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'daily',
          every: 7.8
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it("if a rule repeats weekly and on it's not an array or the array has no items it should throw an error", () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'weekly',
          every: 2,
          on: []
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule repeats montlhly or yearly and either type or value inside on are undefined it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'monthly',
          every: 2,
          on: {}
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule repeats montlhly or yearly and the value attribute on the "on" attribute it\'s "day" and the type attribute on the on attribute is not an integer, it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'monthly',
          every: 2,
          on: {
            value: 'day',
            type: 'whatever'
          }
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule repeats montlhly and the value attribute on the "on" attribute it\'s "day" and type is not within 1 and 31 (days on month), it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'monthly',
          every: 2,
          on: {
            value: 'day',
            type: 43
          }
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule repeats yearly and the value attribute on the "on" attribute it\'s "day" and type is not withind 1 and the days of the month set on the every attribute on the rule, it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'yearly',
          every: 'march',
          on: {
            value: 'day',
            type: 43
          }
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('if a rule has intervals and they overlap each other, it should return an error', () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'weekly',
          every: 2,
          on: ['monday', 'friday'],
          hours: {
            allDay: false,
            intervals: [
              {
                start: 310,
                end: 890
              },
              {
                start: 750,
                end: 1060
              }
            ]
          }
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it("if a rule has an interval in which the start time it's greater than the end time, it should return an error", () => {
    const values = Map({
      rules: List([
        {
          name: 'random rule',
          type: 'blackout-exception',
          startDate: new Date('1995-12-17T03:24:00'),
          repeats: 'weekly',
          every: 2,
          on: ['monday', 'friday'],
          hours: {
            allDay: false,
            intervals: [
              {
                start: 980,
                end: 890
              },
              {
                start: 750,
                end: 1060
              }
            ]
          }
        },
        validRule
      ])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it("if rules provided are valid, it shouldn't return an error", () => {
    const values = Map({
      rules: List([validRule])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
