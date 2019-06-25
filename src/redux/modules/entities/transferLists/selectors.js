import { createSelector } from 'reselect';
import { List, Map, fromJS } from 'immutable';
import { generateUUID } from 'serenova-js-utils/uuid';
import {
  getEntityData,
  getSelectedEntityId,
  getSelectedEntity,
  getSelectedSubEntityId
} from '../../entities/selectors';
import {
  getCurrentFormValueByFieldName,
  getCurrentSubFormValueByFieldName,
  getCurrentSubmittingFormProps,
  getCurrentSubmittingFormValues
} from '../../form/selectors';

// TransferList form selectors:

export const transferListsFormInitialValues = state => {
  if (getSelectedEntityId(state) !== 'create') {
    return Map({
      name: getSelectedEntity(state).get('name'),
      description: getSelectedEntity(state).get('description')
    });
  } else {
    return Map({ active: true });
  }
};

export const currentFormEndpoints = state => getCurrentFormValueByFieldName(state, 'endpoints');

export const isUserCreatingNewCategory = state =>
  getCurrentSubFormValueByFieldName(state, `transferListItems:${getSelectedSubEntityId(state)}`, 'newCategory');

export const selectedContactType = state =>
  getCurrentSubFormValueByFieldName(state, `transferListItems:${getSelectedSubEntityId(state)}`, 'contactType');

export const hierarchyInputText = state =>
  getCurrentSubFormValueByFieldName(state, `transferListItems:${getSelectedSubEntityId(state)}`, 'hierarchy');

export const endpointFieldValue = state => {
  let endpointValue = getCurrentSubFormValueByFieldName(
    state,
    `transferListItems:${getSelectedSubEntityId(state)}`,
    'endpoint'
  );
  if (endpointValue) {
    endpointValue = endpointValue.trim();
  }
  return endpointValue;
};

// Currently submitting sub-entity form values:

export const currentSubFormEndpointFieldValue = createSelector(
  getCurrentSubmittingFormProps,
  props => props.values.get('endpoint') && props.values.get('endpoint').trim()
);

// Gets QueueNames & Id selectors:

export const queuesData = state => getEntityData(state, 'queues');

export const selectActiveQueueNames = createSelector(queuesData, queues =>
  queues
    .filter(queue => queue.get('active') === true)
    .map(activeQueue => activeQueue.get('name'))
    .toJS()
);

export const selectActiveQueueId = createSelector(
  [queuesData, currentSubFormEndpointFieldValue, selectedContactType],
  (queues, endpointValue, contactType) => {
    let queueId;
    if (contactType === 'queue') {
      queueId = queues.find(queue => queue.get('name') === endpointValue).get('id');
    }
    return queueId;
  }
);

// While creating a transferListItem, user should have an option to select one of the exisiting categories:
export const selectExistingCategories = createSelector(
  [currentFormEndpoints],
  endpoints =>
    endpoints &&
    endpoints.reduce((hierarchyNames, currentEndpoint) => {
      const categoryExists = hierarchyNames.find(hierarchy => hierarchy === currentEndpoint.get('hierarchy'));
      if (!categoryExists) {
        hierarchyNames.push(currentEndpoint.get('hierarchy'));
        return hierarchyNames;
      }
      return hierarchyNames;
    }, [])
);

// While updating a transferListItem, the subEntityForm should be pre-populated with it's field values:
export const getSelectedTransferListItemValues = createSelector(
  [currentFormEndpoints, queuesData, getSelectedSubEntityId],
  (endpoints, queues, subEntityId) => {
    // while updating cateoryheader, just return hierarchy title:
    if (subEntityId.includes('updateCategoryHeader')) {
      const a = endpoints.find(endpoint => `updateCategoryHeader:${endpoint.get('categoryUUID')}` === subEntityId);
      return fromJS({ hierarchy: a.get('hierarchy') });
    } else if (subEntityId.includes('updateTransferListItem')) {
      // While updating transfer list item, return the selected transfer list item values:
      let endpoint = endpoints.find(
        endpoint => `updateTransferListItem:${endpoint.get('endpointUUID')}` === subEntityId
      );
      // converts queueId to queueName:
      if (endpoint && endpoint.get('contactType') === 'queue') {
        const queue = queues.find(queue => queue.get('id') === endpoint.get('endpoint'));
        const queueName = queue && queue.get('name');
        endpoint = endpoint.set('endpoint', queueName);
      }
      return endpoint;
    }
  }
);

// TransferList Item Create Selectors:

// When creating a new transferList, transferListItems should contain UUID's for the drag and drop component to work or else the UI breaks:
export const selectEndpointUUIDS = createSelector(getCurrentSubmittingFormValues, values =>
  values
    .set('draggableUUID', generateUUID())
    .set('endpointUUID', generateUUID())
    .set('categoryUUID', generateUUID())
    .set('droppableUUID', generateUUID())
    .delete('newCategory')
);

// Adds transferListItems to the current form values based on the hierarchy:
export const transferListItemCreateValues = createSelector(
  [selectEndpointUUIDS, currentFormEndpoints, selectActiveQueueId],
  (values, existingEndpoints, queueId) => {
    // converts queueName to queueId
    values = values.get('contactType') === 'queue' ? values.set('endpoint', queueId) : values;
    if (existingEndpoints !== undefined) {
      const hierarchyExists = existingEndpoints.find(endpoint => endpoint.get('hierarchy') === values.get('hierarchy'));
      if (!hierarchyExists) {
        // If a transferListItem is being created under new hierarchy:
        const updatedValues = existingEndpoints.push(values);
        return updatedValues;
      } else {
        // If a transferListItem is being created under an existing hierarchy:
        const updatedValues = existingEndpoints.push(
          values
            .set('categoryUUID', hierarchyExists.get('categoryUUID'))
            .set('droppableUUID', hierarchyExists.get('droppableUUID'))
        );
        return updatedValues;
      }
    } else {
      // If there are no existing transferListItems in the transferList:
      const updatedValues = fromJS([values]);
      return updatedValues;
    }
  }
);

// TransferList Item update Selector:
export const transferListItemUpdateValues = createSelector(
  [getSelectedSubEntityId, currentFormEndpoints, getCurrentSubmittingFormProps, selectActiveQueueId],
  (selectedSubEntityId, existingEndpoints, props, queueId) => {
    // coverts queueName to queueId:
    props.values = props.values.get('contactType') === 'queue' ? props.values.set('endpoint', queueId) : props.values;
    // updates hierarchy title:
    if (selectedSubEntityId.includes('updateCategoryHeader')) {
      const updatedEndpoints = existingEndpoints.map(
        endpoint =>
          endpoint.get('hierarchy') === props.initialValues.get('hierarchy')
            ? endpoint.set('hierarchy', props.values.get('hierarchy'))
            : endpoint
      );
      return updatedEndpoints;
    } else if (!selectedSubEntityId.includes('updateCategoryHeader')) {
      // updates trasnferListItem:
      const updatedEndpoints = existingEndpoints.map(
        endpoint => (endpoint.get('endpointUUID') === props.values.get('endpointUUID') ? props.values : endpoint)
      );
      return updatedEndpoints;
    }
  }
);

// Groups transferListItems based on the category they belong to:
export const selectEndpointHeaders = createSelector(currentFormEndpoints, endpoints => {
  if (endpoints && endpoints.size > 0) {
    // Finds the first transferListItem in each category, so that rest of the items can be grouped under them:
    return endpoints.reduce((accumlator, currentVal) => {
      const hierarchyExists = accumlator.find(val => val.get('hierarchy') === currentVal.get('hierarchy'));
      if (!hierarchyExists) {
        return accumlator.push(
          fromJS({
            name: currentVal.get('name'),
            hierarchy: currentVal.get('hierarchy'),
            categoryUUID: currentVal.get('categoryUUID'),
            droppableUUID: currentVal.get('droppableUUID')
          })
        );
      }
      return accumlator;
    }, List());
  }
});
