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
    const {
      props: {
        intl: { formatMessage },
      },
    } = this;

    const initValues = this.props.initialValues.toJS();
    const idpTypes = (!initValues.id) ?
      this.props.identityProviderTypes :
      this.props.identityProviderTypes.filter(
        idpType => idpType.value !== 'sharedIdentityProviderLinkId');
    idpTypes.map((type) => {
      switch(type.value) {
        case 'url': {
          type.label = formatMessage({
            id: 'identityProviders.details.selectedIdpConfigInfoType.url',
            defaultMessage: 'URL'
          });
          break;
        }
        case 'xml': {
          type.label = formatMessage({
            id: 'identityProviders.details.selectedIdpConfigInfoType.xml',
            defaultMessage: 'XML File'
          });
          break;
        }
        case 'xmlDirectInput': {
          type.label = formatMessage({
            id: 'identityProviders.details.selectedIdpConfigInfoType.xmlDirectInput',
            defaultMessage: 'XML Direct Input'
          });
          break;
        }
        case 'sharedIdentityProviderLinkId': {
          type.label = formatMessage({
            id: 'identityProviders.details.selectedIdpConfigInfoType.sharedIdentityProviderAccessCode',
            defaultMessage: 'Shared Access Code'
          });
          break;
        }
      }
    });
    return (
      <form onSubmit={this.props.handleSubmit} key={this.props.key}>
        <DetailHeader text={`${formatMessage({
            id: 'identityProviders.details.details',
            defaultMessage: 'Details'
          })}`}
        />
        <InputField
          className="frm-identityproviders-name"
          name="name"
          label={`${formatMessage({
            id: 'identityProviders.details.name',
            defaultMessage: 'Name'
          })} *`}
          data-automation="nameInput"
          componentType="input"
          inputType="text"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
          required
        />
        <InputField
          className="frm-identityproviders-description"
          name="description"
          label={`${formatMessage({
            id: 'identityProviders.details.description',
            defaultMessage: 'Description'
          })}`}
          data-automation="descriptionInput"
          componentType="textarea"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
        />
        <SelectField
          className="frm-identityproviders-type"
          name="identityProviderType"
          label={`${formatMessage({
            id: 'identityProviders.details.type',
            defaultMessage: 'Type'
          })} *`}
          placeholder={`${formatMessage({
            id: 'identityProviders.details.idpConfigInfoTypes.choose',
            defaultMessage: 'Select type...'
          })} *`}
          data-automation="identityProviderTypeList"
          disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
          options={[{
            label: formatMessage({
              id: 'identityProviders.details.idpConfigInfoTypes.choose',
              defaultMessage: 'Select type...'
            }),
            value: ''
          }, ...idpTypes]}
          required
        />

        <DetailHeader text={`${formatMessage({
            id: 'identityProviders.details.configuration',
            defaultMessage: 'Configuration'
          })}`}
        />
        {(this.props.idpType === 'url' || this.props.idpType === 'xml') && (
          <InputField
            className="frm-identityproviders-emailMapping"
            name="emailMapping"
            label={`${formatMessage({
              id: 'identityProviders.details.emailMapping',
              defaultMessage: 'Email Mapping'
            })} *`}
            data-automation="emailMappingInput"
            componentType="input"
            inputType="text"
            disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
            required
          />
        )}
        {((!initValues.id && this.props.idpType === 'url') ||
        (this.props.idpType === 'url' && this.state.showMetadataUrlInput)) && (
          <InputField
            className="frm-identityproviders-metadataUrl"
            name="metadataUrl"
            label={`${formatMessage({
              id: 'identityProviders.details.metadataUrl',
              defaultMessage: 'Metadata URL'
            })} *`}
            data-automation="metadataUrlInput"
            componentType="input"
            inputType="text"
            disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
            required
          />
        )}
        {(initValues.id && this.props.idpType === 'url' &&
          !this.state.showMetadataUrlInput) && (
            <Detail
              name="metadataUrl"
              label={`${formatMessage({
                id: 'identityProviders.details.metadataUrl',
                defaultMessage: 'Metadata URL'
              })} *`}
              value={
                initValues.metadataUrl
                  ? initValues.metadataUrl
                  : formatMessage({
                      id: 'identityProviders.details.metadataUrl.noUrl',
                      defaultMessage: '(No URL to XML Config Set)'
                    })
              }
            />
          )}
        {initValues.id && this.props.idpType === 'url' &&
          initValues.metadataUrl &&
          !this.state.showMetadataUrlInput && (
            <A onClick={() => this.setState({ showMetadataUrlInput: true })}>
              {`${formatMessage({
                id: 'identityProviders.details.editXmlUrl',
                defaultMessage: 'edit'
              })}`}
            </A>
          )}
        {initValues.id && this.props.idpType === 'url' &&
          !initValues.metadataUrl &&
          !this.state.showMetadataUrlInput && (
            <A onClick={() => this.setState({ showMetadataUrlInput: true })}>
            {`${formatMessage({
              id: 'identityProviders.details.addXmlUrl',
              defaultMessage: 'add url'
            })}`}
            </A>
          )}

          {this.props.idpType === 'xml' && (
            <>
              <FileUploadField
                uploadFile={()=> ""}
                fileType="text/xml"
                acceptedFileType="text/xml"
                label={`${formatMessage({
                  id: 'identityProviders.details.uploadXmlConfig',
                  defaultMessage: 'Upload XML Config'
                })} *`}
                disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
                id="newMetadataFile"
                name="newMetadataFile"
                maxFileSize={1000000}
                toastError={`${formatMessage({
                  id: 'identityProviders.details.uploadXmlConfig.error',
                  defaultMessage: 'File must be an XML under 10MB'
                })} *`}
                required
              />
            </>
          )}

        {this.props.idpType === 'xml' &&
          initValues.metadataFile && (
            <>
              <FileDownload
                label=""
                onClick={(e) => this.downloadFile(e, initValues)}
                value={`${formatMessage({
                  id: 'identityProviders.details.downloadXmlConfig',
                  defaultMessage: 'Download Current Config'
                })}`}
                disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
                id="dtpanel-identity-providers-download-xml"
              />
            </>
          )}

        {this.props.idpType === 'xmlDirectInput' && (
            <InputField
              className="frm-identityproviders-metadataFile"
              name="metadataFile"
              label={`${formatMessage({
                id: 'identityProviders.details.enterXml',
                defaultMessage: 'Enter XML Markup Here'
              })} *`}
              data-automation="metadataFileInput"
              componentType="textarea"
              inputType="text"
              disabled={this.state.disableXmlInputEdit && initValues.metadataFile ? true : false}
              required
            />
        )}
        {this.props.idpType === 'xmlDirectInput' &&
          this.state.disableXmlInputEdit &&
          initValues.metadataFile && (
            <A onClick={() => this.setState({ disableXmlInputEdit: false })}>
              {`${formatMessage({
                id: 'identityProviders.details.editXmlMarkup',
                defaultMessage: 'edit xml markup'
              })}`}
            </A>
          )}
        {this.props.idpType === 'xmlDirectInput' &&
          !this.state.disableXmlInputEdit && <A onClick={() => this.setState({ disableXmlInputEdit: true })}>
            {`${formatMessage({
              id: 'identityProviders.details.cancelEditXmlMarkup',
              defaultMessage: 'cancel'
            })}`}
          </A>}
        {(!initValues.id && this.props.idpType === 'sharedIdentityProviderLinkId') && (
          <InputField
            className="frm-identityproviders-identityProvider"
            name="identityProvider"
            label={`${formatMessage({
              id: 'identityProviders.details.sharedAccessCode',
              defaultMessage: 'Access Code'
            })} *`}
            data-automation="identityProviderInput"
            componentType="input"
            inputType="text"
            disabled={this.props.isSaving || !this.props.userHasUpdatePermission}
            required
          />
        )}
        {initValues.id && (
          <Detail
            name="identityProvider"
            label={`${formatMessage({
              id: 'identityProviders.details.sharedIdentityProviderId',
              defaultMessage: 'Shared Identity Provider ID'
            })} *`}
            value={initValues.identityProvider}
          />
        )}
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
  intl: PropTypes.object.isRequired,
};
