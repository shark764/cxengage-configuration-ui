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
        entitiesReducer(initialState, entitiesReducerFunctions.setCurrentEntity('mock current entity'))
      ).toMatchSnapshot();
    });
  });

  describe('SET_SELECTED_SUB_ENTITY_ID', () => {
    it('sets the current selected sub entity id', () => {
      const initialState = fromJS({ currentEntity: 'none' });
      expect(
        entitiesReducer(initialState, { type: 'SET_SELECTED_SUB_ENTITY_ID', selectedSubEntityId: 'mockId' })
      ).toMatchSnapshot();
    });
  });

  describe('CREATE_SUB_ENTITY', () => {
    it('sets subEntitySaving true on the current sub entity', () => {
      const initialState = fromJS({ currentEntity: 'none' });
      expect(entitiesReducer(initialState, { type: 'CREATE_SUB_ENTITY', entityName: 'mockEntity' })).toMatchSnapshot();
    });
  });

  describe('UPDATE_SUB_ENTITY', () => {
    it('sets subEntitySaving true on the current sub entity', () => {
      const initialState = fromJS({ currentEntity: 'none' });
      expect(entitiesReducer(initialState, { type: 'UPDATE_SUB_ENTITY', entityName: 'mockEntity' })).toMatchSnapshot();
    });
  });

  describe('SET_CONFIRMATION_DIALOG', () => {
    it('sets the confirmation dialog', () => {
      const initialState = fromJS({ currentEntity: 'mockEntity', mockEntity: {} });
      expect(
        entitiesReducer(
          initialState,
          entitiesReducerFunctions.setConfirmationDialog('mockModalType', 'mockModalMetaData')
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
          entitiesReducer(initialState, entitiesReducerFunctions.setSelectedEntityId('mock entity id'))
        ).toMatchSnapshot();
      });
    });
    describe('with setSelectedEntityCreate()', () => {
      it('sets the current entity\'s selected entity id to "create"', () => {
        const initialState = fromJS({
          currentEntity: 'mockEntity',
          mockEntity: {}
        });
        expect(entitiesReducer(initialState, entitiesReducerFunctions.setSelectedEntityCreate())).toMatchSnapshot();
      });
    });
    describe('with unsetSelectedEntityId()', () => {
      it('sets the current entity\'s selected entity id to ""', () => {
        const initialState = fromJS({
          currentEntity: 'mockEntity',
          mockEntity: { selectedEntityId: 'mock entity id' }
        });
        expect(entitiesReducer(initialState, entitiesReducerFunctions.unsetSelectedEntityId())).toMatchSnapshot();
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
        entitiesReducer(initialState, {
          type: 'FETCH_DATA_FULFILLED',
          entityName: 'mockEntity',
          response: {
            result: [{ mockEntityId: 'mock entity id' }]
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('FETCH_DATA_ITEM_FULFILLED', () => {
    it('data item exists in entity , make sure it updates', () => {
      const initialState = fromJS({
        mockEntity: {
          data: [{ id: 'mockId' }]
        }
      });
      expect(
        entitiesReducer(initialState, {
          type: 'FETCH_DATA_ITEM_FULFILLED',
          entityName: 'mockEntity',
          id: 'mockId',
          response: {
            result: [{ mockEntityId: 'mock entity id' }]
          }
        })
      ).toMatchSnapshot();
    });
    it("data item doesn't exists in entity , return unchanged state", () => {
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      expect(
        entitiesReducer(initialState, {
          type: 'FETCH_DATA_ITEM_FULFILLED',
          entityName: 'mockEntity',
          id: 'mockId',
          response: {
            result: [{ mockEntityId: 'mock entity id' }]
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('CREATE_SUB_ENTITY_FULFILLED', () => {
    it('add new subentiy into entities data', () => {
      const initialState = fromJS({
        mockEntity: {
          data: [{ id: 'mockId' }]
        }
      });
      expect(
        entitiesReducer(initialState, {
          type: 'CREATE_SUB_ENTITY_FULFILLED',
          entityName: 'mockEntity',
          id: 'mockId',
          response: {
            result: [{ itemValue: 'mock value', key: 'mockKey' }]
          }
        })
      ).toMatchSnapshot();
    });
    it('main entity doesnt exist in state , return unchanged state', () => {
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      expect(
        entitiesReducer(initialState, {
          type: 'CREATE_SUB_ENTITY_FULFILLED',
          entityName: 'mockEntity',
          id: 'mockId',
          response: {
            result: [{ mockEntityId: 'mock entity id' }]
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('FETCH_DATA_ITEM_REJECTED', () => {
    it('calls setEntityUpdatingHelper correctly', () => {
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      const spy = jest.spyOn(entitiesReducerFunctions, 'setEntityUpdatingHelper').mockImplementation(() => {});
      entitiesReducer(initialState, { type: 'FETCH_DATA_ITEM_REJECTED', entityName: 'mockEntity' });
      expect(spy).toMatchSnapshot();
      spy.mockRestore();
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
        entitiesReducer(initialState, { type: 'FETCH_DATA_REJECTED', entityName: 'mockEntity' })
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_ENTITY', () => {
    it('calls setEntityUpdatingHelper correctly', () => {
      const initialState = fromJS({
        Entities: {
          mockEntity: {
            data: []
          }
        }
      });
      const spy = jest.spyOn(entitiesReducerFunctions, 'setEntityUpdatingHelper').mockImplementation(() => {});
      entitiesReducer(
        initialState,
        entitiesReducerFunctions.updateEntity('mockEntity', 'mock entity id', 'mock values')
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
          entitiesReducer(initialState, {
            type: 'UPDATE_ENTITY_FULFILLED',
            entityName: 'mockEntity',
            response: {
              result: { id: 'mock entity id', mockResult: 'mock result value' }
            }
          })
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
          entitiesReducer(initialState, {
            type: 'UPDATE_ENTITY_FULFILLED',
            entityName: 'mockEntity',
            response: {
              result: { id: 'mock entity id', mockResult: 'mock result value' }
            }
          })
        ).toEqual(initialState);
      });
    });
  });

  describe('TOGGLE_ENTITY_FULFILLED', () => {
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
          entitiesReducer(initialState, {
            type: 'TOGGLE_ENTITY_FULFILLED',
            entityName: 'mockEntity',
            response: {
              result: { id: 'mock entity id', mockResult: 'mock result value' }
            }
          })
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
          entitiesReducer(initialState, {
            type: 'TOGGLE_ENTITY_FULFILLED',
            entityName: 'mockEntity',
            response: {
              result: { id: 'mock entity id', mockResult: 'mock result value' }
            }
          })
        ).toEqual(initialState);
      });
    });
  });

  describe('UPDATE_ENTITY_REJECTED', () => {
    it('calls setEntityUpdatingHelper correctly', () => {
      const initialState = fromJS({
        Entities: {
          mockEntity: {
            data: []
          }
        }
      });
      const spy = jest.spyOn(entitiesReducerFunctions, 'setEntityUpdatingHelper').mockImplementation(() => {});
      entitiesReducer(initialState, entitiesReducerFunctions.updateEntityRejected('mockEntity', 'mock entity id'));
      expect(spy).toMatchSnapshot();
      spy.mockRestore();
    });
  });

  describe('UPLOAD_CSV_REJECTED', () => {
    it('calls setEntityUpdatingHelper correctly', () => {
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      const spy = jest.spyOn(entitiesReducerFunctions, 'setEntityUpdatingHelper').mockImplementation(() => {});
      entitiesReducer(initialState, {
        type: 'UPLOAD_CSV_REJECTED',
        entityName: 'mockEntity',
        entityId: 'mockId'
      });
      expect(spy).toMatchSnapshot();
      spy.mockRestore();
    });
  });

  describe('SET_ENTITY_UPDATING', () => {
    it('calls setEntityUpdatingHelper correctly', () => {
      const initialState = fromJS({
        mockEntity: {
          data: []
        }
      });
      const spy = jest.spyOn(entitiesReducerFunctions, 'setEntityUpdatingHelper').mockImplementation(() => {});
      entitiesReducer(initialState, { type: 'SET_ENTITY_UPDATING', entityName: 'mockEntity' });
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

describe('CREATE_ENTITY', () => {
  it('sets creating to true on the entity that was passed in', () => {
    const initialState = fromJS({
      mockEntity: {
        data: undefined
      }
    });
    expect(entitiesReducer(initialState, { type: 'CREATE_ENTITY', entityName: 'mockEntity' })).toMatchSnapshot();
  });
});

describe('CREATE_ENTITY_FULFILLED', () => {
  it('add the created entity into the data on said entity', () => {
    const initialState = fromJS({
      mockEntity: {
        data: []
      }
    });
    expect(
      entitiesReducer(initialState, {
        type: 'CREATE_ENTITY_FULFILLED',
        entityName: 'mockEntity',
        response: {
          result: { mockData: {} }
        }
      })
    ).toMatchSnapshot();
  });
});

describe('CREATE_ENTITY_REJECTED', () => {
  it('calls setEntityUpdatingHelper correctly', () => {
    const initialState = fromJS({
      mockEntity: {
        data: []
      }
    });
    const spy = jest.spyOn(entitiesReducerFunctions, 'setEntityUpdatingHelper').mockImplementation(() => {});
    entitiesReducer(initialState, { type: 'CREATE_ENTITY_REJECTED', entityName: 'mockEntity' });
    expect(spy).toMatchSnapshot();
    spy.mockRestore();
  });
});
