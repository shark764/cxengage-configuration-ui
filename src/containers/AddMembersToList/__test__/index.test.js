/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from 'TestUtils';
import { getCurrentEntity, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import AddMemberToListLayout, { mapStateToProps, actions } from '../';
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

jest.mock('../../../redux/modules/entities/selectors');
getCurrentEntity.mockImplementation(() => 'skills');
userHasUpdatePermission.mockImplementation(() => true);

jest.mock('../../../redux/modules/entities', () => ({
  setSelectedSubEntityId: () => 'mockId',
  addListItem: () => 'mockListItems',
  toggleEntityListItemActive: () => true
}));

jest.mock('../selectors');
selectSidePanelTableItems.mockImplementation(() => []);

describe('AddMemberToListLayout Renders', () => {
  it('renders', () => {
    const rendered = shallow(<AddMemberToListLayout store={mockStore} />);
    expect(rendered).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('actions', () => {
  it('onCancel returns setSelectedSubEntityId(undefined)', () => {
    expect(actions.onCancel()).toMatchSnapshot();
  });
});
