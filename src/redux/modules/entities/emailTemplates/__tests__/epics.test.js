import { ActionsObservable } from 'redux-observable';
import { UpdateEmailTemplate } from '../epics';
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

describe('UpdateEmailTemplate', () => {
  let action;
  describe('emailTemplates entity', () => {
    beforeEach(() => {
      sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
      getCurrentFormInitialValues.mockReturnValue({ email: 'custom' });
    });
    afterEach(() => {
      sdkPromise.mockClear();
      toastr.success.mockClear();
      toastr.info.mockClear();
      toastr.error.mockClear();
    });

    describe('with custom email', () => {
      beforeEach(() => {
        action = ActionsObservable.of(
          updateEntity('emailTemplates', 'mock entity id', {
            email: 'custom',
            body: 'mock body'
          })
        );
      });
      it('calls the correct sdk function', done => {
        UpdateEmailTemplate(action, mockStore).subscribe(() => {
          expect(sdkPromise).toMatchSnapshot();
          done();
        });
      });
      it('calls toastr success', done => {
        UpdateEmailTemplate(action, mockStore).subscribe(() => {
          expect(toastr.success).toMatchSnapshot();
          done();
        });
      });
      it('returns updateEntityFulfilled', done => {
        UpdateEmailTemplate(action, mockStore)
          .toArray()
          .subscribe(actualOutputActions => {
            expect(actualOutputActions).toMatchSnapshot();
            done();
          });
      });
    });

    describe('with default email', () => {
      beforeEach(() => {
        action = ActionsObservable.of(
          updateEntity('emailTemplates', 'mock entity id', {
            email: 'default',
            body: 'mock body'
          })
        );
      });
      it('calls the correct sdk function', done => {
        UpdateEmailTemplate(action, mockStore).subscribe(() => {
          expect(sdkPromise).toMatchSnapshot();
          done();
        });
      });
      it('calls toastr success', done => {
        UpdateEmailTemplate(action, mockStore).subscribe(() => {
          expect(toastr.success).toMatchSnapshot();
          done();
        });
      });
      it('returns updateEntityFulfilled', done => {
        UpdateEmailTemplate(action, mockStore)
          .toArray()
          .subscribe(actualOutputActions => {
            expect(actualOutputActions).toMatchSnapshot();
            done();
          });
      });
    });

    describe('unchanged default email', () => {
      beforeEach(() => {
        getCurrentFormInitialValues.mockReturnValue({ email: 'default' });
        action = ActionsObservable.of(
          updateEntity('emailTemplates', 'mock entity id', {
            email: 'default'
          })
        );
      });
      it('calls toastr info', done => {
        UpdateEmailTemplate(action, mockStore).subscribe(() => {
          expect(toastr.info).toMatchSnapshot();
          done();
        });
      });
      it('returns updateEntityRejected', done => {
        UpdateEmailTemplate(action, mockStore)
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
        UpdateEmailTemplate(action, mockStore).subscribe(() => {
          expect(toastr.error).toMatchSnapshot();
          done();
        });
      });
      it('returns updateEntityRejected', done => {
        UpdateEmailTemplate(action, mockStore)
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
      UpdateEmailTemplate(action, mockStore)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual([]);
          done();
        });
    });
  });
});
