import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';
import {
  Modal,
  InputField,
  SidePanelActions,
  DetailHeader,
  SidePanelTable,
  AutoCompleteField,
  DetailsPanelAlert
} from 'cx-ui-components';
import { isEmpty } from 'serenova-js-utils/strings';

import SidePanelHeaderContainer from '../SidePanelHeader';
import BusinessHoursV2 from '../../../Form/BusinessHoursV2';
import RulesForm from '../../../Form/BusinessHoursV2/RulesForm';
import SidePanelActionsContainer from '../../../../containers/SidePanelActions';
import DetailWrapper from '../../../../components/DetailWrapper';
import CalendarEvents from '../../../../components/BusinessHoursCalendar';
import { detailHeaderText } from '../../../../utils';

const SidePanelHeader = styled(SidePanelHeaderContainer)`
  width: 60%;
`;

const InheritedDetailsPanelAlert = styled(DetailsPanelAlert)`
  margin-right: 30px;
  margin-left: 20px;
`;

const HeaderContainer = styled.div`
  min-height: 86px;
  padding: 10px 14px 16px;
`;

const HeaderActions = styled(SidePanelActionsContainer)`
  width: 40%;
  float: right;
`;

const FieldsColumn = styled.div`
  padding: 10px 14px;
  width: 30%;
  margin-rigth: 35px;
`;

const CalendarColumn = styled.div`
  width: 65%;
`;

const VersionsColumn = styled.div`
  width: 95%;
  margin-left: 50px;
`;

const RowWrapper = styled.div`
  width: 100%;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 55px;
  color: #2e9afe;
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const ModalWrapper = styled.div`
  min-height: ${props => (props.minHeight ? props.minHeight : '100px')};
  overflow: auto;
  margin-top: 10px;
`;

const ModalTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ModalActions = styled(SidePanelActions)`
  display: flow-root;
`;

const SelectedVersionDetailsPanelAlert = styled(DetailsPanelAlert)`
  background-color: #0090fe;
  border: none;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  margin-left: 50px;
  margin-right: 25px;
`;

const eventType = [
  {
    id: 0,
    state: true,
    name: 'Regular Hours',
    color: '#51CE90'
  },
  {
    id: 1,
    state: true,
    name: 'One-Time extended Hours',
    color: '#F1D29D'
  },
  {
    id: 2,
    state: true,
    name: 'Blackout Exceptions',
    color: '#F08695'
  },
  {
    id: 3,
    state: true,
    name: 'Blackout One-Time Exceptions',
    color: '#8383FD'
  }
];

const stringSortingMethod = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true });

const versionsEntitiyTableHeaders = [
  {
    type: 'string',
    name: 'version',
    label: 'Version',
    required: true,
    customSortMethod: stringSortingMethod
  },
  {
    type: 'string',
    name: 'name',
    label: 'Name',
    required: true,
    customSortMethod: stringSortingMethod
  },
  {
    type: 'string',
    name: 'timezone',
    label: 'Timezone',
    required: true,
    customSortMethod: (a, b) => {
      if (a && b) {
        return stringSortingMethod(a, b);
      } else if (!a && b) {
        return -1;
      } else if (a && !b) {
        return 1;
      }
    }
  },
  {
    type: 'string',
    name: 'createdBy',
    label: 'Created By',
    required: true,
    customSortMethod: stringSortingMethod
  },
  {
    format: 'datetime',
    name: 'createdOn',
    label: 'Created On',
    required: true,
    customSortMethod: (a, b) => {
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    }
  }
];

const CreateDraftForm = reduxForm({
  form: 'businessHoursV2:createDraft'
})(function({ handleSubmit, onCancel, invalid, isSaving }) {
  return (
    <form onSubmit={handleSubmit}>
      <ModalActions onCancel={onCancel} isSaving={isSaving} invalid={invalid} />
      <ModalTitle>New Draft</ModalTitle>
      <ModalWrapper>
        <InputField name="draftName" label="Draft Name" componentType="input" inputType="text" disabled={isSaving} />
      </ModalWrapper>
    </form>
  );
});

const CreateCopyVersionForm = reduxForm({
  form: 'businessHoursV2:copyVersion'
})(function({
  handleSubmit,
  onCancel,
  invalid,
  isSaving,
  businessHoursList,
  copyVersionId,
  isCopyVersion,
  versions,
  drafts,
  businessHourId,
  inherited
}) {
  const businessHoursName = !inherited ? businessHoursList.find(bh => bh.id === businessHourId).name : '';
  const { name, version } = versions.find(v => v.id === copyVersionId) || drafts.find(v => v.id === copyVersionId);
  return (
    <form onSubmit={handleSubmit}>
      <ModalActions onCancel={onCancel} isSaving={isSaving} invalid={invalid} />
      <br />
      {!isCopyVersion && (
        <Fragment>
          <ModalTitle title={businessHoursName}>Creating New Draft for: {businessHoursName}</ModalTitle>
        </Fragment>
      )}
      <ModalWrapper minHeight={isCopyVersion ? '250px' : '100px'}>
        {isCopyVersion && (
          <Fragment>
            <ModalTitle title={name}>
              Copying {version === 'Draft' ? 'Draft' : 'Version'}: {name}
            </ModalTitle>
            <AutoCompleteField
              name="toBusinessHours"
              label="To Business Hours"
              placeholder="Select a Business Hour..."
              suggestedDropDownWidth="100%"
              suggestions={businessHoursList.map(({ name }) => name)}
              data-automation="categoryNameAutoComplete"
              suggestedDropdownStyle={{ width: '100%', overflowX: 'hidden', whiteSpace: 'nowrap' }}
              required
            />
            <br />
            <br />
          </Fragment>
        )}
        <InputField
          name="draftName"
          label="New Draft Name"
          componentType="input"
          inputType="text"
          disabled={isSaving}
        />
      </ModalWrapper>
    </form>
  );
});

export default class BusinessHoursV2UpdateFullPage extends Component {
  constructor(props) {
    super();
    this.state = {
      isCreateModalOpen: false,
      isCopyModalOpen: false
    };
  }

  toggleCreateModal = () => {
    this.setState(({ isCreateModalOpen: prevIsCreateModalOpen }) => ({
      isCreateModalOpen: !prevIsCreateModalOpen
    }));
  };

  toggleCopyModal = () => {
    this.setState(({ isCopyModalOpen: prevIsCopyModalOpen }) => ({
      isCopyModalOpen: !prevIsCopyModalOpen
    }));
  };

  copyBusinessHoursVersion = id => {
    this.setState({
      copyVersionId: id,
      isCopyModalOpen: true,
      isCopyVersion: true
    });
  };

  updateBusinessHoursVersion = selectedVersion => {
    if (selectedVersion.version === 'Draft') {
      this.props.setSelectedSubEntityId(selectedVersion.id);
    }
    this.setState({
      copyVersionId: selectedVersion.id,
      isCopyModalOpen: true,
      isCopyVersion: false
    });
  };

  render() {
    return (
      <Fragment>
        <HeaderContainer>
          <HeaderActions hideSubmit={this.props.inherited || !this.props.userHasUpdatePermission} />
          <SidePanelHeader />
        </HeaderContainer>
        {this.props.inherited && (
          <InheritedDetailsPanelAlert
            text={`This Business Hours is inherited ${this.props.parentTenantName &&
              `from ${this.props.parentTenantName}`} and cannot be edited.`}
          />
        )}
        <WrapperDiv>
          <FieldsColumn>
            <BusinessHoursV2 />
          </FieldsColumn>
          <CalendarColumn>
            <CalendarEvents
              rules={
                this.props.rules &&
                this.props.rules.map(({ on, on: { type, value } = {}, ...rule }) => ({
                  ...rule,
                  ...(on && value && value === 'day'
                    ? {
                        on: {
                          type: value,
                          value: type
                        }
                      }
                    : on ? { on } : {})
                }))
              }
              eventType={eventType}
            />
          </CalendarColumn>
          <br />
          <RowWrapper>
            <DetailWrapper customCaretIcon="margin-top: 6px;display: inline-block;margin-left: 23px;" open>
              <WrappedDetailHeader
                customLineSpacer="border-top: 1px solid #2E9AFE; flex-grow: 1; margin: 10px 10px 0;align-self: center;"
                fontSize="20px"
                text="Versions"
              />
              <br />
              <VersionsColumn>
                <label>{`Versioning (${this.props.versions && this.props.versions.length} Published, ${this.props
                  .drafts && this.props.drafts.length} Drafts)`}</label>
                <DetailHeader
                  userHasUpdatePermission={!this.props.inherited && this.props.userHasUpdatePermission}
                  text={detailHeaderText(this.props.versions || [], 'Published')}
                  onActionButtonClick={this.props.drafts && this.toggleCreateModal}
                  inherited={this.props.inherited}
                  open
                />
                <SidePanelTable
                  items={[...(this.props.versions || []), ...(this.props.drafts || [])]}
                  fields={versionsEntitiyTableHeaders}
                  defaultSorted={[{ id: 'version', desc: true }]}
                  userHasUpdatePermission={this.props.userHasUpdatePermission}
                  userHasViewPermission={this.props.userHasViewPermission}
                  shouldShowViewButtonOnItem={
                    this.props.versions &&
                    (({ id }) => this.props.versions.find(({ id: versionId }) => id === versionId))
                  }
                  shouldShowCopyButtonOnItem={version =>
                    this.props.versions.find(v => v.id === version.id) ||
                    this.props.drafts.find(v => v.id === version.id)
                  }
                  shouldShowUpdateButtonOnItem={version =>
                    this.props.versions.find(v => v.id === version.id) ||
                    this.props.drafts.find(v => v.id === version.id)
                  }
                  shouldShowDeleteButtonOnItem={version => this.props.drafts.find(v => v.id === version.id)}
                  viewSubEntity={id => this.props.setSelectedBusinessHourVersion(id)}
                  copySubEntity={id => this.copyBusinessHoursVersion(id)}
                  deleteSubEntity={this.props.removeListItem}
                  updateSubEntity={id =>
                    this.updateBusinessHoursVersion(
                      this.props.versions.find(v => v.id === id) || this.props.drafts.find(v => v.id === id)
                    )
                  }
                  confirmDeleteSubEntity={true}
                  fetching={!this.props.versions || !this.props.drafts}
                  showInheritedViewOnlyViewButtonOnItem={this.props.inherited || this.props.userHasViewPermission} // View button available in view only or inherited
                  showInheritedViewOnlyCopyButtonOnItem={this.props.inherited} // Copy button available on inherited business hours
                  inherited={this.props.inherited}
                />
              </VersionsColumn>
            </DetailWrapper>
          </RowWrapper>
          <br />
          <RowWrapper>
            <DetailWrapper customCaretIcon="margin-top: 6px;display: inline-block;margin-left: 23px;" open>
              <WrappedDetailHeader
                customLineSpacer="border-top: 1px solid #2E9AFE; flex-grow: 1; margin: 10px 10px 0;align-self: center;"
                fontSize="20px"
                text="Hours and Exceptions"
              />
              {this.props.selectedBusinessHourVersion && (
                <SelectedVersionDetailsPanelAlert
                  text="Selected Version:"
                  boldText={
                    this.props.versions &&
                    this.props.selectedBusinessHourVersion &&
                    this.props.versions.find(({ id }) => id === this.props.selectedBusinessHourVersion)
                      ? this.props.versions.find(({ id }) => id === this.props.selectedBusinessHourVersion).name
                      : ''
                  }
                />
              )}
              <RulesForm />
            </DetailWrapper>
          </RowWrapper>
        </WrapperDiv>
        {this.state.isCreateModalOpen && (
          <Modal onMaskClick={!this.props.isCreatingDraft && this.toggleCreateModal}>
            <CreateDraftForm
              onSubmit={values => {
                this.props.createDraft(this.props.businessHourId, values.toJS());
              }}
              initialValues={Map({
                draftName: ''
              })}
              validate={values => ({
                draftName:
                  (isEmpty(values.get('draftName')) && "Draft Name can't be empty") ||
                  (this.props.drafts.some(
                    draft =>
                      draft.name.toLowerCase() ===
                      values
                        .get('draftName')
                        .trim()
                        .toLowerCase()
                  ) &&
                    'Draft name should be unique')
              })}
              isSaving={this.props.isCreatingDraft}
              onCancel={this.toggleCreateModal}
            />
          </Modal>
        )}
        {this.state.isCopyModalOpen && (
          <Modal onMaskClick={!this.props.isCreatingDraft && this.toggleCopyModal}>
            <CreateCopyVersionForm
              onSubmit={values => {
                const versionOrDraft =
                  this.props.versions.find(v => v.id === this.state.copyVersionId) ||
                  this.props.drafts.find(v => v.id === this.state.copyVersionId);
                const newDraft = {
                  draftName: values.get('draftName'),
                  description: versionOrDraft.description,
                  timezone: versionOrDraft.timezone,
                  rules: versionOrDraft.rules
                };
                if (this.state.isCopyVersion) {
                  const toBusinessHourName = values.get('toBusinessHours');
                  const businessHourId = this.props.businessHoursList.find(v => v.name === toBusinessHourName.trim())
                    .id;
                  this.props.createDraft(businessHourId, newDraft);
                } else {
                  this.props.createDraft(this.props.businessHourId, newDraft);
                }
              }}
              initialValues={Map({
                draftName: `Copy of ${
                  (
                    this.props.versions.find(v => v.id === this.state.copyVersionId) ||
                    this.props.drafts.find(v => v.id === this.state.copyVersionId)
                  ).name
                }`
              })}
              validate={values => ({
                version:
                  (isEmpty(values.get('version')) && "Business Hours can't be empty") ||
                  (!this.props.businessHoursList.find(bh => bh.name === values.get('version').trim()) &&
                    'You should select a business hours from the list'),
                draftName:
                  (isEmpty(values.get('draftName')) && "Draft Name can't be empty") ||
                  (values.get('version') &&
                    this.props.businessHoursList.find(bh => bh.name === values.get('version').trim()) &&
                    ((this.props.businessHoursList.find(bh => bh.name === values.get('version').trim()).versions &&
                      this.props.businessHoursList.find(bh => bh.name === values.get('version').trim()).versions.find(
                        ({ name }) =>
                          name.toLowerCase() ===
                          values
                            .get('draftName')
                            .trim()
                            .toLowerCase()
                      )) ||
                      (this.props.businessHoursList.find(bh => bh.name === values.get('version').trim()).items &&
                        this.props.businessHoursList.find(bh => bh.name === values.get('version').trim()).items.find(
                          ({ name }) =>
                            name.toLowerCase() ===
                            values
                              .get('draftName')
                              .trim()
                              .toLowerCase()
                        ))) &&
                    'Draft name should be unique for given business hour')
              })}
              isSaving={this.props.isCreatingDraft}
              onCancel={this.toggleCopyModal}
              businessHoursList={this.props.businessHoursList}
              copyVersionId={this.state.copyVersionId}
              isCopyVersion={this.state.isCopyVersion}
              versions={this.props.versions}
              drafts={this.props.drafts}
              businessHourId={this.props.businessHourId}
              inherited={this.props.inherited}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}

BusinessHoursV2UpdateFullPage.propTypes = {
  versions: PropTypes.array,
  rules: PropTypes.array,
  setSelectedBusinessHourVersion: PropTypes.func,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasSharePermission: PropTypes.bool,
  drafts: PropTypes.array,
  createDraft: PropTypes.func,
  businessHourId: PropTypes.string,
  isCreatingDraft: PropTypes.bool,
  setSelectedSubEntityId: PropTypes.func,
  selectedBusinessHourVersion: PropTypes.string,
  businessHoursList: PropTypes.array,
  removeListItem: PropTypes.func,
  parentTenantName: PropTypes.string
};

CreateDraftForm.propTypes = {
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  invalid: PropTypes.bool,
  isSaving: PropTypes.bool
};

CreateCopyVersionForm.propTypes = {
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  invalid: PropTypes.bool,
  isSaving: PropTypes.bool
};

BusinessHoursV2UpdateFullPage.defaultProps = {
  events: [],
  drafts: [],
  versions: []
};
