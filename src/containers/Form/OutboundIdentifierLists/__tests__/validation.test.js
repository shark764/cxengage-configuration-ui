import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      value: 'mockValue',
      flowId: 'mockFlowId',
      channelType: 'mockChannelType'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      value: '',
      flowId: '',
      channelType: ''
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
