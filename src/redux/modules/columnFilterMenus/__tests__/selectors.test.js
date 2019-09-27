/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import * as sel from '../selectors';
import { fromJS } from 'immutable';

describe('selectVisibleSubMenu selector', () => {
  it('returns the string of the visible subMenu', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          visibleMenu: 'mock visible sub menu'
        }
      }
    });
    expect(sel.selectVisibleSubMenu(initialState, { tableType: 'mockTable' })).toEqual('mock visible sub menu');
  });
  it('returns undefined when you dont pass the tableType prop in', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          visibleMenu: 'mock visible sub menu'
        }
      }
    });
    expect(sel.selectVisibleSubMenu(initialState, {})).toEqual(undefined);
  });
});
describe('areAllActive selector', () => {
  it('returns true if all menu items are active', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          mockColumns: [
            { name: 'mockColumn_1', active: true },
            { name: 'mockColumn_2', active: true },
            { name: 'mockColumn_3', active: true },
            { name: 'mockColumn_4', active: true }
          ]
        }
      }
    });
    expect(
      sel.areAllActive(initialState, {
        menuType: 'mockColumns',
        tableType: 'mockTable'
      })
    ).toEqual(true);
  });
  it('returns false if any menu item is not active', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          mockColumns: [
            { name: 'mockColumn_1', active: true },
            { name: 'mockColumn_2', active: true },
            { name: 'mockColumn_3', active: false },
            { name: 'mockColumn_4', active: true }
          ]
        }
      }
    });
    expect(
      sel.areAllActive(initialState, {
        menuType: 'mockColumns',
        tableType: 'mockTable'
      })
    ).toEqual(false);
  });
  it('returns true if you dont pass menuType or tableType props. It should show all rows if filter is empty.', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          mockColumns: [
            { name: 'mockColumn_1', active: true },
            { name: 'mockColumn_2', active: true },
            { name: 'mockColumn_3', active: false },
            { name: 'mockColumn_4', active: true }
          ]
        }
      }
    });
    expect(sel.areAllActive(initialState, {})).toEqual(true);
  });
});

describe('totalRatio selector', () => {
  it('returns the ratio of active to non-active menu items', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          mockColumns: [
            { name: 'mockColumn_1', active: true },
            { name: 'mockColumn_2', active: true },
            { name: 'mockColumn_3', active: false },
            { name: 'mockColumn_4', active: true }
          ]
        }
      }
    });
    expect(
      sel.totalRatio(initialState, {
        menuType: 'mockColumns',
        tableType: 'mockTable'
      })
    ).toEqual([3, 4]);
  });
});

describe('selectInteractionMonitoringColumns selector', () => {
  it('returns the interaction monitoring columns', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        interactionMonitoring: {
          Columns: [
            { name: 'mockColumn_1', active: true },
            { name: 'mockColumn_2', active: true },
            { name: 'mockColumn_3', active: false },
            { name: 'mockColumn_4', active: true }
          ]
        }
      }
    });
    expect(
      sel.selectInteractionMonitoringColumns(initialState, {
        menuType: 'Columns',
        tableType: 'interactionMonitoring'
      })
    ).toMatchSnapshot();
  });
});

describe('selectGroups selector', () => {
  it('returns the groups of a given menu', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          Groups: [
            { name: 'mockGroup_1', active: true },
            { name: 'mockGroup_2', active: true },
            { name: 'mockGroup_3', active: false },
            { name: 'mockGroup_4', active: true }
          ]
        }
      }
    });
    expect(
      sel.selectGroups(initialState, {
        menuType: 'Groups',
        tableType: 'mockTable'
      })
    ).toMatchSnapshot();
  });
});

describe('selectSkills selector', () => {
  it('returns the skills of a given menu', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          Skills: [
            { name: 'mockSkill_1', active: true },
            { name: 'mockSkill_2', active: true },
            { name: 'mockSkill_3', active: false },
            { name: 'mockSkill_4', active: true }
          ]
        }
      }
    });
    expect(
      sel.selectSkills(initialState, {
        menuType: 'Skills',
        tableType: 'mockTable'
      })
    ).toMatchSnapshot();
  });
});

describe('areAllColNotActive selector', () => {
  it('returns true if all menu items are not active', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          mockItems: [
            { name: 'mockItem_1', active: false },
            { name: 'mockItem_2', active: false },
            { name: 'mockItem_3', active: false },
            { name: 'mockItem_4', active: false }
          ]
        }
      }
    });
    expect(
      sel.areAllColNotActive(initialState, {
        menuType: 'mockItems',
        tableType: 'mockTable'
      })
    ).toEqual(true);
  });
  it('returns false if any menu items are active', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          mockItems: [
            { name: 'mockItem_1', active: false },
            { name: 'mockItem_2', active: true },
            { name: 'mockItem_3', active: false },
            { name: 'mockItem_4', active: false }
          ]
        }
      }
    });
    expect(
      sel.areAllColNotActive(initialState, {
        menuType: 'mockItems',
        tableType: 'mockTable'
      })
    ).toEqual(false);
  });
  it('returns true if menuType and tableType props are not passed in', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        mockTable: {
          mockItems: [
            { name: 'mockItem_1', active: false },
            { name: 'mockItem_2', active: true },
            { name: 'mockItem_3', active: false },
            { name: 'mockItem_4', active: false }
          ]
        }
      }
    });
    expect(sel.areAllColNotActive(initialState, {})).toEqual(true);
  });
});

describe('selectTimeFormat selector', () => {
  it('returns a true if users time is in 12 hour format', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        twelveHourFormat: true
      }
    });
    expect(sel.selectTimeFormat(initialState)).toEqual(true);
  });
});

describe('selectInteractionMonitoringActiveColumns selector', () => {
  it('returns interaction monitoring active columns', () => {
    const initialState = fromJS({
      ColumnFilterMenus: {
        interactionMonitoring: {
          Columns: [{ active: true }, { active: false }, { active: true }, { active: true }]
        }
      }
    });
    expect(sel.selectInteractionMonitoringActiveColumns(initialState)).toMatchSnapshot();
  });
});
