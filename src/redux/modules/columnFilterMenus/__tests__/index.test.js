/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Reducer
import ColumnsMenu from '../index';

// initialState
import { initialState } from '../index';

// Actions
import {
  toggleMenuItems,
  oneOnRestOff,
  updateGroupsColumnFilter,
  updateSkillsColumnFilter,
  setVisibleMenu,
  toggleAllMenuItemsOn,
  toggleAllMenuItemsOff,
  toggleAllInverseMenuItems,
  toggleTimeFormat
} from '../index';

describe('columnFilterMenus reducer snapshots', () => {
  it('returns the correct initial state', () => {
    expect(ColumnsMenu(initialState, {})).toMatchSnapshot();
  });
  it('dispatches toggleMenuItems', () => {
    const mockInitialState = fromJS({
      mockTable: {
        mockMenu: [
          { name: 'item1', active: false },
          { name: 'item2', active: false },
          { name: 'item3', active: false }
        ]
      }
    });
    expect(
      ColumnsMenu(
        mockInitialState,
        toggleMenuItems('item1', 'mockMenu', 'mockTable')
      )
    ).toMatchSnapshot();
  });
  it('dispatches oneOnRestOff', () => {
    const mockInitialState = fromJS({
      mockTable: {
        mockMenu: [
          { name: 'item1', active: true },
          { name: 'item2', active: true },
          { name: 'item3', active: false }
        ]
      }
    });
    expect(
      ColumnsMenu(
        mockInitialState,
        oneOnRestOff('item3', 'mockMenu', 'mockTable')
      )
    ).toMatchSnapshot();
  });
  it('dispatches updateGroupsColumnFilter', () => {
    const mockInitialState = fromJS({
      mockTable: {
        Groups: []
      }
    });
    expect(
      ColumnsMenu(
        mockInitialState,
        updateGroupsColumnFilter(
          ['mockGroupData1', 'mockGroupData2'],
          'mockTable'
        )
      )
    ).toMatchSnapshot();
  });
  it('dispatches updateSkillsColumnFilter', () => {
    const mockInitialState = fromJS({
      mockTable: {
        Skills: []
      }
    });
    expect(
      ColumnsMenu(
        mockInitialState,
        updateSkillsColumnFilter(
          ['mockSkillsData1', 'mockSkillsData2'],
          'mockTable'
        )
      )
    ).toMatchSnapshot();
  });
  it('dispatches setVisibleMenu', () => {
    const mockInitialState = fromJS({
      mockTable: {
        visibleMenu: 'none'
      }
    });
    expect(
      ColumnsMenu(mockInitialState, setVisibleMenu('Groups', 'mockTable'))
    ).toMatchSnapshot();
  });
  it('dispatches toggleAllMenuItemsOn', () => {
    const mockInitialState = fromJS({
      mockTable: {
        mockMenu: [
          { name: 'item1', active: false },
          { name: 'item2', active: true },
          { name: 'item3', active: false }
        ]
      }
    });
    expect(
      ColumnsMenu(
        mockInitialState,
        toggleAllMenuItemsOn('mockMenu', 'mockTable')
      )
    ).toMatchSnapshot();
  });
  it('dispatches toggleAllMenuItemsOff', () => {
    const mockInitialState = fromJS({
      mockTable: {
        mockMenu: [
          { name: 'item1', active: true },
          { name: 'item2', active: true },
          { name: 'item3', active: false }
        ]
      }
    });
    expect(
      ColumnsMenu(
        mockInitialState,
        toggleAllMenuItemsOff('mockMenu', 'mockTable')
      )
    ).toMatchSnapshot();
  });
  it('dispatches toggleAllInverseMenuItems', () => {
    const mockInitialState = fromJS({
      mockTable: {
        mockMenu: [
          { name: 'item1', active: false },
          { name: 'item2', active: true },
          { name: 'item3', active: false }
        ]
      }
    });
    expect(
      ColumnsMenu(
        mockInitialState,
        toggleAllInverseMenuItems('mockMenu', 'mockTable')
      )
    ).toMatchSnapshot();
  });
  it('dispatches toggleTimeFormat', () => {
    const mockInitialState = fromJS({
      twelveHourFormat: true
    });
    expect(ColumnsMenu(mockInitialState, toggleTimeFormat())).toMatchSnapshot();
  });
});
