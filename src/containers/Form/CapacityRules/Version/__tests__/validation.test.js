import { formValidation } from '../validation';
import { Map, List, fromJS } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      rule: new Map({
        groups: new List(),
      }),
      rules: new List(),
    });
    expect(
      formValidation(values, { intl: { formatMessage: ({ defaultMessage }) => defaultMessage } })
    ).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = fromJS({
      name: '',
      rule: {
        groups: [],
      },
      rules: [],
    });
    expect(
      formValidation(values, { intl: { formatMessage: ({ defaultMessage }) => defaultMessage } })
    ).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = fromJS({
      name: undefined,
      rule: {
        groups: [],
      },
      rules: [
        {
          channels: ['voice'],
          max: 0,
          weight: 0.5,
        },
      ],
    });
    expect(
      formValidation(values, { intl: { formatMessage: ({ defaultMessage }) => defaultMessage } })
    ).toMatchSnapshot();
  });
});
