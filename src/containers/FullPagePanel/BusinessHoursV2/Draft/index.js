import { connect } from 'react-redux';
import { submit, arrayPush } from 'redux-form';

import EditDraft from './layout';

import { getFormValues } from '../../../../redux/modules/form/selectors';
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

export function mapStateToProps(state) {
  return {
    formsAreInvalid: draftFormsAreInvalid(state),
    formsAreDirty: draftFormsAreDirty(state),
    shouldPublish: shouldPublishDraft(state),
    isSubEntitySaving: isSubEntitySaving(state),
    draftName: getFormValues(state, 'draft:edit', 'name'),
    versions: selectBusinessHoursEntityVersions(state),
    isPublishingDraft: isPublishingDraft(state),
    rules: getFormValues(state, 'businessHoursV2:rules', 'rules'),
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
