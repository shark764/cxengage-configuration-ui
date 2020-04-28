/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

/**
 *
 * BusinessHoursV2UpdateForm
 *
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DetailHeader, BusinessHoursRule } from 'cx-ui-components';
import DetailWrapper from '../../../../components/DetailWrapper';
import { FieldArray } from 'redux-form';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 55px;
  color: #2e9afe;
`;

const BusinessRuleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const RowWrapper = styled.div`
  width: 100%;
`;

export default function BusinessHoursV2UpdateForm({ key, handleSubmit, rules }) {
  const businessRulesList = () => (
    <BusinessRuleContainer>
      {rules.map((rule, index) => (
        <Fragment key={index.toString()}>
          <BusinessHoursRule rule={rule} key={index.toString()} onChange={() => {}} viewOnly disabled />
          <br />
        </Fragment>
      ))}
    </BusinessRuleContainer>
  );
  return (
    <form onSubmit={handleSubmit} key={key}>
      <WrapperDiv>
        <RowWrapper>
          <DetailWrapper customCaretIcon="margin-top: 6px;display: inline-block;margin-left: 23px;" open>
            <WrappedDetailHeader
              customLineSpacer="border-top: 1px solid #2E9AFE; flex-grow: 1; margin: 10px 10px 0;align-self: center;"
              fontSize="20px"
              text="Hours"
            />
            <div style={{ marginLeft: '60px' }}>
              <label>Hours and Exceptions</label>
              <br />
              <br />
              <FieldArray name="businessRules" component={businessRulesList} />
            </div>
          </DetailWrapper>
        </RowWrapper>
      </WrapperDiv>
    </form>
  );
}

BusinessHoursV2UpdateForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  rules: PropTypes.array
};
