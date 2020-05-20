import { connect } from 'react-redux';
import { submit, arrayPush } from 'redux-form';
import { formValueSelector } from 'redux-form/immutable';

import EditDraft from './layout';

import {
  setSelectedSubEntityId,
  publishBusinessHoursV2Draft,
  saveBeforePublishBusinessHoursV2Drfat
} from '../../../../redux/modules/entities';
import { isSubEntitySaving, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import {
  draftFormsAreDirty,
  draftFormsAreInvalid,
  shouldPublishDraft,
  selectBusinessHoursEntityVersions,
  isPublishingDraft
} from '../../../../redux/modules/entities/businessHoursV2/selectors';

const draftFormSelector = formValueSelector('draft:edit');
const ruleFormSelector = formValueSelector('businessHoursV2:rules');

export function mapStateToProps(state) {
  return {
    formsAreInvalid: draftFormsAreInvalid(state),
    formsAreDirty: draftFormsAreDirty(state),
    shouldPublish: shouldPublishDraft(state),
    isSubEntitySaving: isSubEntitySaving(state),
    draftName: draftFormSelector(state, 'name'),
    versions: selectBusinessHoursEntityVersions(state),
    isPublishingDraft: isPublishingDraft(state),
    rules: ruleFormSelector(state, 'rules'),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export const actions = {
  cancel: () => setSelectedSubEntityId(undefined),
  saveDraft: () => submit('draft:edit'),
  publishDraft: values => publishBusinessHoursV2Draft(values),
  saveBeforePublish: values => saveBeforePublishBusinessHoursV2Drfat(values),
  addRule: () =>
    arrayPush('businessHoursV2:rules', 'rules', {
      id: `new-rule-${Math.floor(Math.random() * 1000)}`,
      startDate: new Date(),
      hours: {
        allDay: true
      },
      name: ''
    })
};

export default connect(mapStateToProps, actions)(EditDraft);
