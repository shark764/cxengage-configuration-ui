import React, { Component } from 'react';
import styled from 'styled-components';
import { Toggle } from 'cx-ui-components';
import { PageHeader } from 'cx-ui-components';
import { sdkCall } from '../../utils/sdk';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';

const Wrapper = styled.div`
  padding: 20px;
`;
const Explanation = styled.div`
  background: #ffff0024;
  padding: 50px;
  margin: 0 10% 0px 10%;
  display: inline-block;
  width: 80%;
  line-height: 19pt;
  border-radius: 5px;
  border: 1px solid #8080803b;
`;
const Features = styled.div`
  margin: 0 10% 0px 10%;
  display: inline-block;
  width: 80%;
`;
const Feature = styled.div`
  padding: 20px 50px;
  border-radius: 5px;
  :hover {
    background: #5757570f;
    cursor: pointer;
  }
`;
const ToggleWrapper = styled(Toggle)`
  float: right;
`;
const Mail = styled.a`
  font-size: 13pt;
  text-align: center;
  display: block;
  margin-top: 10px;
`;

const getinitialStateFromLocalStorage = () => {
  let initState = {};
  Object.keys(entitiesMetaData).forEach(entity => {
    initState[entity] = JSON.parse(localStorage.getItem(entity));
  });
  return initState;
};

export default class BetaFeatures extends Component {
  constructor() {
    super();
    this.state = getinitialStateFromLocalStorage();
  }

  saveInLocalStorage = (e, feature) => {
    localStorage.setItem(feature, `${!this.state[feature]}`);
    sdkCall({ module: 'setLocalStorage', data: { key: feature, value: !this.state[feature] } });
  };

  render() {
    return (
      <Wrapper>
        <PageHeader text="Beta Features" helpLink="help link" />
        <Explanation>
          The below Beta features and improvements are in their final stages of testing before official release (“Beta
          Features”). The Beta Features are made accessible only for the purpose of allowing customers to try the Beta
          Features and provide feedback. Feedback on usability, bugs, general styling or anything else is much
          appreciated and can be sent in via ______. Notwithstanding any terms to the contrary in our agreement
          regarding provision of CxEngage, the Beta Features are not ready for general commercial release and may
          contain bugs, errors, or defects. The Beta Features are made accessible to you “As Is” and “As Available.” No
          representations or warranties of any kind, whether express, implied, statutory or otherwise are made regarding
          the Beta Features.
        </Explanation>
        <Features>
          {Object.keys(entitiesMetaData).map(
            entityName =>
              this.props[entityName] &&
              entitiesMetaData[entityName].betaFeature && (
                <Feature key={entityName} onClick={() => this.saveInLocalStorage(event, entityName)}>
                  <span>{entitiesMetaData[entityName].pageTitle}</span>
                  <ToggleWrapper
                    onChange={() => this.saveInLocalStorage(event, entityName)}
                    value={this.state[entityName]}
                  />
                </Feature>
              )
          )}
        </Features>
      </Wrapper>
    );
  }
}
