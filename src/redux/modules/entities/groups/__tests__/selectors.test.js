/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getDependantEntityTableItems } from '../../listItemSelectors';
import { getGroupsDependantEntityTableItems } from '../selectors';

const initialState = fromJS({
  Entities: {
    users: {
      data: [
        {
          id: '1',
          email: 'mockEmail 1',
          firstName: 'mockFirstName 1',
          lastName: 'mockLastName 1',
          platformStatus: 'enabled',
          status: 'enabled'
        },
        {
          id: '2',
          email: 'mockEmail 2',
          firstName: 'mockFirstName 2',
          lastName: 'mockLastName 2',
          platformStatus: 'enabled',
          status: 'disabled'
        },
        {
          id: '3',
          email: 'mockEmail 3',
          firstName: 'mockFirstName 3',
          lastName: 'mockLastName 3',
          platformStatus: 'disabled',
          status: 'enabled'
        }
      ],
      userExistInPlatform: true
    }
  }
});

const listMembers = [
  {
    id: '1',
    email: 'mockEmail 1',
    firstName: 'mockFirstName 1',
    lastName: 'mockLastName 1',
    platformStatus: 'enabled',
    status: 'enabled'
  },
  {
    id: '2',
    email: 'mockEmail 2',
    firstName: 'mockFirstName 2',
    lastName: 'mockLastName 2',
    platformStatus: 'enabled',
    status: 'disabled'
  },
  {
    id: '3',
    email: 'mockEmail 3',
    firstName: 'mockFirstName 3',
    lastName: 'mockLastName 3',
    platformStatus: 'disabled',
    status: 'enabled'
  }
];

jest.mock('../../listItemSelectors');
getDependantEntityTableItems.mockImplementation(() => listMembers);

describe('getGroupsDependantEntityTableItems', () => {
  it('Gets the sub-entity table items (users)', () => {
    expect(getGroupsDependantEntityTableItems(initialState)).toMatchSnapshot();
  });
});
