import React, { Fragment } from 'react';
import styled from 'styled-components';

import SidePanelHeaderContainer from '../SidePanelHeader';
import BusinessHoursV2 from '../../../Form/BusinessHoursV2';
import SidePanelActionsContainer from '../../../../containers/SidePanelActions';

const SidePanelHeader = styled(SidePanelHeaderContainer)`
  width: 75%;
`;

const HeaderContainer = styled.div`
  min-height: 86px;
  padding: 10px 14px 16px;
`;

const SidePanelActions = styled(SidePanelActionsContainer)`
  width: 25%;
  float: right;
`;

const Panel = styled.div`
  padding: 10px 14px;
  width: 30%;
`;

export default function BusinessHoursV2CreateFullPage() {
  return (
    <Fragment>
      <HeaderContainer>
        <SidePanelActions />
        <SidePanelHeader />
      </HeaderContainer>
      <Panel>
        <BusinessHoursV2 />
      </Panel>
    </Fragment>
  );
}
