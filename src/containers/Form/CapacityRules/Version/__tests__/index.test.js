/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import { createStore } from 'redux';
import { fromJS } from 'immutable';

import { shallowWithIntl } from '../../../../../utils/testUtils';
import { getCurrentForm } from '../../../../../redux/modules/form/selectors';
import CreateVersionForm, { mapStateToProps } from '../';
import {
  getSelectedSubEntityId,
  isSubEntitySaving,
  getSelectedEntity,
} from '../../../../../redux/modules/entities/selectors';
import {
  subEntityFormSubmission,
  selectFormInitialValues,
  getCurrentSubFormValueByFieldName,
} from '../../../../../redux/modules/form/selectors';

jest.mock('../../../../../redux/modules/entities/selectors');
jest.mock('../../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedSubEntityId.mockImplementation(() => 'create');
isSubEntitySaving.mockImplementation(() => true);
getCurrentSubFormValueByFieldName.mockImplementation(() => 'any');
selectFormInitialValues.mockImplementation(() => ({
  rule: {
    voice: true,
    groups: [
      {
        channels: ['email', 'messaging'],
        interactions: 4,
      },
    ],
    rules: [
      {
        channels: ['voice'],
        max: 1,
        weight: 100,
      },
      {
        channels: ['email'],
        max: 1,
        weight: 100,
      },
      {
        channels: ['messaging'],
        max: 1,
        weight: 100,
      },
      {
        channels: ['sms'],
        max: 1,
        weight: 100,
      },
      {
        channels: ['work-item'],
        max: 1,
        weight: 100,
      },
    ],
  },
  quantifier: 'any',
}));

getSelectedEntity.mockReturnValue(
  fromJS({
    name: 'whatever',
  })
);

describe('CapacityRules Renders', () => {
  it('renders', () => {
    const store = createStore((state) => state);
    expect(shallowWithIntl(<CreateVersionForm store={store}>Child</CreateVersionForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('subEntityFormSubmission', () => {
  const values = {
    name: 'mockName',
    rule: {
      voice: true,
      groups: [
        {
          channels: ['email', 'messaging'],
          interactions: 4,
        },
      ],
      rules: [
        {
          channels: ['voice'],
          max: 1,
          weight: 100,
        },
        {
          channels: ['email'],
          max: 1,
          weight: 100,
        },
        {
          channels: ['messaging'],
          max: 1,
          weight: 100,
        },
        {
          channels: ['sms'],
          max: 1,
          weight: 100,
        },
        {
          channels: ['work-item'],
          max: 1,
          weight: 100,
        },
      ],
    },
    quantifier: 'any',
  };
  const dispatch = (action) => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(subEntityFormSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
