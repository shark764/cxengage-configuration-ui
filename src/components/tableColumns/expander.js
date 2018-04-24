/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import styled from 'styled-components';
import { CaretIconSVG } from 'cx-ui-components';

const Expander = styled(CaretIconSVG)`
  width: 10px;
  margin-left: 8px;
`;

export default function() {
  return {
    expander: true,
    Expander: ({ isExpanded }) => (
      <div>
        {isExpanded ? (
          <Expander direction="up" strokeColor="#024f7999" />
        ) : (
          <Expander direction="down" strokeColor="#024f7999" />
        )}
      </div>
    )
  };
}
