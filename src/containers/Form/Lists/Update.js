/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListsForm } from 'cx-ui-components';
import { onFormSubmit } from '../../../redux/modules/crudEndpoint';
import validate from '../ListItems/validation';
import {
  getSelectedEntityId,
  getSelectedEntity,
  isInherited
} from '../../../redux/modules/crudEndpoint/selectors';

let UpdateListForm = compose(
  connect(state => ({ form: `lists:${getSelectedEntityId(state)}` })),
  reduxForm({
    onSubmit: (values, dispatch, props) =>
      dispatch(onFormSubmit(values, props)),
    validate,
    destroyOnUnmount: false
  })
)(ListsForm);

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);
  if (selectedEntity) {
    return {
      update: true,
      initialValues: new Map({
        name: selectedEntity.get('name')
      }),
      listType: selectedEntity.getIn(['listType', 'name']),
      isSaving: selectedEntity.get('updating') === true,
      inherited: isInherited(state),
      fieldItems: [
        {
          name: 'name',
          label: 'Name',
          type: 'input',
          required: true,
          isSaving: selectedEntity.get('updating') === true,
          inherited: isInherited(state)
        }
      ]
    };
  }
  return {};
}

export default connect(mapStateToProps)(UpdateListForm);
