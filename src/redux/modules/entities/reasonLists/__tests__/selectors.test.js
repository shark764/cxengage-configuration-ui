/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { reasonListsInitialValues, checkDisableShared } from '../selectors';
import { getSelectedEntity, getSelectedEntityId } from '../../selectors';
import { selectFormInitialValues } from '../../../form/selectors';

jest.mock('../../../form/selectors');
jest.mock('../../selectors');

describe('reasonListsInitialValues', () => {
  it('Return the initial Reason List Values, all values provided', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      isDefault: false,
      reasons: [
        {
          reasonId: 'mockReasonId',
          sortOrder: '0',
          hierarchy: []
        },
        {
          reasonId: 'mockReasonId2',
          sortOrder: '1',
          hierarchy: []
        }
      ]
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    getSelectedEntity.mockImplementation(() => initialState);
    getSelectedEntityId.mockImplementation(() => 'mockId');
    expect(reasonListsInitialValues()).toMatchSnapshot();
  });

  it('Empty Reason List, all values provided', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      isDefault: false,
      reasons: []
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    getSelectedEntity.mockImplementation(() => initialState);
    getSelectedEntityId.mockImplementation(() => 'mockId');
    expect(reasonListsInitialValues()).toMatchSnapshot();
  });

  it('Return the initial Reason List Values, all values NOT provided', () => {
    const initialState = fromJS({
      id: 'mockId'
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(reasonListsInitialValues()).toMatchSnapshot();
  });
});

describe('checkDisableShared', () => {
  it('check if shared is disabled and id exists', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      isDefault: false,
      reasons: []
    });
    selectFormInitialValues.mockImplementation(() => initialState);

    expect(checkDisableShared()).toMatchSnapshot();
  });

  it('check if shared is disabled and id DOES NOT exists', () => {
    const initialState = fromJS({
      shared: true,
      isDefault: false,
      reasons: []
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(checkDisableShared()).toMatchSnapshot();
  });
});

describe('filterReasons', () => {
  it('Return Filtered Reasons, all values provided', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      isDefault: false,
      reasons: [
        {
          reasonId: 'mockReasonId',
          sortOrder: '0',
          hierarchy: []
        },
        {
          reasonId: 'mockReasonId2',
          sortOrder: '1',
          hierarchy: []
        }
      ]
    });
    getSelectedEntity.mockImplementation(() => initialState);
    expect(reasonListsInitialValues()).toMatchSnapshot();
  });
});
