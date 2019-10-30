const randomPhoneNum = () => Number(new Date().getTime()).toString().slice(0, 10);
const randomId = randomPhoneNum();

const pages = {
  Reason: {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `rName-${randomId}`,
            descriptionInput: `rDesc-${randomId}`,
            externalIdInput: "",
            sharedToggle: ""
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedRName-${randomId}`,
            descriptionInput: `updatedRDesc-${randomId}`,
            externalIdInput: "",
          }
        ]
      },
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: "userManagementMenu",
      subMainBar: "navigationLinkReasons"
    },
    whichCatagoryToSearch: "searchNameColumn",
    updateSearchValue: `rName-${randomId}`
  },
  'Api Key': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `keyName-${randomId}`,
            descriptionInput: `keyDesc-${randomId}`,
            roleList: "Administrator"
          }
        ]
      },
      update: {
        parametersToInsert: [
          {
            nameInput: `updatedKeyName-${randomId}`,
            descriptionInput: `updatedKeyDesc-${randomId}`,
            roleList: "Agent"
          }
        ]
      },
      delete: 'deleteAPiKeys',
      read: {
        parameters: {}
      }
    },
    navigation: {
      mainBar: "configurationMenu",
      subMainBar: "navigationLinkApiKeys"
    },
    whichCatagoryToSearch: "searchNameColumn",
    updateSearchValue: `keyName-${randomId}`,
    deleteSearchValue: `updatedKeyName-${randomId}`,
  },
  'Dispatch Mapping': {
    specs: {
      create: {
        parametersToInsert: [
          {
            nameInput: `dMapName-${randomId}`,
            descriptionInput: `dMapDesc-${randomId}`,
            interactionList: "Voice",
            mappingList: "Contact Point",
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
            interactionList: "Sms",
            mappingList: "Customer",
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
      mainBar: "flowsMenu",
      subMainBar: "navigationLinkDispatchMappings"
    },
    whichCatagoryToSearch: "searchNameColumn",
    updateSearchValue: `dMapName-${randomId}`
  }
};

module.exports = pages;