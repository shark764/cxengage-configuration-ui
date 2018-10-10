/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import ChatWidgetsForm, { mapStateToProps, createFormName, formSubmission } from '../';
import { getSelectedEntityId, isCreating } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

describe('ChatWidgets Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<ChatWidgetsForm store={store}>Child</ChatWidgetsForm>)).toMatchSnapshot();
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
    shared: false,
    welcome: 'hero',
    fontFamily: 'arial',
    fontSize: '12pt',
    headerColor: '#000000',
    headerTextIcons: '#000000',
    chatbg: '#000000',
    agentHeader: '#000000',
    agentText: '#000000',
    customerHeader: '#000000',
    customerText: '#000000',
    systemText: '#000000',
    buttonText: '#000000',
    iconColor: '#000000',
    borderColor: '#000000'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
