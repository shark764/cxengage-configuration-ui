/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import { mockStore } from '../../../../../utils/testUtils';
import { fromJS } from 'immutable';
import { from } from 'rxjs'; // unit tests fail without this import
import * as epc from '../epics';

import { generateUUID } from 'serenova-js-utils/uuid';
import { sdkPromise } from '../../../../../utils/sdk';
import { getContactLayoutsFormSubmitValues } from '../selectors';
import { getCurrentFormValues } from '../../../form/selectors';
import { getContactAttributes, getMandatoryContactAttributes } from '../../contactAttributes/selectors';
import { getCurrentEntity, getSelectedEntityId, isEntityFetching, getSelectedEntity } from '../../selectors';

jest.mock('serenova-js-utils/uuid');
jest.mock('../../../../../utils/sdk');
jest.mock('../selectors');
jest.mock('../../../form/selectors');
jest.mock('../../contactAttributes/selectors');
jest.mock('../../selectors');

const mockSelectedEntity = fromJS({
  id: 'mockContactLayoutId1',
  name: 'mockContactLayoutName1',
  description: 'mockContactLayoutDescription1',
  layout: [
    {
      label: { 'en-US': 'mock label' },
      attributes: ['mockcontactAttributeId1']
    }
  ],
  active: true
});

const mockContactAttributes = fromJS([
  {
    id: 'mockcontactAttributeId1',
    objectName: 'mockContactAttributeName1',
    active: true,
    mandatory: true
  },
  {
    id: 'mockContactAttributeId2',
    name: 'mockContactAttributeName2',
    active: false
  }
]);

const mockFormValues = fromJS({
  id: 'mockContactLayoutId',
  name: 'mockLayoutName',
  layout: [
    {
      draggableUUID: 'mockDraggableUUID1',
      categoryUUID: 'mockCategoryUUID1',
      endpointUUID: 'mockEndpointUUID1',
      droppableUUID: 'mockDroppableUUID1',
      hierarchy: 'mockHierarchy1',
      name: 'mockContactAttributeName1',
      contactAttributeId: 'mockContactAttributeId1',
      label: { 'en-US': 'hierarchyInEnglish', 'fr-CA': 'hierarchyInFrench' }
    },
    {
      draggableUUID: 'mockDraggableUUID2',
      categoryUUID: 'mockCategoryUUID2',
      endpointUUID: 'mockEndpointUUID2',
      droppableUUID: 'mockDroppableUUID2',
      hierarchy: 'mockHierarchy2',
      name: 'mockContactAttributeName2',
      contactAttributeId: 'mockContactAttributeId2',
      label: { 'en-US': 'hierarchyInEnglish', 'fr-CA': 'hierarchyInFrench' }
    }
  ]
});

generateUUID.mockImplementation(() => 'mockUUID');
isEntityFetching.mockImplementation(() => false);
getCurrentEntity.mockImplementation(() => 'contactLayouts');
from && from.mockReturnValue(undefined); // this disables the esLint "no-unused-var" error
sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));

getSelectedEntity.mockImplementation(() => mockSelectedEntity);
getCurrentFormValues.mockImplementation(() => mockFormValues);
getContactLayoutsFormSubmitValues.mockImplementation(() => mockSelectedEntity);
getContactAttributes.mockImplementation(() => mockContactAttributes);
getMandatoryContactAttributes.mockImplementation(() => fromJS([mockContactAttributes.get(0)]));

describe('Contact Layouts Epics tests', () => {
  it('getAttributesAfterFetchingContactLayouts', done => {
    const action = ActionsObservable.of({
      type: 'FETCH_DATA_FULFILLED',
      entityName: 'contactLayouts'
    });
    epc.getAttributesAfterFetchingContactLayouts(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  describe('InitContactLayoutsForm', () => {
    it('when selectedEntityId === create', done => {
      const action = ActionsObservable.of({
        type: 'SET_SELECTED_ENTITY_ID',
        entityId: 'create'
      });
      getSelectedEntityId.mockImplementation(() => 'create');
      epc.InitContactLayoutsForm(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
    it('when selectedEntityId !== create', done => {
      const action = ActionsObservable.of({
        type: 'SET_SELECTED_ENTITY_ID',
        entityId: 'mockId'
      });
      getSelectedEntityId.mockImplementation(() => 'mockSelectedEntityId');
      epc.InitContactLayoutsForm(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  it('ContactLayoutsSubEntityFormSubmission', done => {
    const action = ActionsObservable.of({
      type: 'SUB_ENTITY_FORM_SUBMIT',
      dirty: true,
      values: fromJS({ layout: 'mockLayout' })
    });
    getSelectedEntityId.mockImplementation(() => 'mockSelectedEntityId');
    epc.ContactLayoutsSubEntityFormSubmission(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  describe('ContactLayoutsFormSubmission', () => {
    it('while creating a contact layout', done => {
      const action = ActionsObservable.of({
        type: 'FORM_SUBMIT',
        values: fromJS({ a: 'mockValues' })
      });
      getSelectedEntityId.mockImplementation(() => 'create');
      epc.ContactLayoutsFormSubmission(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
    it('while updating a contact layout', done => {
      const action = ActionsObservable.of({
        type: 'FORM_SUBMIT',
        values: fromJS({ a: 'mockValues' })
      });
      getSelectedEntityId.mockImplementation(() => 'mockSelectedEntityId');
      epc.ContactLayoutsFormSubmission(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  it('UpdateContactLayoutsList', done => {
    const action = ActionsObservable.of({
      type: 'UPDATE_ENTITY',
      entityName: 'contactLayouts',
      values: { a: 'mockValues' }
    });
    getSelectedEntityId.mockImplementation(() => 'mockSelectedEntityId');
    epc.UpdateContactLayoutsList(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('ReInitContactLayoutsForm', done => {
    const action = ActionsObservable.of({
      type: 'UPDATE_ENTITY_FULFILLED',
      entityName: 'contactLayouts',
      entityId: 'mockEntityId',
      response: { result: mockSelectedEntity.toJS() }
    });
    epc.ReInitContactLayoutsForm(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('RemoveContactLayoutsListItem', done => {
    const action = ActionsObservable.of({
      type: 'REMOVE_CONTACT_LAYOUTS_LIST_ITEM',
      entityName: 'contactLayouts',
      entityId: 'mockEntityId',
      values: fromJS({ layout: 'mockLayout' })
    });
    getSelectedEntityId.mockImplementation(() => 'mockSelectedEntityId');
    epc.RemoveContactLayoutsListItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('ToggleContactLayoutItem', done => {
    const action = ActionsObservable.of({
      type: 'TOGGLE_ENTITY'
    });
    epc.ToggleContactLayoutItem(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('FetchContactLayoutsAfterToggle', done => {
    const action = ActionsObservable.of({
      type: 'TOGGLE_ENTITY_FULFILLED',
      entityName: 'contactLayouts'
    });
    epc.FetchContactLayoutsAfterToggle(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
