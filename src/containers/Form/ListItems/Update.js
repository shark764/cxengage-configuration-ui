/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import ListItemsForm from './layout';
import { setSelectedSubEntityId } from '../../../redux/modules/entities';
import { getSelectedSubEntityId, isSubEntitySaving } from '../../../redux/modules/entities/selectors';
import { subEntityFormSubmission } from '../../../redux/modules/form/selectors';
import { getUpdateFieldItems, getInitialValues } from './selectors';
import validate from './validation';

const UpdateListItemsForm = compose(
  connect(state => ({
    form: `listItems:${getSelectedSubEntityId(state)}`
  })),
  reduxForm({
    onSubmit: subEntityFormSubmission,
    validate
  })
)(ListItemsForm);

export function mapStateToProps(state) {
  return {
    listItemName: getSelectedSubEntityId(state),
    fieldItems: getUpdateFieldItems(state),
    initialValues: getInitialValues(state),
    isSaving: isSubEntitySaving(state),
    key: getSelectedSubEntityId(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateListItemsForm);
