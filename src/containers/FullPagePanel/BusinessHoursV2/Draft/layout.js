import React, { Fragment, Component } from 'react';
import { Map } from 'immutable';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button,
  ConfirmationWrapper,
  Modal,
  InputField,
  SidePanelActions,
  ToggleField,
  DetailHeader
} from 'cx-ui-components';
import CalendarEvents from '../../../../components/BusinessHoursCalendar';
import { isEmpty } from 'serenova-js-utils/strings';

import DetailWrapper from '../../../../components/DetailWrapper';
import SidePanelHeaderContainer from '../SidePanelHeader';
import BusinessHoursV2Draft from '../../../Form/BusinessHoursV2/Draft';
import BusinessHoursV2RulesForm from '../../../Form/BusinessHoursV2/RulesForm';
import { ruleValidation } from '../../../Form/BusinessHoursV2/RulesForm/validation';

const SidePanelHeader = styled(SidePanelHeaderContainer)`
  width: 65%;
`;

const HeaderContainer = styled.div`
  min-height: 86px;
  padding: 10px 14px 16px;
`;

const ButtonWrapper = styled.div`
  margin: 0 10px 0 0;
  box-sizing: border-box;
`;

const SidePanelActionsContainer = styled.div`
  width: 35%;
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const FormPanel = styled.div`
  padding: 10px 14px 16px;
  display: flex;
`;

const ExceptionsPanel = styled.div`
  padding: 10px 14px 16px;
  width: 100%;
`;

const DraftFormWrapper = styled.div`
  width: 30%;
`;

const CalendarWrapper = styled.div`
  width: 65%;
`;

const ModalWrapper = styled.div`
  min-height: 150px;
  overflow: auto;
  margin-top: 10px;
`;

const ModalTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
`;

const ModalActions = styled(SidePanelActions)`
  display: flow-root;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 55px;
  color: #2e9afe;
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

const PublishForm = reduxForm({
  form: 'businessHoursV2:publishDraft'
})(function({ handleSubmit, isInitialDraft, onCancel, invalid, isSaving }) {
  return (
    <form onSubmit={handleSubmit}>
      <ModalActions onCancel={onCancel} isSaving={isSaving} invalid={invalid} />
      <ModalTitle>Publish Draft</ModalTitle>
      <ModalWrapper>
        <InputField
          name="versionName"
          label="Version Name"
          componentType="input"
          inputType="text"
          disabled={isSaving}
        />
        <ToggleField name="makeActive" disabled={isSaving || isInitialDraft} label="Make active" />
      </ModalWrapper>
    </form>
  );
});

export default class BusinessHoursV2DraftEditFullPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPublishModalOpen: false
    };
  }

  togglePublishModal = e => {
    e.preventDefault();
    this.setState(prevProps => ({
      isPublishModalOpen: !prevProps.isPublishModalOpen
    }));
  };

  render() {
    const {
      props: {
        cancel,
        saveDraft,
        publishDraft,
        saveBeforePublish,
        shouldPublish,
        isSubEntitySaving,
        formsAreDirty,
        formsAreInvalid,
        draftName,
        versions,
        isPublishingDraft
      },
      state: { isPublishModalOpen }
    } = this;

    return (
      <Fragment>
        <HeaderContainer>
          <SidePanelActionsContainer>
            <ButtonWrapper>
              <ConfirmationWrapper
                confirmBtnCallback={!isSubEntitySaving && !isPublishingDraft && formsAreDirty ? cancel : undefined}
                mainText="You have unsaved changes that will be lost!."
                secondaryText="Click Confirm to discard changes, or Cancel to continue editing."
              >
                <Button
                  buttonType="secondary"
                  disabled={isSubEntitySaving || isPublishingDraft}
                  onClick={!isSubEntitySaving && !isPublishingDraft && !formsAreDirty ? cancel : undefined}
                >
                  Cancel
                </Button>
              </ConfirmationWrapper>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button
                buttonType="primary"
                onClick={saveDraft}
                disabled={isSubEntitySaving || !formsAreDirty || formsAreInvalid || isPublishingDraft}
              >
                Save Draft
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button
                buttonType="primary"
                disabled={!shouldPublish || isSubEntitySaving || formsAreInvalid || isPublishingDraft}
                onClick={this.togglePublishModal}
              >
                {`${formsAreDirty ? 'Save and ' : ''}Publish`}
              </Button>
            </ButtonWrapper>
          </SidePanelActionsContainer>
          <SidePanelHeader />
        </HeaderContainer>
        <FormPanel>
          <DraftFormWrapper>
            <BusinessHoursV2Draft />
          </DraftFormWrapper>
          <CalendarWrapper>
            <CalendarEvents
              rules={
                this.props.rules
                  ? this.props.rules
                      .filter(rule => !ruleValidation(rule, this.props.rules))
                      .toJS()
                      .map(({ on, on: { type, value } = {}, ...rule }) => ({
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
                  : []
              }
              eventType={eventType}
            />
          </CalendarWrapper>
        </FormPanel>
        <ExceptionsPanel>
          <DetailWrapper customCaretIcon="margin-top: 6px;display: inline-block;margin-left: 23px;" open>
            <WrappedDetailHeader
              customLineSpacer="border-top: 1px solid #2E9AFE; flex-grow: 1; margin: 10px 10px 0;align-self: center;"
              fontSize="20px"
              text="Hours and Exceptions"
              userHasUpdatePermission={this.props.userHasUpdatePermission}
              onActionButtonClick={this.props.addRule}
            />
            <BusinessHoursV2RulesForm />
          </DetailWrapper>
        </ExceptionsPanel>
        {isPublishModalOpen && (
          <Modal onMaskClick={!this.props.isPublishingDraft && this.togglePublishModal}>
            <PublishForm
              onSubmit={values => {
                if (formsAreDirty) {
                  saveBeforePublish(values.set('isInitialDraft', !versions || versions.length === 0));
                } else {
                  publishDraft(values.set('isInitialDraft', !versions || versions.length === 0));
                }
              }}
              initialValues={Map({
                versionName: draftName,
                makeActive: !versions || versions.length === 0
              })}
              validate={values => ({
                versionName:
                  (isEmpty(values.get('versionName')) && "Version Name can't be empty") ||
                  (versions &&
                    versions.some(
                      version =>
                        version.name.toLowerCase() ===
                        values
                          .get('versionName')
                          .trim()
                          .toLowerCase()
                    ) &&
                    'Version name should be unique')
              })}
              isInitialDraft={!versions || versions.length === 0}
              onCancel={this.togglePublishModal}
              isSaving={isPublishingDraft || isSubEntitySaving}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}

PublishForm.propTypes = {
  handleSubmit: PropTypes.func,
  isInitialDraft: PropTypes.bool,
  onCancel: PropTypes.func,
  invalid: PropTypes.bool,
  isSaving: PropTypes.bool
};

BusinessHoursV2DraftEditFullPage.propTypes = {
  cancel: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  publishDraft: PropTypes.func.isRequired,
  saveBeforePublish: PropTypes.func.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  formsAreDirty: PropTypes.bool,
  formsAreInvalid: PropTypes.bool,
  shouldPublish: PropTypes.bool,
  isSubEntitySaving: PropTypes.bool,
  draftName: PropTypes.string,
  versions: PropTypes.array,
  isPublishingDraft: PropTypes.bool,
  rules: PropTypes.object,
  addRule: PropTypes.func
};
