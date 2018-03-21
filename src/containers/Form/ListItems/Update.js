/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { ListItemsForm } from 'cx-ui-components';
import {
  setSelectedSubEntityId,
  onSubEntityFormSubmit,
  getSelectedSubEntityId,
  isSubEntitySaving
} from '../../../redux/modules/crudEndpoint';
import { getUpdateFieldItems, getInitialValues } from './selectors';
import validate from './validation';

let UpdateListItemsForm = compose(
  connect(state => ({
    form: `listItems:${getSelectedSubEntityId(state)}`
  })),
  reduxForm({
    onSubmit: (values, dispatch, props) =>
      dispatch(onSubEntityFormSubmit(values, props)),
    validate
  })
)(ListItemsForm);

function mapStateToProps(state) {
  return {
    listItemName: getSelectedSubEntityId(state),
    fieldItems: getUpdateFieldItems(state),
    initialValues: getInitialValues(state),
    isSaving: isSubEntitySaving(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  UpdateListItemsForm
);
