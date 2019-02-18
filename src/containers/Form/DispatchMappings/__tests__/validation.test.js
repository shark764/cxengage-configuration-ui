import { formValidation } from '../validation';
import { fromJS } from 'immutable';

const props = {
  dispatchValues: fromJS([
    {
      id: 'mockId',
      value: 'mockValue',
      channelType: 'mockChannelType'
    }
  ]),
  initialValues: fromJS({
    id: 'mockId1',
    value: 'mockValueUnique2',
    channelType: 'mockChannelTypeUnique2'
  }),
  allDispatchMappings: fromJS([
    {
      id: 'mockId1',
      value: 'mockValue',
      channelType: 'mockChannelType'
    },
    {
      id: 'mockId2',
      value: 'mockValue2',
      channelType: 'mockChannelType2'
    }
  ])
};

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = fromJS({
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      channelType: 'mockChannelTypeUnique',
      interactionField: 'mockInteractionField',
      value: 'mockValueUnique',
      flowId: 'mockFlowId'
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = fromJS({
      id: '',
      name: '',
      description: '',
      channelType: '',
      interactionField: '',
      value: '',
      flowId: ''
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = fromJS({
      id: null,
      name: null,
      description: null,
      channelType: null,
      interactionField: null,
      value: null,
      flowId: null
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
