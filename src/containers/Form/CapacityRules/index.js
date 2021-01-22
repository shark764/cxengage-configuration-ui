/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';

import CapacityRulesForm from './layout';
import { formValidation } from './validation';
import {
  selectCapacityRulesFormInitialValues,
  selectCapacityRuleVersions,
} from '../../../redux/modules/entities/capacityRules/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateCapacityRulesForm = compose(
  connect((state) => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true,
  })
)(CapacityRulesForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectCapacityRulesFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    versions: selectCapacityRuleVersions(state),
  };
}

export default injectIntl(connect(mapStateToProps)(CreateCapacityRulesForm));
