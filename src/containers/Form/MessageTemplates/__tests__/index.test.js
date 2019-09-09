/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import MessageTemplatesForm, { mapStateToProps } from '../index';
import {
  createFormName,
  formSubmission,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { messageTemplateFormInitialValues } from '../../../../redux/modules/entities/messageTemplates/selectors';

jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/messageTemplates/selectors');

isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
getSelectedEntityId.mockImplementation(() => 'mockId');
messageTemplateFormInitialValues.mockImplementation(() => 'mock messageTemplates initial values');
getCurrentFormValueByFieldName.mockImplementation(() => 'mockData');

describe('TransferLists Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<MessageTemplatesForm store={store}>Child</MessageTemplatesForm>)).toMatchSnapshot();
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
    name: 'mockName',
    description: 'mockDescription',
    channels: ['mockChannels'],
    templateTextType: 'html',
    template: 'mock template'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
