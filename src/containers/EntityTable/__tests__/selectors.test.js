/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS, List } from 'immutable';
import { getAllEntities, getHelpLink } from '../selectors';

import { getAllEntities as getAllEntitiesFromStore, getCurrentEntity } from '../../../redux/modules/entities/selectors';
import { getProtectedBranding } from '../../../redux/modules/entities/branding/selectors';

jest.mock('../../../redux/modules/entities/selectors');
const mockAllEntities = fromJS([{ mockAttribute: 'mock value' }]);
getAllEntitiesFromStore.mockImplementation(() => mockAllEntities);

jest.mock('../../../redux/modules/entities/branding/selectors');
getProtectedBranding.mockReturnValue(
  fromJS([
    {
      key: 'customDomain',
      value: 'mockcustomdomain'
    }
  ])
);

describe('getAllEntities', () => {
  describe('is defined', () => {
    it('returns the entities toJS', () => {
      expect(getAllEntities()).toMatchSnapshot();
    });
  });
  describe('is undefined', () => {
    it('returns undefined', () => {
      getAllEntitiesFromStore.mockImplementation(() => undefined);
      expect(getAllEntities(undefined)).toEqual(undefined);
    });
  });
});

describe('getHelpLink', () => {
  describe('entity help link exists for entity', () => {
    describe('custom domain exists', () => {
      it('prepends custom domain to help link', () => {
        expect(getHelpLink()).toMatchSnapshot();
      });
    });
    describe('custom domain does not exist', () => {
      beforeEach(() => {
        getProtectedBranding.mockReturnValueOnce(new List());
      });
      it('returns the help link', () => {
        expect(getHelpLink()).toMatchSnapshot();
      });
    });
  });
  describe('entity is undefined', () => {
    beforeEach(() => {
      getCurrentEntity.mockReturnValueOnce(undefined);
    });
    it('returns undefined', () => {
      expect(getHelpLink()).toBe(undefined);
    });
  });
});
