/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getSkillMemberSidePanelTableItems, getSkillMembers } from '../selectors';
import { getSelectedEntity, getSelectedEntityId } from '../../selectors';

const mockCurrentForm = fromJS({
  values: {
    hasProficiency: 'mock hasProficiency value'
  }
});

const initialState = fromJS({
  Entities: {
    identityProviders: {
      data: [
        {
          id: 'mockId1',
          name: 'mockName1',
          active: true
        },
        {
          id: 'mockId2',
          name: 'mockName2',
          active: false
        }
      ]
    },
    users: {
      data: [
        {
          id: '1',
          email: 'mockEmail 1',
          firstName: 'mockFirstName 1',
          lastName: 'mockLastName 1',
          platformStatus: 'enabled',
          status: 'enabled',
          hasProficiency: true,
          skills: [
            {
              id: 'mockEntityId',
              proficiency: undefined
            }
          ]
        },
        {
          id: '2',
          email: 'mockEmail 2',
          firstName: 'mockFirstName 2',
          lastName: 'mockLastName 2',
          platformStatus: 'enabled',
          status: 'disabled',
          hasProficiency: false,
          skills: [
            {
              id: 'mockEntityId',
              proficiency: undefined
            }
          ]
        },
        {
          id: '3',
          email: 'mockEmail 3',
          firstName: 'mockFirstName 3',
          lastName: 'mockLastName 3',
          platformStatus: 'disabled',
          status: 'enabled',
          hasProficiency: true,
          skills: [
            {
              id: 'mockEntityId',
              proficiency: undefined
            }
          ]
        }
      ],
      userExistInPlatform: true
    }
  }
});

jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm
}));

jest.mock('../../listItemSelectors', () => ({
  getDependantEntityTableItems: () => [
    {
      id: '1',
      email: 'mockEmail 1',
      firstName: 'mockFirstName 1',
      lastName: 'mockLastName 1',
      platformStatus: 'enabled',
      status: 'enabled',
      skills: [
        {
          id: 'mockEntityId',
          proficiency: undefined
        }
      ]
    },
    {
      id: '2',
      email: 'mockEmail 2',
      firstName: 'mockFirstName 2',
      lastName: 'mockLastName 2',
      platformStatus: 'enabled',
      status: 'disabled',
      skills: [
        {
          id: 'mockEntityId',
          proficiency: undefined
        }
      ]
    }
  ]
}));

jest.mock('../../selectors');
getSelectedEntity.mockImplementation(() => fromJS({ id: 'mockEntityId', hasProficiency: true }));
getSelectedEntityId.mockImplementation(() => 'mockEntityId');

describe('getSkillMemberSidePanelTableItems', () => {
  it('Get the members', () => {
    expect(getSkillMemberSidePanelTableItems(initialState)).toMatchSnapshot();
  });
});

describe('getSkillMembers', () => {
  it('Get just the skill members', () => {
    let getSelectedEntityResult = fromJS({ id: 'mockEntityId', hasProficiency: true });
    let getDependantEntityTableItemsResult = [
      {
        id: '1',
        email: 'mockEmail 1',
        firstName: 'mockFirstName 1',
        lastName: 'mockLastName 1',
        platformStatus: 'enabled',
        status: 'enabled',
        skills: [
          {
            id: 'mockEntityId',
            proficiency: undefined
          }
        ]
      },
      {
        id: '2',
        email: 'mockEmail 2',
        firstName: 'mockFirstName 2',
        lastName: 'mockLastName 2',
        platformStatus: 'enabled',
        status: 'disabled',
        skills: [
          {
            id: 'mockEntityId',
            proficiency: undefined
          }
        ]
      }
    ];

    expect(getSkillMembers(getSelectedEntityResult, getDependantEntityTableItemsResult)).toMatchSnapshot();
  });
});
