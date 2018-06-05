/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getSelectedEntity } from '../../selectors';
import { getListTypeName, getInitialUpdateFormValues } from '../selectors';

jest.mock('../../selectors');
const mockSelectedEntity = fromJS({
  name: 'mock list name',
  shared: true,
  listType: {
    name: 'mock list type name'
  }
});
getSelectedEntity.mockImplementation(() => mockSelectedEntity);

describe('getListTypeName', () => {
  it('gets the name of the list type', () => {
    expect(getListTypeName()).toEqual('mock list type name');
  });
});

describe('getInitialUpdateFormValues', () => {
  it('returns a map of the initial values needed for the update form', () => {
    expect(getInitialUpdateFormValues()).toMatchSnapshot();
  });
});
