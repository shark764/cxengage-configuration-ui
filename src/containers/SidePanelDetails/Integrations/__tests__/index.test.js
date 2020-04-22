/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import IntegrationsDetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  isSaving
} from '../../../../redux/modules/entities/selectors';
import { getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      type: 'mockType'
    })
);
userHasUpdatePermission.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isSaving.mockImplementation(() => false);

jest.mock('../../../../redux/modules/form/selectors');
getCurrentFormValueByFieldName.mockImplementation(() => 'salesforce');

describe('IntegrationsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<IntegrationsDetailsPanel store={store}>Child</IntegrationsDetailsPanel>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
