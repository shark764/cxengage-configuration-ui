/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * EmailTemplatesDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Detail } from 'cx-ui-components';
import { DetailHeader } from 'cx-ui-components';
import { SidePanelTable } from 'cx-ui-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function EmailTemplatesDetailsPanel(props) {
  return (
    <Wrapper id={props.id} className={props.className}>
      <DetailHeader text="Details" />
      {props.userHasUpdatePermission ? (
        <Fragment>
          {props.children}
          {props.emailFormValue === 'custom' ? (
            <Fragment>
              <DetailHeader text="Available Variables" />
              <SidePanelTable
                items={props.variables}
                fields={[
                  { name: 'name', label: 'Name' },
                  { name: 'description', label: 'Description' }
                ]}
                pagination={false}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Detail label="Subject" value={props.inheritedSubject} />
              <Detail label="Body" value={props.inheritedBody} />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Detail label="Email" value={props.templateEmail} />
          <Detail label="Shared" value={props.templateShared} />
          <Detail label="Subject" value={props.templateSubject} />
          <Detail label="Body" value={props.templateBody} />
        </Fragment>
      )}
    </Wrapper>
  );
}

EmailTemplatesDetailsPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.node.isRequired,
  emailFormValue: PropTypes.string,
  variables: PropTypes.array.isRequired,
  inheritedSubject: PropTypes.string,
  inheritedBody: PropTypes.string,
  templateEmail: PropTypes.string,
  templateShared: PropTypes.string,
  templateSubject: PropTypes.string,
  templateBody: PropTypes.string
};
