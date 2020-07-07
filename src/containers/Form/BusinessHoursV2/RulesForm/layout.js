import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form/immutable';
import { BusinessHoursRuleField } from 'cx-ui-components';
import { generateUUID } from 'serenova-js-utils/uuid';

const BusinessRuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

const RulesFieldArray = ({ fields, addRule, disabled, viewOnly }) => (
  <BusinessRuleContainer>
    {fields.map((ruleName, index, fields) => (
      <Fragment key={index}>
        <BusinessHoursRuleField
          key={index}
          name={ruleName}
          onSave={rule => addRule('rules', index, 1, { ...rule, id: generateUUID() })}
          disabled={disabled}
          viewOnly={viewOnly}
          cancel={() => fields.remove(index)}
          showActions={!fields.get(index).id.includes('new-rule') && !fields.get(index).id.includes('exception-copy')}
          deleteAction={() => fields.remove(index)}
          copyAction={() => {
            const copiedField = fields.get(index);
            fields.push({
              ...copiedField,
              name: `${copiedField.name}(Copy)`,
              id: `exception-copy-${Math.floor(Math.random() * 9999) + 1000}`
            });
          }}
        />
        <br />
      </Fragment>
    ))}
  </BusinessRuleContainer>
);

export default function RulesForm({ disabled, viewOnly, array }) {
  return (
    <form>
      <FieldArray
        name="rules"
        component={RulesFieldArray}
        props={{
          addRule: array.splice,
          disabled: disabled,
          viewOnly
        }}
      />
    </form>
  );
}

RulesFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
  addRule: PropTypes.func,
  disabled: PropTypes.bool,
  viewOnly: PropTypes.bool
};

RulesForm.propTypes = {
  array: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  viewOnly: PropTypes.bool
};
