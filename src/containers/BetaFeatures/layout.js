import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Toggle, PageHeader, Button } from 'cx-ui-components';
import { sdkCall } from '../../utils/sdk';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { updateBetaFeatures, readBetaFeatures } from '../../utils/apiCall';

const Wrapper = styled.div`
  padding: 20px;
`;
const Features = styled.div`
  margin: 67px 5% 0px 10%;
  display: inline-block;
  width: 35%;
  border: 1px solid #80808047;
  border-radius: 10px;
`;
const FeaturesTitle = styled.div`
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  ${(props) => `background: ${props.background || '#161e5d'};`} margin-top: -1px;
  border-radius: 10px 10px 0px 0px;
  ${(props) => `color: ${props.accent || '#bebfc4'};`};
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

const Feedback = styled.div`
  display: inline-block;
  position: absolute;
  width: 40%;
`;

const Actions = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: center;
`;

const ActionButton = styled(Button)`
  margin: 20px 0 0 10px;
`;

const Submit = styled(Button)`
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default class BetaFeatures extends Component {
  constructor() {
    super();
    const features = {
      tenants: false,
      integrations: false,
      identityProviders: false,
    };
    const pageTitles = {};
    Object.keys(features).forEach((entityName) => {
      pageTitles[entityName] = entitiesMetaData[entityName].pageTitle;
    });
    this.state = { features, pageTitles };
  }
  componentDidMount() {
    readBetaFeatures().then((r) => {
      // remove previous beta features
      const features = this.state.features;
      Object.keys(r.result).forEach((feature) => {
        if (features[feature] === undefined) {
          delete features[feature];
        } else {
          features[feature] = r.result[feature];
        }
      });
      this.setState({ features });
    });
  }

  saveBetaFeaturePrefs = (features) => this.setState({ features });

  saveBetaFeaturePrefsAll = () => {
    const features = this.state.features;

    updateBetaFeatures(features).then(() => {
      this.setState({ features });
      sdkCall({ module: 'setBetaFeatures', data: features });
    });
  };

  toggleAll = (enableAll = true) => {
    const features = Object.keys(this.state.features).reduce((previous, current) => {
      if (this.props.disabledFeatures[current] !== true) {
        previous[current] = enableAll;
      }
      return previous;
    }, this.state.features || {});

    this.setState({ features });
  };

  render() {
    return (
      <Wrapper>
        <PageHeader text="Early Access Features" helpLink="help link" />
        <Features>
          <FeaturesTitle background={this.props.theme.navbar} accent={this.props.theme.navbarText}>
            Early Access Features
          </FeaturesTitle>
          <Actions>
            <ActionButton buttonType="secondary" onClick={() => this.toggleAll(true)}>
              Enable All
            </ActionButton>
            <ActionButton buttonType="secondary" onClick={() => this.toggleAll(false)}>
              Disable All
            </ActionButton>
          </Actions>
          {Object.keys(this.state.features)
            .filter((entityName) => {
              return this.props.disabledFeatures[entityName] !== true;
            })
            .map((entityName) => (
              <Feature key={entityName}>
                <span>{this.state.pageTitles[entityName]}</span>
                <ToggleWrapper
                  onChange={() => {
                    const features = {
                      ...this.state.features,
                      [entityName]: !this.state.features[entityName],
                    };
                    this.saveBetaFeaturePrefs(features);
                  }}
                  value={this.state.features[entityName]}
                  disabled={this.props.disabledFeatures[entityName]}
                />
              </Feature>
            ))}
          <Submit buttonType="primary" onClick={this.saveBetaFeaturePrefsAll}>
            Apply Changes
          </Submit>
        </Features>
        <Feedback data-pp-cfpw-widget="e9b5dd7a-0329-11e9-811a-0abbec7104a5" data-env="prod" data-static="false" />
        {(function(d, id) {
          var js,
            h = d.getElementsByTagName('head')[0];
          if (d.getElementById(id)) return;
          js = d.createElement('script');
          js.id = id;
          js.src = 'https://widget.prodpad.com/customer_feedback_portal_app/portal_widget/sdk.js';
          h.appendChild(js);
        })(document, 'prodpad-cfpwjs')}
      </Wrapper>
    );
  }
}

BetaFeatures.propTypes = {
  entities: PropTypes.object,
  theme: PropTypes.any,
  disabledFeatures: PropTypes.object,
};
