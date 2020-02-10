/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { List, fromJS } from 'immutable';
import { selectCustomAtributesFormInitialValues, getAvailableCustomAttributesIdentifiers } from '../selectors';

describe('Custom Attributes Selector tests', () => {
  const mockState = fromJS({
    Entities: {
      customAttributes: {
        data: [
          { name: 'mock-name-1', identifier: 'mock-id-1', id: 'mockEntityId', active: true },
          { name: 'mock-name-2', identifier: 'mock-id-2' }
        ]
      },
      currentEntity: 'customAttributes'
    }
  });
  it('selectCustomAtributesFormInitialValues - returns initial values while creating a new custom attribute', () => {
    const updatedMockState = mockState.setIn(['Entities', 'customAttributes', 'selectedEntityId'], 'create');
    expect(selectCustomAtributesFormInitialValues(updatedMockState)).toMatchSnapshot();
  });
  it('selectCustomAtributesFormInitialValues - returns initial values while updating a custom attribute', () => {
    const updatedMockState = mockState.setIn(['Entities', 'customAttributes', 'selectedEntityId'], 'mockEntityId');
    expect(selectCustomAtributesFormInitialValues(updatedMockState)).toMatchSnapshot();
  });
  it('getAvailableCustomAttributesIdentifiers - returns available custom attribute identifiers', () => {
    expect(getAvailableCustomAttributesIdentifiers(fromJS(mockState))).toMatchSnapshot();
  });
  it('getAvailableCustomAttributesIdentifiers - returns false when no custom attributes are available in the loggedin tenant', () => {
    const updatedMockState = mockState.setIn(['Entities', 'customAttributes', 'data'], List([]));
    expect(getAvailableCustomAttributesIdentifiers(updatedMockState)).toMatchSnapshot();
  });
});
