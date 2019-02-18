/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import {
  currentMappingValue,
  currentValue,
  currentChannelType,
  getDispatchMappings,
  getDispatchMappingValue,
  selectDispatchMappingsFormInitialValues
} from '../selectors';
import { getSelectedEntity } from '../../selectors';

const initialState = fromJS({
  Entities: {
    dispatchMappings: {
      data: [
        {
          id: '1',
          value: 'zendesk',
          channelType: 'voice'
        },
        {
          id: '2',
          value: 'zendesk',
          channelType: 'voice'
        }
      ],
      userExistInPlatform: true
    }
  }
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
  selectFormInitialValues: () => 'mockResult'
}));
jest.mock('../../selectors');

describe('Current Form Values', () => {
  it("returns the current form's mapping, also known as interaction field", () => {
    expect(currentMappingValue()).toMatchSnapshot();
  });
  it("returns the current form's mapping value, also known just as value", () => {
    expect(currentValue()).toMatchSnapshot();
  });
  it("returns the current form's Interaction Type, also known just as Channel Type", () => {
    expect(currentChannelType()).toMatchSnapshot();
  });
});

describe('Retrieve Dispatch values from State', () => {
  it('Return Dispatch Mappings from state', () => {
    expect(getDispatchMappings(initialState)).toMatchSnapshot();
  });
  it('Compare values from state with current form, interaction type and channel', () => {
    expect(getDispatchMappingValue(initialState)).toMatchSnapshot();
  });
});

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
