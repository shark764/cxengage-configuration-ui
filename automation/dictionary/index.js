const randomPhoneNum = () =>
  Number(new Date().getTime())
    .toString()
    .slice(0, 10);
const randomId = randomPhoneNum();
// TODO
// Reason Lists - Needs extra logic for creation
// Capacity Rules - Page not completed yet
// Tenants - Page not completed yet
// Sla - cant find submit button when updating in jenkins
// Identity Providers - Page not completed yet
// Integrations - Page not completed yet
// Email Templates - needs data-automation labels added
// Chat Widget - needs data-automation labels added
// Transfer Lists - needs extra logic for creation
// Message Templates - needs extra logic for creation / automation input name change
// Contact Attributes - Page not completed yet.
// Contact Layouts - Page not completed yet.
// Flows - needs extra logic for update.
// Dispostions - Page not completed yet.
// Disposition Lists - Page not completed yet.
// Queues - Page not completed yet.
// Media - Page not completed yet.
// Realtime Dashboards - Page not completed yet.
// Custom Realtime Dashboards - Page not completed yet.
// Silent Monitoring - ready to be worked on
// Interaction Monitoring - ready to be worked on
// Agent State Monitoring - ready to be worked on

const pages = {
  ////////////////////////User Management///////////////////////////
  User: {
    specs: {
      create: {
        parametersToInsert: [
          {
            emailInput: `remail-${randomId}@gmail.com`,
            roleList: 'Platform User',
            tenantList: 'Agent'
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            firstNameInput: `updatedRName-${randomId}`,
            lastNameInput: `updatedRDesc-${randomId}`,
            roleList: 'Supervisor'
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'userManagementMenu',
      subMainBar: 'navigationLinkUsers'
    },
    whichCatagoryToSearch: 'searchEmailColumn',
    updateSearchValue: `remail-${randomId}@gmail.com`
  },
  Group: {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'userManagementMenu',
      subMainBar: 'navigationLinkGroups'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  Skill: {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`
            // hasProficiencyToggle: ""
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'userManagementMenu',
      subMainBar: 'navigationLinkSkills'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  Role: {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`
            // sharedToggle: ""
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'userManagementMenu',
      subMainBar: 'navigationLinkRoles'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  Reason: {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`,
            externalIdInput: '',
            sharedToggle: ''
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`,
            externalIdInput: ''
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'userManagementMenu',
      subMainBar: 'navigationLinkReasons'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  // 'Reasonlist': {
  //   specs: {
  //     create: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `rName-${randomId}`,
  //           descriptionInput: `rDesc-${randomId}`,
  //           externalIdInput: "",
  //           //sharedToggle: "",
  //           //isDefaultToggle: ""
  //           }
  //       ]
  //     },
  //     update: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `updatedRName-${randomId}`,
  //           descriptionInput: `updatedRDesc-${randomId}`,
  //           externalIdInput: "",
  //           //sharedToggle: "",
  //           //isDefaultToggle: ""
  //         }
  //       ]
  //     },
  //     read: {
  //       parameters: {}
  //     }
  //   },
  //   navigation: {
  //     mainBar: "userManagementMenu",
  //     subMainBar: "navigationLinkReasonsList"
  //   },
  //   whichCatagoryToSearch: "searchNameColumn",
  //   updateSearchValue: `rName-${randomId}`
  // },
  //////////////////////////Configuration///////////////////////////
  List: {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            //sharedToggle: "",
            listTypeList: 'Disposition Codes Type'
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`
            //sharedToggle: ""
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'configurationMenu',
      subMainBar: 'navigationLinkLists'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  Sla: {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`,
            sharedToggle: ''
          }
        ]
      },
      createVersion: {
        parametersToInsert: [
          {
            //Name and Description modal elements defined in webElements.js
            //Name and Description data added via inputFormDataForModal in common.js
            thresholdInput: '20',
            abandonTypeRadio: 'ignore-abandons',
            abandonThresholdInput: '30'
          }
        ]
      },
      // update: {
      //   parametersToInsert: [
      //     {
      //       nameInput: `updatedRName-${randomId}`,
      //       descriptionInput: `updatedRDesc-${randomId}`
      //     }
      //   ]
      // },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'configurationMenu',
      subMainBar: 'navigationLinkSlas'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  // 'Email Template': {
  //   specs: {
  //     update: {
  //       parametersToInsert: [
  //         {
  //           emailList: "Custom Email",
  //           //sharedToggle: "",
  //           subjectInput: "",
  //           bodyInput: ""
  //         }
  //       ]
  //     },
  //     read: {
  //       parameters: {}
  //     }
  //   },
  //   navigation: {
  //     mainBar: "configurationMenu",
  //     subMainBar: "navigationLinkEmailTemplates"
  //   },
  //   whichCatagoryToSearch: "searchNameColumn",
  //   updateSearchValue: "password-reset"
  // },
  'Outbound Identifier': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`,
            channelList: 1,
            flowList: 1,
            valueInput: '+15063001234'
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`,
            channelList: 0,
            flowList: 2,
            valueInput: '+15063004321'
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'configurationMenu',
      subMainBar: 'navigationLinkOutboundIdentifiers'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  'Outbound Identifier List': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'configurationMenu',
      subMainBar: 'navigationLinkOutboundIdentifierLists'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  // 'Chat Widget': {
  //   specs: {
  //     create: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `rName-${randomId}`
  //         }
  //       ]
  //     },
  //     update: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `updatedRName-${randomId}`
  //         }
  //       ]
  //     },
  //     read: {
  //       parameters: {}
  //     }
  //   },
  //   navigation: {
  //     mainBar: "configurationMenu",
  //     subMainBar: "navigationLinkChatWidgets"
  //   },
  //   whichCatagoryToSearch: "searchNameColumn",
  //   updateSearchValue: `rName-${randomId}`
  // },
  // 'Transfer List': {
  //   specs: {
  //     create: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `rName-${randomId}`,
  //           descriptionInput: `rDesc-${randomId}`,
  //         }
  //       ]
  //     },
  //     update: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `updatedRName-${randomId}`,
  //           descriptionInput: `updatedRDesc-${randomId}`,
  //         }
  //       ]
  //     },
  //     read: {
  //       parameters: {}
  //     }
  //   },
  //   navigation: {
  //     mainBar: "configurationMenu",
  //     subMainBar: "navigationLinkTransferLists"
  //   },
  //   whichCatagoryToSearch: "searchNameColumn",
  //   updateSearchValue: `rName-${randomId}`
  // },
  'Api Key': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `keyName-${randomId}`,
            descriptionInput: `keyDesc-${randomId}`,
            roleList: 'Administrator'
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedKeyName-${randomId}`,
            descriptionInput: `updatedKeyDesc-${randomId}`,
            roleList: 'Agent'
          }
        ]
      },
      delete: 'deleteAPiKeys',
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'configurationMenu',
      subMainBar: 'navigationLinkApiKeys'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `keyName-${randomId}`,
    deleteSearchValue: `updatedKeyName-${randomId}`
  },
  // 'Message Template': {
  //   specs: {
  //     create: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `rName-${randomId}`,
  //           descriptionInput: `rDesc-${randomId}`,
  //           //channelsDropdown: "",
  //           typeList: "Plain Text",
  //           templateInput: `rInput-${randomId}`
  //         }
  //       ]
  //     },
  //     update: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `updatedRName-${randomId}`,
  //           descriptionInput: `updatedRDesc-${randomId}`,
  //           //channelsDropdown: "",
  //           typeList: "Rich Text",
  //           //templateEditor: `rInput-${randomId}`
  //         }
  //       ]
  //     }
  //   },
  //   navigation: {
  //     mainBar: "configurationMenu",
  //     subMainBar: "navigationLinkMessageTemplates"
  //   },
  //   whichCatagoryToSearch: "searchNameColumn",
  //   updateSearchValue: `rName-${randomId}`
  // },
  'Business Hour': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`,
            timezoneList: 2
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`,
            timezoneList: 5
          }
        ]
      }
    },
    navigation: {
      mainBar: 'configurationMenu',
      subMainBar: 'navigationLinkBusinessHours'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  },
  /////////////////////////////////Flows//////////////////////////////
  // 'Flow': {
  //   specs: {
  //     create: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `dMapName-${randomId}`,
  //           descriptionInput: `dMapDesc-${randomId}`,
  //           typeList: "Customer"
  //         }
  //       ]
  //     },
  //     update: {
  //       parametersToInsert: [
  //         {
  //           nameInput: `updatedDMapName-${randomId}`,
  //           descriptionInput: `updatedDMapDesc-${randomId}`,
  //           typeList: "Resource"
  //         }
  //       ]
  //     },
  //     read: {
  //       parameters: {}
  //     }
  //   },
  //   navigation: {
  //     mainBar: "flowsMenu",
  //     subMainBar: "navigationLinkFlows"
  //   },
  //   whichCatagoryToSearch: "searchNameColumn",
  //   updateSearchValue: `dMapName-${randomId}`
  // },
  'Dispatch Mapping': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `dMapName-${randomId}`,
            descriptionInput: `dMapDesc-${randomId}`,
            interactionList: 'Voice',
            mappingList: 'Contact Point',
            phoneValueInput: `+1${randomPhoneNum()}`,
            flowList: 1
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedDMapName-${randomId}`,
            descriptionInput: `updatedDMapDesc-${randomId}`,
            interactionList: 'Sms',
            mappingList: 'Customer',
            phoneValueInput: `+1${randomPhoneNum()}`,
            flowList: 2,
            flowVersionList: 1
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'flowsMenu',
      subMainBar: 'navigationLinkDispatchMappings'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `dMapName-${randomId}`
  },
  /////////////////////////////Reporting/////////////////////////////
  'Data Access Report': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`,
            reportTypeRadio: 'realtime',
            realtimeReportTypeRadio: 'standard',
            realtimeReportAutoComplete: 'Agent State Table'
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`
            //realtimeReportAutoComplete: "Interactions Completed Table"
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: 'reportingMenu',
      subMainBar: 'navigationLinkDataAccessReports'
    },
    whichCatagoryToSearch: 'searchNameColumn',
    updateSearchValue: `rName-${randomId}`
  }
};

module.exports = pages;
