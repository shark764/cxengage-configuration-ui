import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { Toast } from 'cx-ui-components';
import { camelCaseToRegularFormAndRemoveLastLetter, camelCaseToKebabCase } from 'serenova-js-utils/strings';

import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity } from '../selectors';
import { selectCapacityRuleVersions } from './selectors';
import { jsRuletoEdn } from './ednHelpers';
import { entitiesMetaData } from '../metaData';

export const FetchVersions = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .filter(
      ({ entityId }) => getCurrentEntity(store.getState()) === 'capacityRules' && entityId && entityId !== 'create'
    )
    .switchMap(({ entityId, ...a }) =>
      fromPromise(
        sdkPromise({
          crudAction: 'read',
          path: ['capacity-rules', entityId, 'versions'],
          command: 'getCapacityRuleVersions',
          module: 'entities',
          topic: 'cxengage/entities/read-capacity-rule-versions',
        })
      )
        .map((response) => handleSuccess(response, { ...a, type: 'FETCH_CAPACITY_RULE_VERSIONS', entityId }))
        .catch(() => {
          Toast.error("Couldn't fetch Capacity Rules versions");
          // I don't want to do anything if an error occurs just to warn the user with a message
          // but I always have to return something from epics :(
          return of({
            type: 'IGNORED_ACTION',
          });
        })
    );

export const UpdateCapacityRule = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'capacityRules')
    .map((a) => {
      const { name, activeVersion } = a.values;
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.data = {
        name,
        ...(activeVersion && { activeVersion }),
      };
      a.sdkCall.path = [camelCaseToKebabCase(a.entityName), a.entityId];

      return a;
    })
    .switchMap((a) =>
      fromPromise(sdkPromise(a.sdkCall))
        .map((response) =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was updated successfully!`
          )
        )
        .catch((error) => handleError(error, a))
    );

export const CreateSubEntity = (action$, store) =>
  action$
    .ofType('CREATE_SUB_ENTITY')
    .map((a) => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
    }))
    .filter(({ entityName }) => entityName === 'capacityRules')
    .map((a) => {
      a.sdkCall = entitiesMetaData['capacityRules'].entityApiRequest('create', 'subEntity');
      a.sdkCall.path = ['capacity-rules', a.entityId, 'versions'];
      const { name, quantifier, rule, rules } = a.values;
      const ruleSet = jsRuletoEdn(rule);
      const filteredRules = rules.filter((rule) => rule.max > 0);
      a.sdkCall.data = {
        name,
        quantifier,
        ...(quantifier !== 'percentage' ? { ruleSet } : { rules: filteredRules }),
      };
      return { ...a };
    })
    .switchMap((a) =>
      fromPromise(sdkPromise(a.sdkCall))
        .mergeMap((response) => [
          handleSuccess(
            { result: { itemValue: { ...response.result, id: response.result.version } } },
            a,
            `<i>Version</i> was created successfully!`
          ),
          // Setting activeversion if capacity rule has no versions
          ...(!selectCapacityRuleVersions(store.getState()).length
            ? [
                {
                  type: 'UPDATE_ENTITY',
                  entityName: 'capacityRules',
                  entityId: a.entityId,
                  values: {
                    name: getSelectedEntity(store.getState()).get('name'),
                    activeVersion: response.result.version,
                    id: a.entityId,
                  },
                },
              ]
            : []),
        ])
        .catch((error) => handleError(error, a))
    );
