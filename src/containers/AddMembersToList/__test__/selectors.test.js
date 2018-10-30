/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectSidePanelTableItems } from '../selectors';

const initialState = fromJS({
  Entities: {
    outboundIdentifierLists: {
      data: [
        {
          id: 'mockId',
          name: 'mockName',
          dependentEntity: 'outboundIdentifiers'
        }
      ]
    }
  }
});

jest.mock('../../../redux/modules/entities/selectors', () => ({
  availableEntitiesForList: () => [],
  availableItemsForList: () => [],
  availablePermissionsForList: () => [],
  getCurrentEntity: () => 'skills'
}));

describe('selectSidePanelTableItems', () => {
  it('gets the correct props for entity given', () => {
    expect(selectSidePanelTableItems(initialState, 'skills')).toMatchSnapshot();
  });
});
