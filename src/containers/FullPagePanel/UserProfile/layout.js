import React from 'react';
import { reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormattedMessage, injectIntl } from 'react-intl';
import { generateUUID } from 'serenova-js-utils/uuid';
import { isEmpty } from 'serenova-js-utils/strings';
import { validatePhoneNumber, validateSip } from 'serenova-js-utils/validation';
import {
  InputField,
  DetailHeader,
  SelectField,
  ExtensionListField,
  Detail,
  UserIconSVG,
  Button,
  Confirmation,
} from 'cx-ui-components';

import DetailWrapper from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  padding: 10px 30px;
  font-size: 14px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 190px 700px;
`;

const MisteryMan = styled.div`
  padding: 15px 20px;
  height: 170px;
  padding: 15px 20px;
  width: 160px;
  background-color: #eee;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const DetailFormWrapper = styled.div`
  max-width: 500px;
`;

const ResetPasswordContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
  padding-right: 10px;
`;

const ResetPasswordLabel = styled.div`
  flex-shrink: 0;
  display: inline-block;
  width: 150px;
  margin-top: 5px;
  padding-right: 10px;
`;

const NoTenantAssigned = styled.div`
  color: red;
  font-weight: bold;
`;

const UpdateButton = styled(Button)`
  position: relative;
  left: 85%;
`;

const Null = styled.div`
  color: #656565;
  font-style: italic;
  width: 100%;
  text-align: center;
`;

const Table = styled.table`
  border: #cccccc solid 1px;
  border-spacing: 0;
  width: 100%;

  td,
  th {
    padding: 10px;
  }

  th {
    text-align: left;
    border-bottom: #cccccc solid 1px;
    color: #656565;
    font-weight: 600;
  }

  td:nth-of-type(2),
  th:nth-of-type(2) {
    text-align: right;
  }
`;

const Tag = styled.span`
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-clip: padding-box;
  line-height: 2.5ex;
  background-color: #ebebeb;
  color: #474747;
  margin: 10px 0;
  padding: 3px 7px;

  & + & {
    margin-left: 5px;
  }
`;

export const tenantUserValidation = (values, { formatMessage }) => ({
  firstName:
    isEmpty(values.get('firstName')) &&
    formatMessage({
      id: 'userProfile.details.firstName.error',
      defaultMessage: 'Please enter a first name',
    }),
  lastName:
    isEmpty(values.get('lastName')) &&
    formatMessage({
      id: 'userProfile.details.lastName.error',
      defaultMessage: 'Please enter a last name',
    }),
  currentPassword:
    isEmpty(values.get('currentPassword')) &&
    formatMessage({
      id: 'fields.password.error',
      defaultMessage: 'Please enter a password',
    }),
  password:
    (isEmpty(values.get('password')) &&
      formatMessage({
        id: 'fields.password.error',
        defaultMessage: 'Please enter a password',
      })) ||
    (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%-_=+<>.])/.test(values.get('password')) &&
      formatMessage({
        id: 'userProfile.details.password.policy',
        defaultMessage:
          'Password must have at least 1 alphabetic character, 1 number, and 1 special character (! # $ % - _ = + < > .)',
      })),
});

export const extensionsFormValidation = (values, { formatMessage }) => {
  const extensionsErrors =
    values.get('extensions') &&
    values
      .get('extensions')
      .toJS()
      .map(({ description, type, value }) => ({
        ...(isEmpty(description) && {
          label: true,
          message: formatMessage({
            id: 'user.details.extension.description.required',
            defaultMessage: 'Please provide a description',
          }),
        }),
        ...(((type === 'pstn' && !validatePhoneNumber(value)) ||
          ((type === 'sip' && !validateSip(value)) || (type !== 'webrtc' && !value))) && {
          value: true,
          message: formatMessage({
            id:
              type !== 'webrtc' && !value
                ? 'user.details.extensions.value.required'
                : type === 'sip' ? 'fields.sipFormat.error' : 'fields.phoneNumber.error',
            defaultMessage:
              type !== 'webrtc' && !value
                ? 'Value required'
                : type === 'sip' ? "Extensions must start with 'sip:'." : 'Phone number should be in E.164 format.',
          }),
        }),
      }));

  return (
    extensionsErrors &&
    extensionsErrors.some(({ label, value }) => label || value) && {
      extensions: extensionsErrors,
    }
  );
};

const DetailsForm = reduxForm({
  form: 'userProfile:details',
  validate: tenantUserValidation,
})(function({
  handleSubmit,
  userHasUpdatePermission,
  resetPassword,
  canUpdatePassword,
  formatMessage,
  tenantsList,
  initialValues,
  toggleResetPassword,
  isSaving,
  isDirty,
  invalid,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <DetailFormWrapper>
        <Detail
          label={formatMessage({
            id: 'userProfile.details.email',
            defaultMessage: 'Email',
          })}
          value={initialValues.get('email')}
        />
        <InputField
          name="firstName"
          label={`${formatMessage({
            id: 'userProfile.details.firstName',
            defaultMessage: 'First Name',
          })} *`}
          disabled={!userHasUpdatePermission || isSaving}
        />
        <InputField
          name="lastName"
          label={`${formatMessage({
            id: 'userProfile.details.lastName',
            defaultMessage: 'Last Name',
          })} *`}
          disabled={!userHasUpdatePermission || isSaving}
        />
        {canUpdatePassword &&
          !resetPassword && (
            <ResetPasswordContainer>
              <ResetPasswordLabel>
                <FormattedMessage id="userProfile.details.password.new" defaultMessage="New Password" />
              </ResetPasswordLabel>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  toggleResetPassword();
                }}
                type="button"
                disabled={!userHasUpdatePermission || isSaving}>
                <FormattedMessage id="userProfile.details.password.reset" defaultMessage="Reset Password" />
              </Button>
            </ResetPasswordContainer>
          )}
        {canUpdatePassword &&
          resetPassword && (
            <React.Fragment>
              <InputField
                name="currentPassword"
                label={formatMessage({
                  id: 'userProfile.details.password.current',
                  defaultMessage: 'Current Password',
                })}
                type="password"
                disabled={!userHasUpdatePermission || isSaving}
              />
              <InputField
                name="password"
                label={formatMessage({
                  id: 'userProfile.details.password.new',
                  defaultMessage: 'New Password',
                })}
                type="password"
                disabled={!userHasUpdatePermission || isSaving}
              />
            </React.Fragment>
          )}
        {initialValues.get('defaulTenant') || (tenantsList && tenantsList.length) ? (
          <SelectField
            name="defaultTenant"
            placeholder={formatMessage({
              id: 'userProfile.details.noDefaultTenant',
              defaultMessage: 'Select default tenant...',
            })}
            options={tenantsList}
            label={formatMessage({
              id: 'userProfile.details.defaultTenant',
              defaultMessage: 'Default tenant',
            })}
            disabled={!userHasUpdatePermission || isSaving}
          />
        ) : (
          <NoTenantAssigned>
            <FormattedMessage
              id="userProfile.details.noTenantAssigned"
              defaultMessage="You have not been assigned any tenants"
            />
          </NoTenantAssigned>
        )}
        <UpdateButton
          type="submit"
          buttonType="primary"
          disabled={!userHasUpdatePermission || isSaving || invalid || !isDirty}>
          <FormattedMessage id="forms.button.updateText" defaultMessage="Update" />
        </UpdateButton>
      </DetailFormWrapper>
    </form>
  );
});

const ExtensionsForm = reduxForm({
  form: 'userProfile:extensions',
  validate: extensionsFormValidation,
})(function({
  handleSubmit,
  userHasUpdatePermission,
  userCanUpdateExtensions,
  invalid,
  isDirty,
  formatMessage,
  isSaving,
  canManageAllExtensions,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <ExtensionListField
        name="extensions"
        disabled={!(userHasUpdatePermission || userCanUpdateExtensions || canManageAllExtensions) || isSaving}
        extensionLabels={{
          pstn: formatMessage({
            id: 'pstn',
            defaultMessage: 'PSTN',
          }),
          webrtc: formatMessage({
            id: 'webrtc',
            defaultMessage: 'WebRTC',
          }),
          sip: formatMessage({
            id: 'sip',
            defaultMessage: 'SIP',
          }),
        }}
        label="extensions"
        canChangeRegion={canManageAllExtensions}
        placeholders={{
          extension: formatMessage({
            id: 'user.details.extensions.value',
            defaultMessage: 'Enter Extension',
          }),
          label: formatMessage({
            id: 'fields.description.placeholder',
            defaultMessage: 'Description',
          }),
        }}
        primaryText={formatMessage({
          id: 'user.details.extensions.primary',
          defaultMessage: 'Primary'
        })}
      />
      <UpdateButton
        type="submit"
        buttonType="primary"
        disabled={
          (!userHasUpdatePermission && !userCanUpdateExtensions && !canManageAllExtensions) ||
          isSaving ||
          invalid ||
          !isDirty
        }>
        <FormattedMessage id="forms.buttons.saveText" defaultMessage="Save" />
      </UpdateButton>
    </form>
  );
});

export class UserProfile extends React.Component {
  state = {
    resetPassword: false,
  };

  componentDidMount() {
    this.props.setCurrentEntity('userProfile');
    this.props.fetchData('userProfile');
  }

  componentDidUpdate({ initialValues: previInitialValues, isSaving: prevIsSaving }) {
    const prevUpdated = previInitialValues.get('updated') && new Date(previInitialValues.get('updated'));
    const currentUpdated = this.props.initialValues.get('updated') && new Date(this.props.initialValues.get('updated'));
    if (
      prevUpdated &&
      currentUpdated &&
      prevIsSaving &&
      !this.props.isSaving &&
      currentUpdated > prevUpdated &&
      this.state.resetPassword
    ) {
      this.setState({ resetPassword: false });
    }
  }

  toggleResetPassword = () =>
    this.setState(({ resetPassword: prevResetPassword }) => ({
      resetPassword: !prevResetPassword,
    }));

  render() {
    const {
      props: {
        userHasUpdatePermission,
        intl: { formatMessage },
        initialValues,
        canUpdatePassword,
        tenantsList,
        updateUserProfile,
        canUpdateExtensions,
        extensionsValue,
        isSaving,
        changeExtensions,
        canManageAllExtensions,
        isDetailsFormDirty,
        isExtensionsFormDirty,
        showConfirmationDialog,
        history,
        cancelCallback,
        nextEntity,
        setCurrentEntity,
        fetchData,
      },
      state: { resetPassword },
    } = this;

    const skills = initialValues.get('skills');
    const groups = initialValues.get('groups');

    return (
      <Wrapper>
        <h2>
          <FormattedMessage
            id="navigation.profile"
            defaultMessage="User Profile"
          />
        </h2>
        <Container>
          <MisteryMan>
            <UserIconSVG size={120} color="#fff" />
          </MisteryMan>
          <Right>
            <DetailWrapper
              data-automation="userProfileDetailsSVG"
              open
              customCaretIcon="margin-top: 0;display: inline-block;margin-left: 205px;"
              autoCloseOverride>
              <WrappedDetailHeader
                text={formatMessage({
                  id: 'userProfile.details',
                  defaultMessage: 'Details',
                })}
              />
              <DetailsForm
                resetPassword={resetPassword}
                toggleResetPassword={this.toggleResetPassword}
                userHasUpdatePermission={userHasUpdatePermission}
                canUpdatePassword={canUpdatePassword}
                tenantsList={tenantsList}
                formatMessage={formatMessage}
                onSubmit={(values) =>
                  updateUserProfile('platformUser', {
                    ...values.toJS(),
                    externalId: initialValues.get('externalId'),
                    username: initialValues.get('email'),
                  })
                }
                initialValues={initialValues}
                isSaving={isSaving}
                isDirty={isDetailsFormDirty}
              />
            </DetailWrapper>
            <DetailWrapper
              customCaretIcon="margin-top: 0;display: inline-block;margin-left: 205px;"
              open
              data-automation="userProfileExtensionsSVG"
              autoCloseOverride>
              <WrappedDetailHeader
                userHasUpdatePermission={userHasUpdatePermission || canUpdateExtensions || canManageAllExtensions}
                text={formatMessage({
                  id: 'user.details.extensions',
                  defaultMessage: 'Extensions',
                })}
                onActionButtonClick={!isSaving && (() =>
                  changeExtensions(
                    extensionsValue.push(
                      Map({
                        type: 'pstn',
                        value: '',
                        provider: '',
                        region: '',
                        description: '',
                        id: generateUUID(),
                        hide: false,
                      })
                    )
                  ))
                }
              />
              <ExtensionsForm
                isSaving={isSaving}
                userHasUpdatePermission={userHasUpdatePermission}
                userCanUpdateExtensions={canUpdateExtensions}
                formatMessage={formatMessage}
                onSubmit={(values) =>
                  updateUserProfile('tenantUser', {
                    ...values.toJS(),
                    defaultIdentityProvider: initialValues.get('defaultIdentityProvider'),
                    noPassword: initialValues.get('noPassword'),
                    workStationId: initialValues.get('workStationId'),
                  })
                }
                initialValues={Map({ extensions: initialValues.get('extensions') })}
                canManageAllExtensions={canManageAllExtensions}
                isDirty={isExtensionsFormDirty}
              />
            </DetailWrapper>
            {(initialValues.get('defaulTenant') || (tenantsList && tenantsList.length)) && (
              <React.Fragment>
                <DetailWrapper
                  customCaretIcon="margin-top: 0;display: inline-block;margin-left: 205px;"
                  open
                  data-automation="userProfileSkillsSVG">
                  <WrappedDetailHeader
                    text={formatMessage({
                      id: 'navigation.management.skills',
                      defaultMessage: 'Skills',
                    })}
                  />
                  {skills && skills.size ? (
                    <Table>
                      <thead>
                        <tr>
                          <th>
                            <FormattedMessage id="tables.header.nameColumn" defaultMessage="Name" />
                          </th>
                          <th>
                            <FormattedMessage id="skills.proficiency" defaultMessage="Proficiency" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {skills.map((skill) => (
                          <tr>
                            <td>{skill.get('name')}</td>
                            <td>
                              {skill.get('proficiency') && skill.get('proficiency') > 0
                                ? skill.get('proficiency')
                                : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Null>
                      <FormattedMessage
                        id="userProfile.skills.none"
                        defaultMessage="You have not been assigned any skills."
                      />
                    </Null>
                  )}
                </DetailWrapper>
                <DetailWrapper
                  customCaretIcon="margin-top: 0;display: inline-block;margin-left: 205px;"
                  open
                  data-automation="userProfileGroupsSVG">
                  <WrappedDetailHeader
                    text={formatMessage({
                      id: 'navigation.management.groups',
                      defaultMessage: 'Groups',
                    })}
                  />
                  {groups && groups.size ? (
                    groups.map((group) => <Tag>{group.get('name')}</Tag>)
                  ) : (
                    <Null>
                      <FormattedMessage
                        id="userProfile.skills.none"
                        defaultMessage="You have not been assigned any skills."
                      />
                    </Null>
                  )}
                </DetailWrapper>
              </React.Fragment>
            )}
          </Right>
        </Container>
        {showConfirmationDialog && (
          <Confirmation
            confirmBtnCallback={() => {
              cancelCallback();
              setCurrentEntity(nextEntity);
              fetchData(nextEntity);
              if (
                nextEntity !== 'interactionMonitoring' &&
                nextEntity !== 'agentStateMonitoring' &&
                nextEntity !== 'flowDebugLogs' &&
                nextEntity !== 'betaFeatures'
              ) {
                history.push({ pathname: `/configuration/${nextEntity}` });
              } else {
                history.push({ pathname: `/${nextEntity}` });
              }
            }}
            cancelBtnCallback={cancelCallback}
            mainText="You have unsaved changes that will be lost!."
            secondaryText="Click Confirm to discard changes, or Cancel to continue editing."
          />
        )}
      </Wrapper>
    );
  }
}

export default injectIntl(UserProfile);

UserProfile.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  canUpdatePassword: PropTypes.bool,
  tenantsList: PropTypes.array,
  updateUserProfile: PropTypes.func.isRequired,
  canUpdateExtensions: PropTypes.bool,
  extensionsValue: PropTypes.object,
  isSaving: PropTypes.bool,
  changeExtensions: PropTypes.func.isRequired,
  setCurrentEntity: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isDetailsFormDirty: PropTypes.bool,
  isExtensionsFormDirty: PropTypes.bool,
  showConfirmationDialog: PropTypes.string,
  history: PropTypes.object.isRequired,
  cancelCallback: PropTypes.func.isRequired,
  nextEntity: PropTypes.string,
  canManageAllExtensions: PropTypes.bool,
};

ExtensionsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  userCanUpdateExtensions: PropTypes.bool,
  invalid: PropTypes.bool,
  isDirty: PropTypes.bool,
  formatMessage: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  canManageAllExtensions: PropTypes.bool,
};

DetailsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  paswordReset: PropTypes.bool,
  canUpdatePassword: PropTypes.bool,
  formatMessage: PropTypes.func.isRequired,
  tenantsList: PropTypes.array,
  initialValues: PropTypes.object,
  toggleResetPassword: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  isDirty: PropTypes.bool,
  invalid: PropTypes.bool,
};
