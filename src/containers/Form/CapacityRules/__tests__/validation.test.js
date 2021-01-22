import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
    });
    expect(
      formValidation(values, { intl: { formatMessage: ({ defaultMessage }) => defaultMessage } })
    ).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
    });
    expect(
      formValidation(values, { intl: { formatMessage: ({ defaultMessage }) => defaultMessage } })
    ).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
    });
    expect(
      formValidation(values, { intl: { formatMessage: ({ defaultMessage }) => defaultMessage } })
    ).toMatchSnapshot();
  });
});
