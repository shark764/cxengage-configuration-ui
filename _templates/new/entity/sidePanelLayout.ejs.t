---
to: src/containers/SidePanelDetails/<%= name %>/layout.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * <%= name %>DetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Detail } from 'cx-ui-components';
import { DetailHeader } from 'cx-ui-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export default function <%= name %>DetailsPanel({
  children,
  userHasUpdatePermission,
  item: {
    name,
    description,
    type
  }
}) {
  return (
    <Wrapper className="dtpanel-entity-<%= name %>">
      {userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          <Detail label="Description" value={description} />
          <Detail label="Type" value={type} />
        </Fragment>
      )}
    </Wrapper>
  );
}

<%= name %>DetailsPanel.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any
};
