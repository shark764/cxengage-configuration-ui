/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import DispatchMappingsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isCreating,
  userHasUpdatePermission,
  isEntityFetching
} from '../../../../redux/modules/entities/selectors';
import {
  selectFormInitialValues,
  formSubmission,
  createFormName,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import { selectNonReusableFlows, selectVersionsFromFlow } from '../../../../redux/modules/entities/flows/selectors';
import { selectIntegrations } from '../../../../redux/modules/entities/integrations/selectors';
import { getMappingValueInvalid } from '../../../../redux/modules/entities/dispatchMappings/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/flows/selectors');
jest.mock('../../../../redux/modules/entities/integrations/selectors');
jest.mock('../../../../redux/modules/entities/dispatchMappings/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
getCurrentFormValueByFieldName.mockImplementation(() => 'source');
selectNonReusableFlows.mockImplementation(() => [{ value: 'mockValue', label: 'mockLabel' }]);
selectIntegrations.mockImplementation(() => ['mockId1', 'mockId2']);
selectVersionsFromFlow.mockImplementation(() => [{ value: 'mockValue', label: 'mockLabel' }]);
isEntityFetching.mockImplementation(() => true);
getMappingValueInvalid.mockImplementation(() => true);

describe('DispatchMappings Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<DispatchMappingsForm store={store}>Child</DispatchMappingsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('createFormName', () => {
  it('returns proper values', () => {
    expect(createFormName()).toMatchSnapshot();
  });
});

describe('formSubmission', () => {
  const values = {
    id: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    channelType: 'mockChannelType',
    interactionField: 'mockInteractionField',
    value: 'mockValue',
    flowId: 'mockFlowId'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
