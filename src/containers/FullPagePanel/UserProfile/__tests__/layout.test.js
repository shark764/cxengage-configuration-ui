import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';

import { UserProfile, tenantUserValidation, extensionsFormValidation } from '../layout';
import { getIntlContext } from '../../../../utils/testUtils';

const initialValues = fromJS({
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
});

describe('<UserProfilePage />', () => {
    const extensions = List([
        {
            type: 'WebRTC',
            name: 'somebody',
            id: 'an-id',
            hide: false
        },
        {
            type: 'PSTN',
            name: 'whoever',
            id: 'another-id',
            hide: false
        }
    ]);
    


    const tenantsList = [
        {
            value: 'tenant1-id',
            label: 'tenant 1'
        },
        {
            value: 'tenant2-id',
            label: 'tenant 2'
        }
    ];

    it('renders the component', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            userHasUpdatePermission
            initialValues={initialValues}
            canUpdatePassword
            tenantsList={tenantsList}
            updateUserProfile={() => {}}
            canUpdateExtensions
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
            canManageAllExtensions
          />  
        );
        expect(rendered).toMatchSnapshot();
    });

    it('user wants to update his/her password and fields to do it are shown', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            userHasUpdatePermission
            initialValues={initialValues}
            canUpdatePassword
            tenantsList={tenantsList}
            updateUserProfile={() => {}}
            canUpdateExtensions
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
            canManageAllExtensions
          />
        );
        rendered.setState({ resetPassword: false });
        expect(rendered).toMatchSnapshot();
    });

    it('user has no permissions to update his/her password, options to do it are not shown', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            userHasUpdatePermission
            initialValues={initialValues}
            tenantsList={tenantsList}
            updateUserProfile={() => {}}
            canUpdateExtensions
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
            canManageAllExtensions
          />
        );
        expect(rendered).toMatchSnapshot();
    });
    
    it('A confirmation dialog it\'s shown if user wants to navigate away from the page and the form has field that haven\'t being saved', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            userHasUpdatePermission
            initialValues={initialValues}
            tenantsList={tenantsList}
            updateUserProfile={() => {}}
            canUpdateExtensions
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
            canManageAllExtensions
            showConfirmationDialog='CONFIRMATION_DIALOG'
          />
        );
        expect(rendered).toMatchSnapshot();
    });

    it('User has no skills, groups, defaultTenant neither tenants that can be selected to be assigned', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            userHasUpdatePermission
            initialValues={['groups', 'skills', 'defaultTenant'].reduce((map, key) => map.delete(key), initialValues)}
            updateUserProfile={() => {}}
            canUpdateExtensions
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
            canManageAllExtensions
            showConfirmationDialog='CONFIRMATION_DIALOG'
          />
        );
        expect(rendered).toMatchSnapshot();
    });

    it('if user has no update permission or the form is saving, the fields are disabled', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            initialValues={initialValues}
            canUpdatePassword
            tenantsList={tenantsList}
            updateUserProfile={() => {}}
            canUpdateExtensions
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
            canManageAllExtensions
          />
        );
        expect(rendered).toMatchSnapshot();
    });
    
    it('if user has no permissions to update the extensions, they\'re disabled', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            userHasUpdatePermission
            initialValues={initialValues}
            canUpdatePassword
            tenantsList={tenantsList}
            updateUserProfile={() => {}}
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
          />
        );
        expect(rendered).toMatchSnapshot();
    });

    it('if user has no permissions to update the WebRTC region\'s extension, that field it\'s disabled', () => {
        const rendered = shallow(
          <UserProfile
            intl={getIntlContext()}
            userHasUpdatePermission
            initialValues={initialValues}
            canUpdatePassword
            tenantsList={tenantsList}
            updateUserProfile={() => {}}
            extensionsValue={extensions}
            changeExtensions={() => {}}
            setCurrentEntity={() => {}}
            fetchData={() => {}}
            history={{
                push: () => {}
            }}
            cancelCallback={() => {}}
            nextEntity='nextEntity'
            canUpdateExtensions
          />
        );
        expect(rendered).toMatchSnapshot();
    });
});

describe('tenantUserValidation', () => {
    it('if any of the required field is missing it returns an error', () => {
        expect(tenantUserValidation(initialValues.delete('firstName'), getIntlContext())).toMatchSnapshot();
    });

    it('if the new password does not adhere to the password policy it returns an error', () => {
        expect(tenantUserValidation(initialValues.set('password', 'password33'), getIntlContext())).toMatchSnapshot();
    });

    it('if everything is alright with the values no error is returned', () => {
        expect(tenantUserValidation(initialValues.merge({ password: 'Password1!', currentPassword: 'Password1!' }), getIntlContext())).toMatchSnapshot();
    });
});

describe('extensionsFormValidation', () => {
    it('if an extension has no description it returns an error', () => {
        const extensionsWithErrors = fromJS({
            extensions: [
                {
                    type: 'pstn',
                    value: '+50375241007',
                    description: 'something'
                },
                {
                    type: 'sip',
                    value: 'sip:email@email.com'
                }
            ]
        });

        expect(extensionsFormValidation(extensionsWithErrors, getIntlContext())).toMatchSnapshot();
    });

    it('if an extension has no value and it\'s not a webRTC extension it should return an error', () => {
        const extensionsWithErrors = fromJS({
            extensions: [
                    {
                        type: 'pstn',
                        description: 'something'
                    },
                    {
                        type: 'sip',
                        value: 'sip:email@email.com',
                        description: 'something else'
                    }
                ]
        });

        expect(extensionsFormValidation(extensionsWithErrors, getIntlContext())).toMatchSnapshot();
    });

    it('if PSTN extension has a no valid PSTN extension value it should return an error', () => {
        const extensionsWithErrors = fromJS({
            extensions: [
            {
                type: 'pstn',
                description: 'something',
                value: 'something'
            },
            {
                type: 'sip',
                value: 'sip:email@email.com',
                description: 'something else'
            }
        ]
    });

        expect(extensionsFormValidation(extensionsWithErrors, getIntlContext())).toMatchSnapshot();
    });

    it('if SIP extension has a no valid SIP extension value it should return an error', () => {
        const extensionsWithErrors = fromJS({
            extensions: [
                {
                    type: 'pstn',
                    description: 'something',
                    value: '+12025550199 '
                },
                {
                    type: 'sip',
                    value: 'whatever',
                    description: 'something else'
                }
            ]
        });

        expect(extensionsFormValidation(extensionsWithErrors, getIntlContext())).toMatchSnapshot();
    });

    it('if all extensions pass all validation, no errors are returned', () => {
        const extensionsWithErrors = fromJS({
            extensions: [
                {
                    type: 'pstn',
                    description: 'something',
                    value: '+12025550199 '
                },
                {
                    type: 'sip',
                    value: 'sip:email@email.com',
                    description: 'something else'
                }
            ]
        });

        expect(extensionsFormValidation(extensionsWithErrors, getIntlContext())).toMatchSnapshot();
    });
});