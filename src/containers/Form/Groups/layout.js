/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * GroupsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function GroupsForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  userHasViewPermission
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <DetailWrapper open data-automation="groupsDetailsSVG">
          <WrappedDetailHeader text="Details" />
          <InputField
            name="name"
            label="Name *"
            id="frm-groups-name"
            data-automation="nameInput"
            componentType="input"
            inputType="text"
            disabled={
              isSaving || inherited || !userHasUpdatePermission || (!userHasUpdatePermission && userHasViewPermission)
            }
          />
          <InputField
            name="description"
            label="Description"
            id="frm-groups-description"
            data-automation="descriptionInput"
            componentType="textarea"
            inputType="text"
            disabled={
              isSaving || inherited || !userHasUpdatePermission || (!userHasUpdatePermission && userHasViewPermission)
            }
          />
        </DetailWrapper>
      </Wrapper>
    </form>
  );
}

GroupsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  userHasViewPermission: PropTypes.bool
};
