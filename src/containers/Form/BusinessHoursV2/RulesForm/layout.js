import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form/immutable';
import { BusinessHoursRuleField } from 'cx-ui-components';

const BusinessRuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

const RulesFieldArray = ({ fields, saveRule, disabled, canSaveRule, viewOnly }) => (
  <BusinessRuleContainer>
    {fields.map((ruleName, index, fields) => (
      <Fragment key={index}>
        <BusinessHoursRuleField
          key={index}
          name={ruleName}
          onSave={saveRule}
          saveException={canSaveRule}
          disabled={disabled}
          viewOnly={viewOnly}
          cancel={() => fields.remove(index)}
          showActions={!fields.get(index).id.includes('new-rule') && !fields.get(index).id.includes('exception-copy')}
          actions={{
            Delete: () => fields.remove(index),
            Copy: () => {
              const copiedField = fields.get(index);
              fields.push({
                ...copiedField,
                name: `${copiedField.name}(Copy)`,
                id: `exception-copy-${Math.floor(Math.random() * 9999) + 1000}`
              });
            }
          }}
        />
        <br />
      </Fragment>
    ))}
  </BusinessRuleContainer>
);

export default function RulesForm({ handleSubmit, disabled, viewOnly, submit, valid, dirty }) {
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray
        name="rules"
        component={RulesFieldArray}
        props={{
          saveRule: submit,
          canSaveRule: valid && dirty,
          disabled: disabled,
          viewOnly
        }}
      />
    </form>
  );
}

RulesFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
  saveRule: PropTypes.func,
  canSaveRule: PropTypes.bool,
  disabled: PropTypes.bool,
  viewOnly: PropTypes.bool
};

RulesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  draftFormCanSave: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  viewOnly: PropTypes.bool
};
