import { fromJS } from 'immutable';
import { ActionsObservable } from 'redux-observable';

import { sdkPromise, errorManager } from '../../../../../utils/sdk';
import { getCurrentAgentId } from '../../../userData/selectors';
import { userProfileInitialValues } from '../selectors';

import { FetchUserProfileData, ReInitializeUserProfileForms, UpdateUserProfile } from '../epics';

import { mockStore } from '../../../../../utils/testUtils';

jest.mock('../../../../../utils/sdk');
jest.mock('../../../userData/selectors');
jest.mock('../selectors');

getCurrentAgentId.mockReturnValue('user-id');
userProfileInitialValues.mockReturnValue(fromJS({
    email: 'email@email.com',
    firstName: 'Whatever',
    lastName: 'Whoever',
    defaultTenant: 'tenant-id',
    extensions: [
        {
            type: 'WebRTC',
            name: 'whatever',
            id: 'an-id',
            hide: false
        },
        {
            type: 'PSTN',
            name: 'someone',
            id: 'another-id',
            hide: false
        }
    ],
    skills: [
        {
            name: 'skill 1'
        },
        {
            name: 'skill 2'
        }
    ],
    groups: [
        {
            name: 'group 1'
        },
        {
            name: 'group 2'
        }
    ],
    externalId: 'external-id',
    defaultIdentityProvider: 'identityProvider',
    noPassword: false,
    workStationId: 'workstation-id'
}));

describe('FetchUserProfileData', () => {
    beforeAll(() => {
        sdkPromise
            .mockResolvedValueOnce({
                details: [{
                        value: 'tenant1-id',
                        label: 'tenant 1'
                    },
                    {
                        value: 'tenant2-id',
                        label: 'tenant 2'
                    }
                ]
            })
            .mockRejectedValue(new Error('error'))
    });

    it('Fetches tenants the user can be assigned to, and emits actions to fetch integrations data and user info', done => {
        FetchUserProfileData(ActionsObservable.of({
            type: 'FETCH_DATA',
            entityName: 'userProfile'
        }), mockStore).subscribe(actualOutputActions => {
            expect(actualOutputActions).toMatchSnapshot();
            done();
        });
    });

    it('API errors and action to handle the error is emitted', done => {
        FetchUserProfileData(ActionsObservable.of({
            type: 'FETCH_DATA',
            entityName: 'userProfile'
        }), mockStore).subscribe(actualOutputActions => {
            expect(actualOutputActions).toMatchSnapshot();
            done();
        });
    });

    afterAll(() => {
        sdkPromise.mockReset();
    })
});

describe('ReInitializeUserProfileForms', () => {
    it('Reinitialize the forms when we sucesfully updated the userProfile or when the requests to fetch info for user profile are completed succesfully', done => {
        ReInitializeUserProfileForms(ActionsObservable.of({
            type: 'FETCH_DATA_ITEM_FULFILLED',
            entityName: 'users',
            id: 'user-id'
        }), mockStore).subscribe(actualOutputActions => {
            expect(actualOutputActions).toMatchSnapshot();
            done();
        });
    })
});

describe('UpdateUserProfile', () => {
    const values = {    
        email: 'email@email.com',
        firstName: 'Whatever',
        lastName: 'Whoever',
        defaultTenant: 'tenant-id',
        extensions: [
            {
                type: 'WebRTC',
                name: 'whatever',
                id: 'an-id',
                hide: false
            },
            {
                type: 'PSTN',
                name: 'someone',
                id: 'another-id',
                hide: false
            }
        ],
        externalId: 'external-id',
        defaultIdentityProvider: 'identityProvider',
        noPassword: false,
        workStationId: 'workstation-id',
        currentPassword: 'Password1!',
        password: 'Password2!'
    };

    describe('Current entity being update it\'s the platform user with a new password', () => {
        beforeAll(() => {
            sdkPromise.mockResolvedValue({
                result: 'mock value'
            });
        });

        it('All requests are made succesfully and UPDATE_USER_PROFILE_FULFILLED it\'s emitted', done => {
            UpdateUserProfile(ActionsObservable.of({
                type: 'UPDATE_USER_PROFILE',
                values,
                profileEntity: 'platformUser' 
            }), mockStore).subscribe(actualOutputActions => {
                expect(actualOutputActions).toMatchSnapshot();
                done();
            });
        });

        it('sdkPromise get\'s called twice', () => {
            expect(sdkPromise.mock.calls.length).toBe(2);
        })

        afterAll(() => {
            sdkPromise.mockReset();
        });
    });

    describe('Current entity being update it\'s the platform user but no new password', () => {
        beforeAll(() => {
            sdkPromise.mockResolvedValue({
                result: 'mock value'
            });
        });

        it('Request is to update user profile made succesfully and UPDATE_USER_PROFILE_FULFILLED it\'s emitted', done => {
            UpdateUserProfile(ActionsObservable.of({
                type: 'UPDATE_USER_PROFILE',
                values: {
                    ...values,
                    password: undefined,
                    currentPassword: undefined
                },
                profileEntity: 'platformUser' 
            }), mockStore).subscribe(actualOutputActions => {
                expect(actualOutputActions).toMatchSnapshot();
                done();
            });
        });

        it('sdkPromise get\'s called once', () => {
            expect(sdkPromise.mock.calls.length).toBe(1);
        });

        afterAll(() => {
            sdkPromise.mockReset();
        });
    });

    describe('Current entity being update it\'s the tenant user(updating extensions)', () => {
        beforeAll(() => {
            sdkPromise.mockResolvedValue({
                result: 'mock value'
            });
        });

        it('Request is to update user profile made succesfully and UPDATE_USER_PROFILE_FULFILLED it\'s emitted', done => {
            UpdateUserProfile(ActionsObservable.of({
                type: 'UPDATE_USER_PROFILE',
                values: {
                    ...values,
                    password: undefined,
                    currentPassword: undefined
                },
                profileEntity: 'tenantUser' 
            }), mockStore).subscribe(actualOutputActions => {
                expect(actualOutputActions).toMatchSnapshot();
                done();
            });
        });

        it('sdkPromise get\'s called once', () => {
            expect(sdkPromise.mock.calls.length).toBe(1);
        });

        afterAll(() => {
            sdkPromise.mockReset();
        });
    });

    describe('Current entity being update it\'s platform user with a new password', () => {
        beforeAll(() => {
            sdkPromise.mockResolvedValueOnce({
                result: 'mock value'
            }).mockRejectedValue(new Error('error'));

            errorManager.mockReturnValue({
                errorMessage: 'error message'
            });
        });

        it('Request is to update the platform user it\'s made sucessfully but the request to update the password fails and a UPDATE_USER_PROFILE_REJECTED is emitted', done => {
            UpdateUserProfile(ActionsObservable.of({
                type: 'UPDATE_USER_PROFILE',
                values,
                profileEntity: 'platformUser'
            }), mockStore).subscribe(actualOutputActions => {
                expect(actualOutputActions).toMatchSnapshot();
                done();
            });
        });

        it('sdkPromise get\'s called twice', () => {
            expect(sdkPromise.mock.calls.length).toBe(2);
        });

        afterAll(() => {
            sdkPromise.mockReset();
            errorManager.mockReset();
        });
    });
});