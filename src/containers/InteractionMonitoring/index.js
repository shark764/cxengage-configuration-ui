import React, { Component } from 'react';
import styled from 'styled-components';

// import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
// import 'rxjs/add/observable/interval';

// import { makeFakeInteraction } from './testInteractions.js';


import ReactTable from "react-table";
import './style.css';

const Title = styled.h2`
  font-size: 21px;
  font-family: Arial;
  font-weight: bold;
  color: #474747;
`;

class InteractionMonitoring extends Component {
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
    };
  }

  componentDidMount() {
    // setInterval(()=>{
    //   let fakeInteractionArray = this.state.data;
    //   fakeInteractionArray.push(makeFakeInteraction());
    //   this.setState({data: fakeInteractionArray});
    //
    //   // TODO: going to move the api calls into SDK
    //     // if(this.state.tokenInfo !== undefiend){Observable.ajax({
    //     //   method:'POST',
    //     //   body: {"requests":{"tableWidget1":{"statistic":"interactions-in-conversation-list"}}},
    //     //   crossDomain: true, url: 'https://dev-api.cxengagelabs.net/v1/tenants/fd172219-c5ee-45ab-9c18-31b9e8c59920/realtime-statistics/batch',
    //     //   headers: {
    //     //     'Content-Type': 'application/json',
    //     //     'Authorization': `Token ${this.state.tokenInfo}`
    //     //     // 'Authorization': `Token ${CxEngage.dumpState().authentication.token}`
    //     //   },
    //     // }).subscribe(data => {
    //     //   this.setState({data: data.response.results.tableWidget1.body.results.interactions})
    //     // } ,err => { console.log(err)});}
    // },1000);
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Title >Interaction Monitoring</Title>
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
    );
  }
}

export default InteractionMonitoring;
