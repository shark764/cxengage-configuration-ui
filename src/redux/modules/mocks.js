/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

export const testListData = {
  "result":[
    {
      "tenantId":"57e2f960-3328-11e6-8dd4-c88eee4d9f61",
      "listType":{
        "tenantId":"57e2f960-3328-11e6-8dd4-c88eee4d9f61",
        "description":null,
        "createdBy":"00000000-0000-0000-0000-000000000000",
        "updated":"2016-06-15T19:14:10Z",
        "name":"Disposition Codes Type",
        "fields":[
          {
            "type":"string",
            "name":"dispositionName",
            "label":"Disposition Name",
            "required":true
          },
          {
            "type":"number",
            "name":"dispositionCode",
            "label":"Disposition Code",
            "required":true
          },
          {
            "type":"string",
            "name":"description",
            "label":"Description",
            "required":true
          }
        ],
        "created":"2016-06-15T19:14:10Z",
        "updatedBy":"00000000-0000-0000-0000-000000000000",
        "active":true,
        "id":"57083780-332d-11e6-8dd4-c88eee4d9f61"
      },
      "createdBy":"00000000-0000-0000-0000-000000000000",
      "listTypeId":"57083780-332d-11e6-8dd4-c88eee4d9f61",
      "updated":"2016-06-15T19:14:10Z",
      "name":"Disposition Codes",
      "created":"2016-06-15T19:14:10Z",
      "updatedBy":"00000000-0000-0000-0000-000000000000",
      "active":false,
      "id":"57083782-332d-11e6-8dd4-c88eee4d9f61",
      "items":[
        {
          "dispositionName":"Angry Customer",
          "dispositionCode":202,
          "description":"Indicates angry customer"
        },
        {
          "dispositionName":"Do Not Call",
          "dispositionCode":203,
          "description":"Indicates customer on no call list"
        },
        {
          "dispositionName":"Sale Made",
          "dispositionCode":201,
          "description":"Indicates agent made a sale"
        }
      ]
    },
    {
      "tenantId":"57e2f960-3328-11e6-8dd4-c88eee4d9f61",
      "listType":{
        "tenantId":"57e2f960-3328-11e6-8dd4-c88eee4d9f61",
        "description":"some test desc",
        "createdBy":"00000000-0000-0000-0000-000000000000",
        "updated":"2016-06-15T19:14:10Z",
        "name":"Reason Codes Type",
        "fields":[
          {
            "type":"string",
            "name":"reasonName",
            "label":"Reason Name",
            "required":true
          },
          {
            "type":"number",
            "name":"reasonCode",
            "label":"Reason Code",
            "required":true
          },
          {
            "type":"string",
            "name":"description",
            "label":"Description",
            "required":true
          }
        ],
        "created":"2016-06-15T19:14:10Z",
        "updatedBy":"00000000-0000-0000-0000-000000000000",
        "active":true,
        "id":"57083781-332d-11e6-8dd4-c88eee4d9f61"
      },
      "createdBy":"00000000-0000-0000-0000-000000000000",
      "listTypeId":"57083781-332d-11e6-8dd4-c88eee4d9f61",
      "updated":"2016-09-07T15:54:35Z",
      "name":"Reason Codes",
      "created":"2016-06-15T19:14:10Z",
      "updatedBy":"00000000-0000-0000-0000-000000000000",
      "active":true,
      "id":"57083783-332d-11e6-8dd4-c88eee4d9f61",
      "items":[
        {
          "reasonName":"Break",
          "reasonCode":101,
          "description":"Indicates agent is on a break"
        },
        {
          "reasonName":"Customer Research",
          "reasonCode":103,
          "description":"Indicates agent is doing customer research"
        },
        {
          "reasonName":"End of Shift",
          "reasonCode":102,
          "description":"Indicates agent's shift has ended"
        },
        {
          "reasonName":"Hungry",
          "reasonCode":106,
          "description":"Food"
        },
        {
          "reasonName":"Lunch",
          "reasonCode":104,
          "description":"Indicates agent is on lunch break"
        },
        {
          "reasonName":"Meeting",
          "reasonCode":105,
          "description":"Indicates agent is in a meeting"
        }
      ]
    }
  ]
};
