/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TenantsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  DetailHeader,
  Detail,
  InputField,
  SelectField,
  FileUploadField,
  ColorField,
  LoadingSpinnerSVG,
  ConfirmationWrapper,
  Button
} from 'cx-ui-components';

const SubDetailHeader = styled(DetailHeader)`
  margin-left: 10px !important;
`;

const ColorFieldWrapper = styled.div`
  margin-left: 10px !important;
`;

const ResetButton = styled(Button)`
  margin-left: 160px !important;
  font-size: 12px !important;
  text-align: center !important;
  vertical-align: middle !important;
  height: 28px !important;
`;

const logoTypesAllowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
const faviconTypesAllowed = logoTypesAllowed.concat(['image/vnd.microsoft.icon', 'image/x-icon']);

export default function TenantsForm({
  key,
  regions,
  isSaving,
  timezones,
  tenantUsers,
  handleSubmit,
  initialValues,
  uploadImage,
  tenantSlas,
  switchTenant,
  selectedEntityId,
  identityProviders,
  outboundIntegrations,
  allDependenciesFetched,
  resetTenantBranding,
  currentTenantId,
  isSelectedTenantHasDefaultBranding,
  userHasTenantUpdatePermissions,
  userHasTenantBrandingUpdatePermissions,
  userHasBrandingProductNameUpdatePermissions,
  userHasTenantIdpViewPermissions,
  userHasPlatformViewPermission
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      {!allDependenciesFetched || isSaving ? (
        <LoadingSpinnerSVG size={60} />
      ) : (
        <Fragment>
          <DetailHeader text="Details" />
          <InputField
            name="name"
            inputType="text"
            label="Tenant Name *"
            componentType="input"
            data-automation="nameInput"
            disabled={isSaving || !userHasTenantUpdatePermissions}
          />
          <InputField
            name="description"
            inputType="text"
            label="Description"
            componentType="textarea"
            data-automation="descriptionInput"
            disabled={isSaving || !userHasTenantUpdatePermissions}
          />
          <SelectField
            name="adminUserId"
            label="Tenant Admin"
            options={tenantUsers}
            data-automation="tenantAdminList"
            disabled={isSaving || !userHasTenantUpdatePermissions}
          />
          <SelectField
            name="timezone"
            label="Timezone *"
            options={timezones}
            data-automation="timezoneList"
            disabled={isSaving || !userHasTenantUpdatePermissions}
            required
          />
          {selectedEntityId !== 'create' && (
            <SelectField
              name="outboundIntegrationId"
              label="Default Outbound Gateway"
              data-automation="outboundIntegrationList"
              disabled={isSaving || !userHasTenantUpdatePermissions}
              options={outboundIntegrations.size === 0 ? [{ label: '-- None --', value: '' }] : outboundIntegrations}
              required
            />
          )}
          {selectedEntityId !== 'create' &&
            userHasTenantIdpViewPermissions && (
              <Fragment>
                <SelectField
                  name="cxengageIdentityProvider"
                  label="Platform Authentication"
                  disabled={true}
                  data-automation="platformAuthenticationList"
                  options={[{ label: 'Enabled', value: 'enabled' }, { label: 'Disabled', value: 'disabled' }]}
                />
                <SelectField
                  name="defaultIdentityProvider"
                  label="Single Sign On Identity Provider"
                  data-automation="ssoIdpList"
                  disabled={isSaving || !userHasTenantUpdatePermissions || selectedEntityId === 'create'}
                  options={identityProviders.size === 0 ? [{ label: '-- None --', value: '' }] : identityProviders}
                  required
                />
              </Fragment>
            )}
          {selectedEntityId !== 'create' && (
            <SelectField
              name="regionId"
              label="Region"
              options={regions}
              data-automation="regionList"
              disabled={isSaving || !userHasTenantUpdatePermissions || selectedEntityId !== 'create'}
            />
          )}
          {selectedEntityId !== 'create' && <Detail label="Tenant ID" value={initialValues.get('id')} />}
          {selectedEntityId !== 'create' &&
            currentTenantId !== selectedEntityId &&
            userHasPlatformViewPermission && (
              <ConfirmationWrapper
                confirmBtnCallback={() => {
                  switchTenant(selectedEntityId, true);
                }}
                mainText="This will switch you over to this tenant"
                secondaryText="Do you want to continue?"
              >
                <ResetButton
                  name="setAsActiveTenant"
                  data-automation="setActiveTenantButton"
                  disabled={isSaving || !userHasTenantUpdatePermissions}
                >
                  Set as Active Tenant
                </ResetButton>
              </ConfirmationWrapper>
            )}
          {selectedEntityId !== 'create' && (
            <Fragment>
              <DetailHeader text="Parent Tenant" />
              <Detail label="Tenant ID" value={initialValues.getIn(['parent', 'id'])} />
              <Detail label="Tenant Name" value={initialValues.getIn(['parent', 'name'])} />
            </Fragment>
          )}
          {selectedEntityId !== 'create' && (
            <Fragment>
              <DetailHeader text="SLA" />
              <SelectField
                name="defaultSlaId"
                label="Default Tenant SLA*"
                data-automation="slaList"
                disabled={isSaving || !userHasTenantUpdatePermissions}
                options={tenantSlas.size === 0 ? [{ label: '-- None --', value: '' }] : tenantSlas}
              />
            </Fragment>
          )}
          <DetailHeader text="Branding" />
          {selectedEntityId !== 'create' && (
            <Fragment>
              <InputField
                name="productName"
                label="Product Name"
                componentType="input"
                inputType="text"
                data-automation="productInput"
                disabled={!userHasBrandingProductNameUpdatePermissions}
              />
              {!isSelectedTenantHasDefaultBranding && (
                <ConfirmationWrapper
                  confirmBtnCallback={
                    userHasTenantBrandingUpdatePermissions ? () => resetTenantBranding(selectedEntityId) : undefined
                  }
                  mainText="This will reset this tenant's branding to default"
                  secondaryText="Do you want to continue?"
                >
                  <ResetButton
                    children="Reset Branding to Default"
                    name="resetBranding"
                    data-automation="resetBrandingButton"
                    disabled={!userHasTenantBrandingUpdatePermissions}
                  >
                    Reset Branding to Default
                  </ResetButton>
                </ConfirmationWrapper>
              )}
            </Fragment>
          )}
          <SubDetailHeader text="Images" />
          <FileUploadField
            name="logo"
            label="Logo/Header"
            fileType="image"
            maxFileSize={1000000}
            uploadFile={uploadImage}
            acceptedFileType={logoTypesAllowed.toString()}
            toastError="Logo must be a PNG, JPG, or GIF under 1MB!"
            disabled={isSaving || !userHasTenantBrandingUpdatePermissions}
          />
          <FileUploadField
            name="favicon"
            label="Favicon"
            fileType="image"
            maxFileSize={1000000}
            uploadFile={uploadImage}
            acceptedFileType={faviconTypesAllowed.toString()}
            toastError="Favicon must be a PNG, JPG, GIF or ICO under 1MB!"
            disabled={isSaving || !userHasTenantBrandingUpdatePermissions}
          />
          <SubDetailHeader text="Site Colors" />
          <ColorFieldWrapper>
            <ColorField
              name="navbar"
              label="Navigation Bar"
              data-automation="navBarInput"
              disabled={isSaving || !userHasTenantBrandingUpdatePermissions}
            />
            <ColorField
              name="navbarText"
              label="Navigation Bar Text"
              data-automation="navBarTextInput"
              disabled={isSaving || !userHasTenantBrandingUpdatePermissions}
            />
            <ColorField
              name="primaryColor"
              label="Primary Color"
              data-automation="primaryColorInput"
              disabled={isSaving || !userHasTenantBrandingUpdatePermissions}
            />
            <ColorField
              name="accentColor"
              label="Accent Color"
              data-automation="accentColorInput"
              disabled={isSaving || !userHasTenantBrandingUpdatePermissions}
            />
            <ColorField
              name="accentHoverColor"
              label="Accent Hover Color"
              data-automation="accentHoverColorInput"
              disabled={isSaving || !userHasTenantBrandingUpdatePermissions}
            />
          </ColorFieldWrapper>
        </Fragment>
      )}
    </form>
  );
}

TenantsForm.propTypes = {
  key: PropTypes.string,
  isSaving: PropTypes.bool,
  uploadImage: PropTypes.func,
  switchTenant: PropTypes.func,
  currentTenantId: PropTypes.string,
  selectedEntityId: PropTypes.string,
  resetTenantBranding: PropTypes.func,
  allDependenciesFetched: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  userHasTenantUpdatePermissions: PropTypes.bool,
  isSelectedTenantHasDefaultBranding: PropTypes.bool,
  userHasTenantBrandingUpdatePermissions: PropTypes.bool,
  userHasTenantIdpViewPermissions: PropTypes.bool,
  userHasPlatformViewPermission: PropTypes.bool,
  userHasBrandingProductNameUpdatePermissions: PropTypes.bool,
  regions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  timezones: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tenantSlas: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tenantUsers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  identityProviders: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  outboundIntegrations: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
