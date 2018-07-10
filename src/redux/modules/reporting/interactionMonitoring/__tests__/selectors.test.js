/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import * as sel from '../selectors';
import { fromJS } from 'immutable';

describe('selectInteractionMonitoringTableData', () => {
  it('returns the interaction monitoring data', () => {
    const initialState = fromJS({
      InteractionMonitoring: {
        data: [{ item1: 'item1' }, { item2: 'item2' }]
      }
    });
    expect(
      sel.selectInteractionMonitoringTableData(initialState)
    ).toMatchSnapshot();
  });
});

describe('selectInteractionMonitoringSorted', () => {
  it('returns the interaction monitoring sorted', () => {
    const initialState = fromJS({
      InteractionMonitoring: {
        sorted: [{ item1: 'item1' }, { item2: 'item2' }]
      }
    });
    expect(
      sel.selectInteractionMonitoringSorted(initialState)
    ).toMatchSnapshot();
  });
});

describe('selectInteractionMonitoringExpanded', () => {
  it('returns the interaction monitoring expanded', () => {
    const initialState = fromJS({
      InteractionMonitoring: {
        expanded: { item1: 'item1' }
      }
    });
    expect(
      sel.selectInteractionMonitoringExpanded(initialState)
    ).toMatchSnapshot();
  });
});

describe('selectInteractionMonitoringSelected', () => {
  it('returns the interaction monitoring selected', () => {
    const initialState = fromJS({
      InteractionMonitoring: {
        selected: 'item1'
      }
    });
    expect(
      sel.selectInteractionMonitoringSelected(initialState)
    ).toMatchSnapshot();
  });
});

describe('userHasMonitorAllCallsPermission', () => {
  it('returns true if the user has the proper permission', () => {
    const initialState = fromJS({
      UserData: {
        permissions: ['mockPermission1']
      },
      InteractionMonitoring: {
        monitorAllCallsPermission: ['mockPermission1'],
        bargeAllCallsPermission: ['mockPermission2'],
        viewAllMonitoredCallsPermission: ['mockPermission3']
      }
    });
    expect(
      sel.userHasMonitorAllCallsPermission(initialState)
    ).toMatchSnapshot();
  });
});

describe('userHasBargeAllCallsPermission', () => {
  it('returns true if the user has the proper permission', () => {
    const initialState = fromJS({
      UserData: {
        permissions: ['mockPermission2']
      },
      InteractionMonitoring: {
        monitorAllCallsPermission: ['mockPermission1'],
        bargeAllCallsPermission: ['mockPermission2'],
        viewAllMonitoredCallsPermission: ['mockPermission3']
      }
    });
    expect(sel.userHasBargeAllCallsPermission(initialState)).toMatchSnapshot();
  });
});

describe('userHasViewAllMonitoredCallsPermission', () => {
  it('returns true if the user has the proper permission', () => {
    const initialState = fromJS({
      UserData: {
        permissions: ['mockPermission3']
      },
      InteractionMonitoring: {
        monitorAllCallsPermission: ['mockPermission1'],
        bargeAllCallsPermission: ['mockPermission2'],
        viewAllMonitoredCallsPermission: ['mockPermission3']
      }
    });
    expect(
      sel.userHasViewAllMonitoredCallsPermission(initialState)
    ).toMatchSnapshot();
  });
});
