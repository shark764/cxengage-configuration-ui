/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectReasonsFormInitialValues } from '../selectors';
import { getSelectedEntity, getSelectedEntityId } from '../../selectors';
import { selectFormInitialValues } from '../../../form/selectors';

jest.mock('../../../form/selectors');
jest.mock('../../selectors');

describe('selectReasonsFormInitialValues', () => {
  it('Return the initial Reason Values, all values provided', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    getSelectedEntity.mockImplementation(() => initialState);
    getSelectedEntityId.mockImplementation(() => 'mockId');
    expect(selectReasonsFormInitialValues()).toMatchSnapshot();
  });

  it('Empty Reason, all values provided', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    getSelectedEntity.mockImplementation(() => initialState);
    getSelectedEntityId.mockImplementation(() => 'mockId');
    expect(selectReasonsFormInitialValues()).toMatchSnapshot();
  });

  it('Return the initial Reason Values, all values NOT provided', () => {
    const initialState = fromJS({
      id: 'mockId'
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectReasonsFormInitialValues()).toMatchSnapshot();
  });
});
