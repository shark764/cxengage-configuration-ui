/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectDispositionsFormInitialValues } from '../selectors';
import { getSelectedEntity, getSelectedEntityId } from '../../selectors';
import { selectFormInitialValues } from '../../../form/selectors';

jest.mock('../../../form/selectors');
jest.mock('../../selectors');

describe('selectDispositionsFormInitialValues', () => {
  it('Return the initial Disposition Values, all values provided', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    getSelectedEntity.mockImplementation(() => initialState);
    getSelectedEntityId.mockImplementation(() => 'mockId');
    expect(selectDispositionsFormInitialValues()).toMatchSnapshot();
  });

  it('Empty Disposition, all values provided', () => {
    const initialState = fromJS({
      id: 'mockId',
      shared: false,
      active: true
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    getSelectedEntity.mockImplementation(() => initialState);
    getSelectedEntityId.mockImplementation(() => 'mockId');
    expect(selectDispositionsFormInitialValues()).toMatchSnapshot();
  });

  it('Return the initial Disposition Values, all values NOT provided', () => {
    const initialState = fromJS({
      id: 'mockId'
    });
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectDispositionsFormInitialValues()).toMatchSnapshot();
  });
});
