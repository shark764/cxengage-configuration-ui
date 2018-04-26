/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import entitiesReducer, * as entitiesReducerFunctions from '../';

describe('entities reducer', () => {
  it('returns the correct initial state', () => {
    expect(entitiesReducer(undefined, {})).toMatchSnapshot();
  });

  describe('SET_CURRENT_ENTITY', () => {
    it('sets the current entity', () => {
      const initialState = fromJS({ currentEntity: 'none' });
      expect(
        entitiesReducer(
          initialState,
          entitiesReducerFunctions.setCurrentEntity('mock current entity')
        )
      ).toMatchSnapshot();
    });
  });

  describe('SET_SELECTED_ENTITY_ID', () => {
    describe('with setSelectedEntityId()', () => {
      it("sets the current entity's selected entity id", () => {
        const initialState = fromJS({
          currentEntity: 'mockEntity',
          mockEntity: {}
        });
        expect(
          entitiesReducer(
            initialState,
            entitiesReducerFunctions.setSelectedEntityId('mock entity id')
          )
        ).toMatchSnapshot();
      });
    });
    describe('with setSelectedEntityCreate()', () => {
      it('sets the current entity\'s selected entity id to "create"', () => {
        const initialState = fromJS({
          currentEntity: 'mockEntity',
          mockEntity: {}
        });
        expect(
          entitiesReducer(
            initialState,
            entitiesReducerFunctions.setSelectedEntityCreate()
          )
        ).toMatchSnapshot();
      });
    });
    describe('with unsetSelectedEntityId()', () => {
      it('sets the current entity\'s selected entity id to ""', () => {
        const initialState = fromJS({
          currentEntity: 'mockEntity',
          mockEntity: { selectedEntityId: 'mock entity id' }
        });
        expect(
          entitiesReducer(
            initialState,
            entitiesReducerFunctions.unsetSelectedEntityId()
          )
        ).toMatchSnapshot();
      });
    });
  });

  describe('FETCH_DATA_FULFILLED', () => {
    it('sets the data as the immutable value passed in', () => {
      const initialState = fromJS({
        mockEntity: {
          data: undefined
        }
      });
      expect(
        entitiesReducer(
          initialState,
          entitiesReducerFunctions.fetchDataFulfilled('mockEntity', {
            result: [{ mockEntityId: 'mock entity id' }]
          })
        )
      ).toMatchSnapshot();
    });
  });

  describe('FETCH_DATA_REJECTED', () => {
    it('sets the data to an empty List', () => {
      const initialState = fromJS({
        mockEntity: {
          data: undefined
        }
      });
      expect(
        entitiesReducer(
          initialState,
          entitiesReducerFunctions.fetchDataRejected('mockEntity')
        )
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_ENTITY', () => {
    it('calls setEntityUpdatingHelper correctly', () => {
      const spy = jest.spyOn(
        entitiesReducerFunctions,
        'setEntityUpdatingHelper'
      );
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      entitiesReducer(
        initialState,
        entitiesReducerFunctions.updateEntity(
          'mockEntity',
          'mock entity id',
          'mock values'
        )
      );
      expect(spy).toMatchSnapshot();
      spy.mockRestore();
    });
  });

  describe('UPDATE_ENTITY_FULFILLED', () => {
    describe('when the entity is present', () => {
      const initialState = fromJS({
        mockEntity: {
          data: [
            {
              id: 'mock entity id'
            }
          ]
        }
      });
      it('merges the result in and sets "updating" to false', () => {
        expect(
          entitiesReducer(
            initialState,
            entitiesReducerFunctions.updateEntityFulfilled('mockEntity', {
              result: { id: 'mock entity id', mockResult: 'mock result value' }
            })
          )
        ).toMatchSnapshot();
      });
    });
    describe('when the entity is not there', () => {
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      it('does nothing', () => {
        expect(
          entitiesReducer(
            initialState,
            entitiesReducerFunctions.updateEntityFulfilled('mockEntity', {
              result: { id: 'mock entity id', mockResult: 'mock result value' }
            })
          )
        ).toEqual(initialState);
      });
    });
  });

  describe('UPDATE_ENTITY_REJECTED', () => {
    it('calls setEntityUpdatingHelper correctly', () => {
      const spy = jest.spyOn(
        entitiesReducerFunctions,
        'setEntityUpdatingHelper'
      );
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      entitiesReducer(
        initialState,
        entitiesReducerFunctions.updateEntityRejected(
          'mockEntity',
          'mock entity id'
        )
      );
      expect(spy).toMatchSnapshot();
      spy.mockRestore();
    });
  });

  describe('helper functions', () => {
    describe('setEntityUpdatingHelper', () => {
      describe('when the entity is present', () => {
        const initialState = fromJS({
          mockEntity: {
            data: [
              {
                id: 'mock entity id'
              }
            ]
          }
        });
        it("sets the entity's updated field", () => {
          expect(
            entitiesReducerFunctions.setEntityUpdatingHelper(
              initialState,
              { entityName: 'mockEntity', entityId: 'mock entity id' },
              true
            )
          ).toMatchSnapshot();
        });
      });
      describe('when the entity is not there', () => {
        const initialState = fromJS({
          mockEntity: {
            data: []
          }
        });
        it('does nothing', () => {
          expect(
            entitiesReducerFunctions.setEntityUpdatingHelper(
              initialState,
              { entityName: 'mockEntity', entityId: 'mock entity id' },
              true
            )
          ).toEqual(initialState);
        });
      });
    });
  });
});
