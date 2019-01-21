/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import OutboundIdentifiersForm, { mapStateToProps } from '../';
import { getSelectedEntityId, isCreating } from '../../../../redux/modules/entities/selectors';
import { selectFlowIds } from '../../../../redux/modules/entities/flows/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';
import { getChannelTypeFormValue } from '../../../../redux/modules/entities/outboundIdentifiers/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/flows/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/outboundIdentifiers/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => false);
selectFlowIds.mockImplementation(() => [{ value: 'mockValue', label: 'mockLabel' }]);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
getChannelTypeFormValue.mockImplementation(() => 'email');

describe('OutboundIdentifiersForm Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<OutboundIdentifiersForm store={store}>Child</OutboundIdentifiersForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
