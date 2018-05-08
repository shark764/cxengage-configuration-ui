/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Reducer
import InteractionMonitoring from '../index';

// initialState
import { initialState } from '../index';

// Actions
import {
  updateTableData,
  setExpanded,
  setSelected,
  setSorted,
  removeSelected
} from '../index';

describe('columnFilterMenus reducer snapshots', () => {
  it('returns the correct initial state', () => {
    expect(InteractionMonitoring(initialState, {})).toMatchSnapshot();
  });
  it('dispatches updateTableData', () => {
    const mockInitialState = fromJS({
      data: [{ item1: 'item1' }, { item2: 'item2' }]
    });
    expect(
      InteractionMonitoring(
        mockInitialState,
        updateTableData([{ item3: 'item3', item4: 'item4' }])
      )
    ).toMatchSnapshot();
  });
  it('dispatches setExpanded', () => {
    const mockInitialState = fromJS({
      expanded: { item1: 'item1' }
    });
    expect(
      InteractionMonitoring(mockInitialState, setExpanded({ item2: 'item2' }))
    ).toMatchSnapshot();
  });
  it('dispatches setSorted', () => {
    const mockInitialState = fromJS({
      sorted: [{ item1: 'item1' }, { item2: 'item2' }]
    });
    expect(
      InteractionMonitoring(
        mockInitialState,
        setSorted([{ item3: 'item3', item4: 'item4' }])
      )
    ).toMatchSnapshot();
  });
  it('dispatches removeSelected', () => {
    const mockInitialState = fromJS({
      selected: 'item1',
      expanded: { item1: 'item1' }
    });
    expect(
      InteractionMonitoring(mockInitialState, removeSelected())
    ).toMatchSnapshot();
  });
  it('dispatches setSelected', () => {
    const mockInitialState = fromJS({
      selected: 'item1',
      expanded: { item1: 'item1' }
    });
    expect(
      InteractionMonitoring(
        mockInitialState,
        setSelected('item2', { item2: 'item2' })
      )
    ).toMatchSnapshot();
  });
});
