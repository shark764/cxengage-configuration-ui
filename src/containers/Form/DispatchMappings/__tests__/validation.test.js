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
      interactionField: 'mockInteractionField1',
      channelType: 'mockChannelType'
    },
    {
      id: 'mockId2',
      value: 'mockValue2',
      interactionField: 'mockInteractionField2',
      channelType: 'mockChannelType2'
    }
  ]),
  flowsFetching: false
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
      flowId: 'mockFlowId',
      version: 'mockVersion'
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
      flowId: '',
      version: ''
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
      flowId: null,
      version: undefined
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });

  it('returns errors when same name and interactionField/values are provided', () => {
    const sameProps = {
      dispatchValues: fromJS([
        {
          id: 'mockId',
          name: 'mockValue',
          value: 'mockValue',
          channelType: 'mockChannelType',
          interactionField: 'mockInteractionField1'
        }
      ]),
      initialValues: fromJS({
        name: 'mockValue',
        value: 'mockValueUnique2',
        channelType: 'mockChannelTypeUnique2',
        interactionField: 'mockInteractionField1'
      }),
      allDispatchMappings: fromJS([
        {
          id: 'mockId1',
          name: 'mockValue',
          value: 'mockValue',
          interactionField: 'mockInteractionField1',
          channelType: 'mockChannelType'
        },
        {
          id: 'mockId2',
          name: 'mockValue2',
          value: 'mockValue2',
          interactionField: 'mockInteractionField2',
          channelType: 'mockChannelType2'
        }
      ]),
      flowsFetching: false
    };

    const values = fromJS({
      name: 'mockValue',
      description: 'MockDesc',
      channelType: 'mockChannelTypeUnique22',
      interactionField: 'mockInteractionField1',
      value: 'mockValueUnique',
      flowId: 'mockFlowId',
      version: 'mockVersion'
    });
    expect(formValidation(values, sameProps)).toMatchSnapshot();
  });
});
