/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

/**
 *
 * IdentityProvidersForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField, Detail, FileDownload, FileUploadField } from 'cx-ui-components';
import styled from 'styled-components';

const A = styled.a`
  display: flex;
  flex-direction: column;
  margin-left: 175px;
  margin-bottom: 8px;
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`;

export default class IdentityProvidersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableXmlInputEdit: true,
      showMetadataUrlInput: false,
    };
  }

  downloadFile = (e, initialValues) => {
    e.preventDefault();
    const idpName = initialValues.name;
    const doc = initialValues.metadataFile;
    const fileToExport = new Blob([doc], {
      type: 'text/xml',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(fileToExport);
    a.target = '_blank';
    a.download = `${idpName}_configuration.xml`;
    a.click();
  };

  render() {
    const initValues = this.props.initialValues.toJS();
    const idpTypes = (!initValues.id) ?
      this.props.identityProviderTypes :
      this.props.identityProviderTypes.filter(
        idpType => idpType.value !== 'sharedIdentityProviderLinkId');
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <DetailHeader text="Details" />
        <InputField
          className="frm-identityproviders-name"
          name="name"
          label="Name *"
          data-automation="nameInput"
          componentType="input"
          inputType="text"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
          required
        />
        <InputField
          className="frm-identityproviders-description"
          name="description"
          label="Description"
          data-automation="descriptionInput"
          componentType="textarea"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
        />
        <SelectField
          className="frm-identityproviders-type"
          name="identityProviderType"
          label="Type *"
          placeholder="Select type..."
          data-automation="identityProviderTypeList"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
          options={[{ label: 'Select type...', value: '' }, ...idpTypes]}
          required
        />

        <DetailHeader text="Configuration" />
        {(this.props.idpType === 'url' || this.props.idpType === 'xml') && (
          <InputField
            className="frm-identityproviders-emailmapping"
            name="emailMapping"
            label="Email Mapping *"
            data-automation="emailMappingInput"
            componentType="input"
            inputType="text"
            disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
            required
          />
        )}
        {(this.props.idpType === 'url' &&
          this.state.showMetadataUrlInput) && (
            <InputField
              className="frm-identityproviders-emailmapping"
              name="metadataUrl"
              label="Metadata URL *"
              data-automation="metadataUrlInput"
              componentType="input"
              inputType="text"
              disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
              required
            />
          )}
        {(this.props.idpType === 'url' &&
          !this.state.showMetadataUrlInput) && (
            <Detail
              name="metadataUrl"
              label="Metadata URL *"
              value={
                initValues.metadataUrl
                  ? initValues.metadataUrl
                  : '(No URL to XML Config Set)'
              }
            />
          )}
        {this.props.idpType === 'url' &&
          !initValues.metadataUrl &&
          !this.state.showMetadataUrlInput && (
            <A onClick={() => this.setState({ showMetadataUrlInput: true })}>add url</A>
          )}

        {this.props.idpType === 'xml' &&
          initValues.metadataFile && (
            <>
              <FileDownload
                label="Upload XML Config *"
                onClick={(e) => this.downloadFile(e, initValues)}
                value="Download Current Config"
                disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
                id="dtpanel-identity-providers-download-xml"
              />
            </>
          )}
        {this.props.idpType === 'xml' &&
          !initValues.metadataFile && (
            <>
              <FileUploadField
                uploadFile={()=> ""}
                fileType="text/xml"
                acceptedFileType="text/xml"
                label="Upload XML Config *"
                disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
                id="metadataFile"
                name="metadataFile"
                maxFileSize={1000000}
                toastError="File must be an XML under 10MB"
                required
              />
            </>
          )}
        {this.props.idpType === 'xmlDirectInput' && (
          <>
            <InputField
              className="frm-identityproviders-metadataFile"
              name="metadataFile"
              label="Enter XML Markup Here *"
              data-automation="metadataFileInput"
              componentType="textarea"
              inputType="text"
              disabled={this.state.disableXmlInputEdit && initValues.metadataFile ? true : false}
              required
            />
          </>
        )}
        {this.props.idpType === 'xmlDirectInput' &&
          this.state.disableXmlInputEdit &&
          initValues.metadataFile && (
            <A onClick={() => this.setState({ disableXmlInputEdit: false })}>edit xml markup</A>
          )}
        {this.props.idpType === 'xmlDirectInput' &&
          !this.state.disableXmlInputEdit && <A onClick={() => this.setState({ disableXmlInputEdit: true })}>cancel</A>}
        <Detail
          name="identityProvider"
          label="Shared Identity Provider ID *"
          value={initValues.identityProvider}
        />
      </form>
    );
  }
}

IdentityProvidersForm.propTypes = {
  initialValues: PropTypes.object,
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  idpType: PropTypes.string,
  identityProviderTypes: PropTypes.array,
  uploadXml: PropTypes.func,
};
