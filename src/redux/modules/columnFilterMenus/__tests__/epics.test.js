// /*
//  * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
//  */

import { createStore } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { fromJS } from 'immutable';
import { mockStore } from '../../../../utils/testUtils';
import { sdkPromise } from '../../../../utils/sdk';

import { SaveColumnsToLocalStorage, UpdateStatSubscriptionFilters, UpdateSkillsAndGroupsFilter } from '../epics';

import { selectInteractionMonitoringColumns, selectGroups, selectSkills, selectTable } from '../selectors';

import { getCurrentEntity } from '../../entities/selectors';

jest.mock('../../../../utils/sdk');
jest.mock('../selectors');
const mockSkills = [
  { active: true, skillId: '001' },
  { active: true, skillId: '002' },
  { active: false, skillId: '003' }
];
const mockGroups = [
  { active: true, groupId: '001' },
  { active: true, groupId: '002' },
  { active: false, groupId: '003' }
];
const mockTable = {
  Columns: [{ name: 'Groups', active: true }, { name: 'Skills', active: false }],
  Groups: mockGroups,
  Skills: mockSkills
};
const testState = {
  ColumnFilterMenus: {
    interactionMonitoring: mockTable
  }
};
selectInteractionMonitoringColumns.mockReturnValue('mockColumnData');
selectSkills.mockReturnValue(mockSkills);
selectGroups.mockReturnValue(mockGroups);
selectTable.mockReturnValue(fromJS(mockTable));
jest.mock('../../entities/selectors');
getCurrentEntity.mockReturnValue('interactionMonitoring');

describe('SaveColumnsToLocalStorage', () => {
  it('localstorage is updated on column changes', done => {
    const lsTestStore = createStore(state => state, fromJS(testState));
    const action = ActionsObservable.of({
      type: 'TOGGLE_MENUITEMS',
      tableType: 'interactionMonitoring'
    });
    SaveColumnsToLocalStorage(action, lsTestStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('UpdateSkillsAndGroupsFilter', () => {
  it('localstorage is updated on skills column changes', done => {
    const action = ActionsObservable.of({
      type: 'FETCH_DATA_FULFILLED',
      entityName: 'skills',
      response: { result: 'results' },
      tableType: 'mockTableSkills'
    });
    UpdateSkillsAndGroupsFilter(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('localstorage is updated on groups column changes', done => {
    const action = ActionsObservable.of({
      type: 'FETCH_DATA_FULFILLED',
      entityName: 'groups',
      response: { result: 'results' },
      tableType: 'mockTableGroups'
    });
    UpdateSkillsAndGroupsFilter(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('UpdateStatSubscriptionFilters', () => {
  afterEach(() => {
    sdkPromise.mockClear();
  });
  it('dispatch the proper action on success: skills / empty array', done => {
    selectSkills.mockReturnValueOnce([]);
    selectGroups.mockReturnValueOnce([]);
    sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
    const action = ActionsObservable.of({
      type: 'TOGGLE_ALL_MENUITEMS_OFF',
      menuType: 'Skills'
    });
    UpdateStatSubscriptionFilters(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('dispatch the proper action on success: groups / empty array', done => {
    selectSkills.mockReturnValueOnce([]);
    selectGroups.mockReturnValueOnce([]);
    sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
    const action = ActionsObservable.of({
      type: 'TOGGLE_ALL_MENUITEMS_OFF',
      menuType: 'Groups'
    });
    UpdateStatSubscriptionFilters(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('dispatch the proper action on success: skills', done => {
    sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
    const action = ActionsObservable.of({
      type: 'TOGGLE_ALL_MENUITEMS_OFF',
      menuType: 'Skills'
    });
    UpdateStatSubscriptionFilters(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('dispatch the proper action on success: groups', done => {
    sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
    const action = ActionsObservable.of({
      type: 'TOGGLE_ALL_MENUITEMS_OFF',
      menuType: 'Groups'
    });
    UpdateStatSubscriptionFilters(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('dispatch the proper action on failure: skills', done => {
    sdkPromise.mockReturnValue(new Promise((resolve, reject) => reject(new Error())));
    const action = ActionsObservable.of({
      type: 'TOGGLE_ALL_MENUITEMS_OFF',
      menuType: 'Skills'
    });
    UpdateStatSubscriptionFilters(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('dispatch the proper action on failure: groups', done => {
    sdkPromise.mockReturnValue(new Promise((resolve, reject) => reject(new Error())));
    const action = ActionsObservable.of({
      type: 'TOGGLE_ALL_MENUITEMS_OFF',
      menuType: 'Groups'
    });
    UpdateStatSubscriptionFilters(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
