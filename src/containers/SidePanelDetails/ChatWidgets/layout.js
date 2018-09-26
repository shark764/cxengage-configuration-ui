/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ChatWidgetsDetailsPanel
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

export default function ChatWidgetsDetailsPanel({
  children,
  userHasUpdatePermission,
  id,
  className,
  item: { name, description }
}) {
  return (
    <Wrapper id={id} className={className}>
      <DetailHeader text="Details" />
      {userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          
        </Fragment>
      )}
    </Wrapper>
  );
}

ChatWidgetsDetailsPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  item: PropTypes.shape({
    name: PropTypes.string,
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any
};
