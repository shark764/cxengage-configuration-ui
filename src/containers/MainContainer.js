import React,{Component} from 'react';
import Radium from 'radium';

import {MuteIconSVG, HangUpIconSVG, OnPstnCallSVG} from 'cx-ui-components';
// import { HangUpIconSVG } from 'cx-ui-components';

// import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
// import 'rxjs/add/observable/interval';

import { makeFakeInteraction } from './testInteractions.js';


import ReactTable from "react-table";
import './style.css';

const styles = {
    base: {
      // paddingTop: '50px'
    },
    bottomBar: {
      position: 'fixed',
      bottom: '0px'
    },
    h2: {
      fontFamily: 'Arial',
      fontSize: '21px',
      color: '#474747',
      fontWeight: 'bold',
    }
}

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      tokenInfo: {},
      preferences: {},
      data: [],
      sorted: [],
      page: 0,
      pageSize: 10,
      expanded: {},
      resized: [],
      filtered: [],
      twilioEnabled: false,
      silentMonitoring: {}
    };
  }

  componentDidMount() {
    
    
    window.addEventListener('message',(event) => {
      console.warn('Iframe received response:  ',event.data);


      if(event.data.type === 'webpackOk') {
        return;
      } else if(event.data.module === 'getState') {
        this.setState({
          tokenInfo: event.data.token.split('"')[3],
          prefrence: event.data.prefrence,
          sdkState: event.data.sdkState
        })
      } else if(event.data.subscription !== undefined) {
        // update state based on what we recieve from iframe
        if(event.data.err) {console.error(event.data.err)};
        switch(event.data.subscription.topic) {
          case 'cxengage/twilio/device-ready':
          if(!this.state.twilioEnabled){
            this.setState({ twilioEnabled: true});
            if(this.silentMonitoring.status === 'startingTwilio'){
              window.parent.postMessage({module: 'interactions.voice', command: 'silentMonitor', data: { interactionId: this.state.silentMonitoring.interactionId }},'http://localhost:3001');
              this.setState(Object.assign(this.state.silentMonitoring, { status: 'connectingToInteraction'}));
            }
          }
          
              break;
          // case n:
          //     code block
          //     break;
          // default:
          //     code block
      }
      } else if(event.data.module === 'monitorCall') {
          this.setState({silentMonitoring: event.data.data});
         } else if (event.data.module === 'angularIsReady') {
        
          window.parent.postMessage({module: 'subscribe', command: 'cxengage/twilio/device-ready'},'http://localhost:3001');
        // CxEngage.subscribe('cxengage/twilio/device-ready', function(error, topic) {
        //   if (!error) {
        //     if (!$rootScope.twilioEnabled) {
        //       $rootScope.twilioEnabled = true;
        //       if ($rootScope.silentMonitoring && $rootScope.silentMonitoring.status === 'startingTwilio') {
        //         CxEngage.interactions.voice.silentMonitor({ interactionId: $rootScope.silentMonitoring.interactionId });
        //         $rootScope.silentMonitoring.status = 'connectingToInteraction';
        //         $rootScope.$digest();
        //       }
        //     }
        //   } else {
        //     console.error(topic, error);
        //   }
        // });

        // CxEngage.subscribe('cxengage/session/state-change-request-acknowledged', function (error, topic, response) {
        //   if (!error) {
        //     if (response.state === 'notready') {
        //       if ($rootScope.silentMonitoring) {
        //         var defaultExtension = CxEngage.session.getDefaultExtension();
        //         if (defaultExtension.type === 'webrtc' && defaultExtension.provider === 'twilio' && !$rootScope.twilioEnabled) {
        //           $rootScope.silentMonitoring.status = 'startingTwilio';
        //           $rootScope.$digest();
        //         } else {
        //           CxEngage.interactions.voice.silentMonitor({ interactionId: $rootScope.silentMonitoring.interactionId });
        //           $rootScope.silentMonitoring.status = 'connectingToInteraction';
        //           $rootScope.$digest();
        //         }
        //       } else {
        //         console.warn('State set to not ready, but there is no silent monitoring in progress');
        //       }
        //     }
        //   } else {
        //     console.error(topic, error);
        //   }
        // });

        // CxEngage.subscribe('cxengage/interactions/voice/silent-monitor-start', function (error, topic) {
        //   if (!error) {
        //     $rootScope.silentMonitoring.status = 'connected';
        //     $rootScope.$digest();
        //   } else {
        //     console.error(topic, error);
        //   }
        // });

        // CxEngage.subscribe('cxengage/interactions/voice/resource-unmute-received', function (error, topic) {
        //   console.log('~~!!~~', topic);
        //   if (!error) {
        //     $rootScope.silentMonitoring.muted = false;
        //     $rootScope.$digest();
        //   } else {
        //     console.error(topic, error);
        //   }
        // });

        // CxEngage.subscribe('cxengage/interactions/voice/resource-mute-received', function (error, topic) {
        //   console.log('~~!!~~', topic);
        //   if (!error) {
        //     $rootScope.silentMonitoring.muted = true;
        //     $rootScope.$digest();
        //   } else {
        //     console.error(topic, error);
        //   }
        // });

        // CxEngage.subscribe('cxengage/interactions/voice/silent-monitor-end', function (error, topic) {
        //   if (!error) {
        //     CxEngage.authentication.logout();
        //     $rootScope.silentMonitoring.status = 'endingSession';
        //     $rootScope.$digest();
        //   } else {
        //     console.error(topic, error);
        //   }
        // });

        // CxEngage.subscribe('cxengage/session/sqs-shut-down', function (error, topic) {
        //   if (!error) {
        //     delete $rootScope.silentMonitoring;
        //     $rootScope.$digest();
        //   } else {
        //     console.error(topic, error);
        //   }
        // });
      }


    },false);
    
    window.parent.postMessage({module: 'getState', command: '', data: {}},'http://localhost:3001');
  
    setInterval(()=>{
      let fakeInteractionArray = this.state.data;
      fakeInteractionArray.push(makeFakeInteraction());
      this.setState({data: fakeInteractionArray});

      // TODO: going to move the api calls into SDK
        // if(this.state.tokenInfo !== undefiend){Observable.ajax({
        //   method:'POST',
        //   body: {"requests":{"tableWidget1":{"statistic":"interactions-in-conversation-list"}}}, 
        //   crossDomain: true, url: 'https://dev-api.cxengagelabs.net/v1/tenants/fd172219-c5ee-45ab-9c18-31b9e8c59920/realtime-statistics/batch',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Token ${this.state.tokenInfo}`
        //     // 'Authorization': `Token ${CxEngage.dumpState().authentication.token}`
        //   },
        // }).subscribe(data => { 
        //   this.setState({data: data.response.results.tableWidget1.body.results.interactions})
        // } ,err => { console.log(err)});}


    },1000);
  }
  hangUp = () => {
    console.log('Clicked HangUp');
    if(this.state.silentMonitoring !== undefined) {
      console.log(this.state);
      window.parent.postMessage({module: 'interactions.voice', command: 'resourceRemove', data: { interactionId: this.state.silentMonitoring.interactionId, targetResourceId: '96cd5320-8001-11e6-98e4-ca81484488df' }},'http://localhost:3001');
    }
  }
  mute() {
    window.parent.postMessage({module: 'interactions.voice', command: 'resourceMute', data: { interactionId: this.state.silentMonitoring.interactionId, targetResourceId: '96cd5320-8001-11e6-98e4-ca81484488df' }},'http://localhost:3001');
  }

  render() {
    const { data } = this.state;
    // console.log(this.state.filtered)


    return (
      <div>


    {
      window.location.hash.indexOf('silentMonitoringTable') > -1 &&
      <div style={styles.base}>
        <h2 style={styles.h2}>Interaction Monitoring</h2>
        <ReactTable 
          defaultPageSize={20} 
          className="-striped -highlight" data={data} 
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]).toLowerCase().indexOf(filter.value.toLowerCase()) > -1}
          filtered={this.state.filtered}
          onFilteredChange={filtered => this.setState({ filtered })}
          columns={[
            {Header: "Interaction Id", id: "interactionId", accessor: "interactionId"},
            {Header: "Agent",id: "agentName", accessor: d => d.agents[0].agentName},
            {Header: "Customer Id", id: "customer",accessor: "customer"},
            {Header: "Contact Point", id: "contactPoint" ,accessor: "contactPoint"},
            {Header: "Flow", id: "flowName", accessor: "flowName"},
            {Header: "Direction", id: "direction",accessor: "direction",
            filterMethod: (filter, row) => {
              if (filter.value === "any") {
                return true;
              }
              if (filter.value === "inbound") {
                return row[filter.id] === "inbound";
              }
              if (filter.value === "outbound") {
                return row[filter.id] === "outbound";
              }
            },
            Filter: ({ filter, onChange }) =>
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "any"}
              >
                <option value="any">Any</option>
                <option value="inbound">Inbound</option>
                <option value="outbound">Outbound</option>
              </select>},
            {Header: "Start Time", accessor: "startTimestamp"},
            {Header: "Elapsed Time", accessor: "currentStateDuration",
            filterMethod: (filter, row) => {
              // if (filter.value === "any") {
              //   return true;
              // }
              // if (filter.value === "inbound") {
              //   return row[filter.id] === "inbound";
              // }
              // if (filter.value === "outbound") {
              //   return row[filter.id] === "outbound";
              // }
            },
            Filter: ({ filter, onChange }) => 
            <div style={{display:'flex'}}>
              <select onChange={event => onChange(event.target.value + 'skjdhshfkdhdjf')} style={{width:'45px'}} value={filter ? filter.value : "greaterThan"}>
                <option value="greaterThan"> + </option>
                <option value="lessThan"> - </option>
              </select>
              <input value="0" style={{width:'30px'}} />
              <select onChange={event => onChange(event.target.value)} style={{width:'63px'}} value={filter ? filter.value : "minutes"}>
                <option value="minutes"> min </option>
                <option value="seconds"> sec </option>
              </select>
            </div>
            },
            {Header: "Actions", accessor: "blablabla"},
        ]} />
      </div>
    }


    {
      window.location.hash.indexOf('silentMonitoringToolbar') > -1 &&

      <div style={styles.bottomBar}>
        {/* <MuteIconSVG onClick={this.hangUp} width="40px" style={{display: 'inline-block', width: '40px'}}/> */}
        <HangUpIconSVG onClick={this.hangUp} width="40px" style={{display: 'inline-block', width: '40px'}}/>
        {/* <OnPstnCallSVG onClick={this.hangUp} width="40px" style={{display: 'inline-block', width: '40px'}}/> */}
      </div>
    }



      </div>
    );
  }
}

export default Radium(MainContainer);