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
}

export default class BetaFeatures extends Component {
  constructor() {
    super();
    this.state = getinitialStateFromLocalStorage();
  }

  saveInLocalStorage = (e, feature) => {
    localStorage.setItem(feature, `${!this.state[feature]}`);
    sdkCall({ module: 'setLocalStorage', data: {key: feature, value: !this.state[feature]} });
  }

  render() {
    return (
      <Wrapper>
        <PageHeader
          text="Beta Features"
          helpLink="help link"
        >
        </PageHeader>
        <Explanation>The below features and improvments are in their final stages of testing before official release. Serenova does not give any warranties, whether expressed or implied, as to the suitability or usability of said features in Beta access but as a means for customers to try the new features and overall enhancments and provide feedback on the product. Feeback on usability, bugs, general styling or anything else are much appreciated and can be sent in via <Mail href="mailto:feedback@serenova.com">feedback@serenova.com</Mail></Explanation>
        <Features>
          {Object.keys(entitiesMetaData).map(entityName => 
            this.props[entityName] &&
            entitiesMetaData[entityName].betaFeature && (
            <Feature key={entityName} onClick={() => this.saveInLocalStorage(event, entityName)} >
                <span>{entitiesMetaData[entityName].pageTitle}</span> 
                <ToggleWrapper onChange={() => this.saveInLocalStorage(event, entityName)} value={this.state[entityName]}/>
            </Feature>
          ))}
        </Features>

      </Wrapper>

    );
  }
}
