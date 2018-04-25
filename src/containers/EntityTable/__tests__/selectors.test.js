/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getAllEntities } from '../selectors';

import { getAllEntities as getAllEntitiesFromStore } from '../../../redux/modules/entities/selectors';

jest.mock('../../../redux/modules/entities/selectors');
const mockAllEntities = fromJS([{ mockAttribute: 'mock value' }]);
getAllEntitiesFromStore.mockImplementation(() => mockAllEntities);

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
