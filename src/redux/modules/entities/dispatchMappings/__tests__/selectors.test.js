/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectDispatchMappingsFormInitialValues } from '../selectors';
import { getSelectedEntity } from '../../selectors';

const initialState = fromJS({
  Entities: {
    dispatchMappings: {
      data: [
        {
          id: '1',
          value: 'zendesk',
          channelType: 'voice',
          version: null
        },
        {
          id: '2',
          value: 'zendesk',
          channelType: 'voice',
          version: '0000'
        }
      ],
      userExistInPlatform: true
    }
  }
});
const mockInitialValues = fromJS({
  id: '2',
  value: 'zendesk',
  channelType: 'voice',
  version: '0000'
});

const mockCurrentForm = fromJS({
  values: {
    interactionField: 'source',
    value: 'zendesk',
    channelType: 'voice'
  },
  initial: {
    shared: false
  }
});

jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm,
  selectFormInitialValues: () => mockInitialValues,
  getCurrentFormValueByFieldName: () => 'voice'
}));
jest.mock('../../selectors');

describe('Retrieve Dispatch Mappings Initial Form Values from State', () => {
  it('Return regular initial values', () => {
    getSelectedEntity.mockImplementation(() => undefined);
    expect(selectDispatchMappingsFormInitialValues(initialState)).toMatchSnapshot();
  });
  it('Return Custom Made initial values', () => {
    getSelectedEntity.mockImplementation(() => 'mockResult');
    expect(selectDispatchMappingsFormInitialValues(initialState)).toMatchSnapshot();
  });
});
