import { ActionsObservable } from 'redux-observable';
import { FetchData } from '../epics';
import { mockStore } from '../../../../utils/testUtils';
import { fetchData } from '../index';

import { sdkPromise, errorLabel } from '../../../../utils/sdk';
import toastr from 'toastr';

import { EntityMetaData, entitiesMetaData } from '../metaData';

jest.mock('../../../../utils/sdk');
jest.mock('toastr');

errorLabel.mockReturnValue('mock error');

entitiesMetaData.mockEntity = new EntityMetaData('mockEntity');

describe('FetchData', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of(fetchData('mockEntity', 'mockTableType'));
    sdkPromise.mockReturnValue(
      new Promise(resolve => resolve('mock response'))
    );
  });
  afterEach(() => {
    sdkPromise.mockClear();
    toastr.error.mockClear();
  });
  it('calls the correct sdk function', done => {
    FetchData(action, mockStore).subscribe(() => {
      expect(sdkPromise).toMatchSnapshot();
      done();
    });
  });
  describe('on sdkPromise success', () => {
    it('returns fetchDataFulfilled', done => {
      FetchData(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  describe('on sdkPromise error', () => {
    beforeEach(() => {
      sdkPromise.mockReturnValue(
        new Promise((resolve, reject) => reject('mock error'))
      );
    });
    it('calls toastr error', done => {
      FetchData(action, mockStore).subscribe(() => {
        expect(toastr.error).toMatchSnapshot();
        done();
      });
    });
    it('returns fetchDataRejected', done => {
      FetchData(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
  describe('on sdkPromise error on ignore list', () => {
    beforeEach(() => {
      action = ActionsObservable.of(fetchData('branding'));
      sdkPromise.mockReturnValue(
        new Promise((resolve, reject) => reject('mock error'))
      );
    });
    it('does not call toastr error', done => {
      FetchData(action, mockStore).subscribe(() => {
        expect(toastr.error).toMatchSnapshot();
        done();
      });
    });
    it('returns fetchDataRejected', done => {
      FetchData(action, mockStore).subscribe(actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      });
    });
  });
});
