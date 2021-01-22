import { isEmpty } from 'serenova-js-utils/strings';

import store from '../../../../redux/store';
import { selectCapacityRuleVersions } from '../../../../redux/modules/entities/capacityRules/selectors';

export const formValidation = (values, { intl: { formatMessage } }) => {
  const ruleMessages = values
    .getIn(['rule', 'groups'])
    .map((group) => {
      const interactions = Number(group.get('interactions'));
      const message =
        ((!group.get('channels') || !group.get('channels').size || !group.getIn(['channels', 0])) &&
          formatMessage({
            id: 'capacityRules.versions.rule.noEmptyGroups',
            defaultMessage: 'A group cannot be empty, please add a channel or remove the group',
          })) ||
        ((interactions <= 0 || !Number.isInteger(interactions)) &&
          formatMessage({
            id: 'capacityRules.versions.rule.noNumber',
            defaultMessage: 'Please provide a valid integer number for the interactions field',
          }));
      return (
        message && {
          message,
          isInteractionsNumberInvalid: group.get('interactions') === '' || isNaN(group.get('interactions')),
        }
      );
    })
    .toJS();

  return {
    name:
      (isEmpty(values.get('name')) &&
        formatMessage({
          id: 'identityProviders.details.name.error',
          defaultMessage: 'Please enter a name...',
        })) ||
      (selectCapacityRuleVersions(store.getState()).some(({ name }) => name === values.get('name')) &&
        formatMessage({
          id: 'capacityRules.versions.name.duplicateError',
          defaultMessage: "Two versions on a Capacity Rule can't have the same name",
        })),
    rule:
      (!values.getIn(['rule', 'voice']) &&
        (!values.getIn(['rule', 'groups']) || values.getIn(['rule', 'groups']).size <= 0) && [
          {
            message: formatMessage({
              id: 'capacityRules.versions.rule.noEmpty',
              defaultMessage: 'A rule should no be empty',
            }),
          },
        ]) ||
      (ruleMessages.some((message) => message) && ruleMessages),
  };
};
