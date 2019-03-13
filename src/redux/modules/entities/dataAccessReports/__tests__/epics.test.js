import { ActionsObservable } from 'redux-observable';
import { UpdateDataAccessReport } from '../epics';
import { mockStore } from '../../../../../utils/testUtils';
import { updateEntity } from '../../';

import { sdkPromise, errorLabel, errorManager } from '../../../../../utils/sdk';
import { getSelectedEntityId } from '../../selectors';
import { getCurrentFormInitialValues } from '../../../form/selectors';
import toastr from 'toastr';

jest.mock('../../../../../utils/sdk');
jest.mock('../../selectors');
jest.mock('../../../form/selectors');
jest.mock('toastr');

errorLabel.mockReturnValue('mock error');
errorManager.mockReturnValue('mock error manager');
getSelectedEntityId.mockReturnValue('mock selected entity id');

describe('UpdateDataAccessReport', () => {
  let action;
  describe('dataAccessReports entity', () => {
    beforeEach(() => {
      sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
      getCurrentFormInitialValues.mockReturnValue({
        id: 'mockId',
        name: 'mockName',
        reportType: 'mockReportType'
      });
    });
    afterEach(() => {
      sdkPromise.mockClear();
      toastr.success.mockClear();
      toastr.info.mockClear();
      toastr.error.mockClear();
    });

    describe('update entity', () => {
      beforeEach(() => {
        action = ActionsObservable.of(
          updateEntity('dataAccessReports', 'mock entity id', {
            name: 'mockName',
            reportType: 'mockReportType'
          })
        );
      });
      it('calls the correct sdk function', done => {
        UpdateDataAccessReport(action, mockStore).subscribe(() => {
          expect(sdkPromise).toMatchSnapshot();
          done();
        });
      });
      it('calls toastr success', done => {
        UpdateDataAccessReport(action, mockStore).subscribe(() => {
          expect(toastr.success).toMatchSnapshot();
          done();
        });
      });
      it('returns updateEntityFulfilled', done => {
        UpdateDataAccessReport(action, mockStore)
          .toArray()
          .subscribe(actualOutputActions => {
            expect(actualOutputActions).toMatchSnapshot();
            done();
          });
      });
    });

    describe('sdk promise fails', () => {
      beforeEach(() => {
        sdkPromise.mockReturnValue(new Promise((resolve, reject) => reject('mock error')));
      });
      it('calls toastr error', done => {
        UpdateDataAccessReport(action, mockStore).subscribe(() => {
          expect(toastr.error).toMatchSnapshot();
          done();
        });
      });
      it('returns updateEntityRejected', done => {
        UpdateDataAccessReport(action, mockStore)
          .toArray()
          .subscribe(actualOutputActions => {
            expect(actualOutputActions).toMatchSnapshot();
            done();
          });
      });
    });
  });

  describe('other entities', () => {
    beforeEach(() => {
      action = ActionsObservable.of(updateEntity('other entity'));
    });
    it('are ignored', done => {
      UpdateDataAccessReport(action, mockStore)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual([]);
          done();
        });
    });
  });
});
