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
import { entitiesMetaData } from '../../metaData';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntityBulkChangeItems,
  isItemInherited
} from '../../selectors';
import { getContactAttributesFormSubmitValues } from '../selectors';

jest.mock('serenova-js-utils/uuid');
jest.mock('../../../../../utils/sdk');
jest.mock('../../metaData');
jest.mock('../../selectors');
jest.mock('../selectors');
jest.mock('../../metaData');

const mockFormValues = fromJS({
  id: 'mockEntityId',
  objectName: 'mockName',
  active: true,
  mandatory: true,
  label: [
    {
      label: 'mockEnglishLabel',
      language: 'en-US'
    },
    {
      label: 'mockFrenchLabel',
      language: 'fr-CA'
    }
  ]
});

const selectedEntity = {
  id: 'mockEntityId',
  objectName: 'mockName',
  active: true,
  mandatory: true,
  label: {
    'en-US': 'mockEnglishLabel',
    'fr-CA': 'mockFrenchLabel'
  }
};

const contactAttributesStore = fromJS([
  {
    id: 'mockEntityId1',
    objectName: 'mockName1',
    default: 'default1',
    tenantId: '',
    active: true,
    mandatory: false,
    label: {
      'en-US': 'mockEnglishLabel',
      'fr-CA': 'mockFrenchLabel'
    }
  },
  {
    id: 'mockEntityId2',
    objectName: 'mockName2',
    default: 'default2',
    active: false,
    mandatory: true,
    tenantId: '',
    label: {
      'en-US': 'mockEnglishLabel',
      'fr-CA': 'mockFrenchLabel'
    }
  },
  {
    id: 'mockEntityId3',
    objectName: 'mockName3',
    default: 'default3',
    active: true,
    mandatory: false,
    tenantId: '',
    label: {
      'en-US': 'mockEnglishLabel',
      'fr-CA': 'mockFrenchLabel'
    }
  }
]);

generateUUID.mockImplementation(() => 'mockUUID');
from && from.mockReturnValue(undefined); // this disables the esLint "no-unused-var" error
sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
entitiesMetaData.contactAttributes.entityApiRequest.mockImplementation(() => ({ data: {} }));

getCurrentEntity.mockImplementation(() => 'contactAttributes');
getContactAttributesFormSubmitValues.mockImplementation(() => mockFormValues);
getSelectedEntityId.mockImplementation(() => 'mockEntityId');
getSelectedEntityBulkChangeItems.mockImplementation(() => contactAttributesStore);

describe('Contact Attributes Epics tests', () => {
  describe('ToggleContacAttributeItem', () => {
    it('when actionType is UPDATE_ENTITY', done => {
      const action = ActionsObservable.of({
        type: 'UPDATE_ENTITY',
        entityName: 'contactAttributes',
        entityId: 'mockEntityId',
        values: { a: mockFormValues }
      });
      epc.ToggleContacAttributeItem(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
    it('when actionType is TOGGLE_ENTITY', done => {
      const action = ActionsObservable.of({
        type: 'TOGGLE_ENTITY',
        entityName: 'contactAttributes'
      });
      epc.ToggleContacAttributeItem(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  describe('ReInitContactAttributesFormForm', () => {
    it('when actionType is UPDATE_ENTITY_FULFILLED', done => {
      const action = ActionsObservable.of({
        type: 'UPDATE_ENTITY_FULFILLED',
        entityName: 'contactAttributes',
        entityId: 'mockEntityId',
        response: { result: selectedEntity }
      });
      epc.ReInitContactAttributesFormForm(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
    it('when actionType is TOGGLE_ENTITY_FULFILLED', done => {
      const action = ActionsObservable.of({
        type: 'TOGGLE_ENTITY_FULFILLED',
        entityName: 'contactAttributes',
        entityId: 'mockEntityId',
        response: { result: selectedEntity }
      });
      epc.ReInitContactAttributesFormForm(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  it('RevertMandatoryFieldValue', done => {
    const action = ActionsObservable.of({
      type: 'UPDATE_ENTITY_REJECTED',
      entityName: 'contactAttributes',
      entityId: 'mockEntityId',
      errorMessage: 'Inactive contact attribute cannot be set mandatory'
    });
    epc.RevertMandatoryFieldValue(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('BulkEntityUpdate', done => {
    const action = ActionsObservable.of({
      type: 'BULK_ENTITY_UPDATE',
      entityName: 'contactAttributes',
      entityId: 'mockEntityId',
      values: { active: false }
    });
    isItemInherited.mockReturnValueOnce(true).mockReturnValue(false);
    epc.BulkEntityUpdate(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
