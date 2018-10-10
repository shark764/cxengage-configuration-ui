import validate from '../validation';
import { Map } from 'immutable';

describe('validate', () => {
  it('returns proper object when required fields are provided', () => {
    const props = {
      fieldItems: [
        {
          name: 'name',
          type: 'string',
          required: true
        },
        {
          name: 'active',
          type: 'boolean',
          required: false
        }
      ]
    };
    const values = new Map({
      name: 'mockName',
      active: true
    });
    expect(validate(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const props = {
      fieldItems: [
        {
          name: 'name',
          type: 'string',
          required: true
        },
        {
          name: 'active',
          type: 'boolean',
          required: true
        }
      ]
    };
    const values = new Map({
      name: '',
      active: null
    });
    expect(validate(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const props = {
      fieldItems: [
        {
          name: 'name',
          type: 'string',
          required: true
        },
        {
          name: 'active',
          type: 'boolean',
          required: true
        }
      ]
    };
    const values = new Map({
      name: undefined,
      active: null
    });
    expect(validate(values, props)).toMatchSnapshot();
  });
  it('returns proper object when false is provided to required boolean fields', () => {
    const props = {
      fieldItems: [
        {
          name: 'name',
          type: 'string',
          required: true
        },
        {
          name: 'active',
          type: 'boolean',
          required: true
        }
      ]
    };
    const values = new Map({
      name: 'mockName',
      active: false
    });
    expect(validate(values, props)).toMatchSnapshot();
  });
  it('returns proper object when false is provided to not required boolean fields', () => {
    const props = {
      fieldItems: [
        {
          name: 'name',
          type: 'string',
          required: true
        },
        {
          name: 'active',
          type: 'boolean',
          required: false
        }
      ]
    };
    const values = new Map({
      name: 'mockName',
      active: false
    });
    expect(validate(values, props)).toMatchSnapshot();
  });
});
