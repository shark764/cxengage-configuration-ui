const randomPhoneNum = () =>
  Number(new Date().getTime())
    .toString()
    .slice(0, 10);


// TODO
// Capacity Rules - Page not completed yet
// Identity Providers - Page not completed yet
// Integrations - Page not completed yet
// Email Templates - needs update after bug fix.
// Flows - needs extra logic for update.
// Queues - Page not completed yet.
// Media - Page not completed yet.
// Realtime Dashboards - Page not completed yet.
// Custom Realtime Dashboards - Page not completed yet.
// Silent Monitoring - ready to be worked on
// Interaction Monitoring - ready to be worked on
// Agent State Monitoring - ready to be worked on

module.exports = {
  pages: function (x = 1) {
    let randomId = randomPhoneNum() + "_" + x;
    return {
      'Outbound Identifier': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                channelList: 1,
                valueInput: `+1${randomPhoneNum()}`,
                flowList: 1,
                descriptionInput: `rDesc-${randomId}`
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedRName-${randomId}`,
                channelList: 3,
                valueInput: `remail-${randomId}@gmail.com`,
                // flowList: 2,
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
          subMainBar: 'navigationLinkOutboundIdentifiers'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`]
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
            /*
            subEntityToAddAndRemove: [
              {
                outboundIdentifiersSVG: "outboundIdentifiersSVG"
              }
            ]
            */
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
        updateSearchValue: [`rName-${randomId}`]
      },
      Reason: {
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
                descriptionInput: `updatedRDesc-${randomId}`,
                sharedToggle: ''
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
        updateSearchValue: [`rName-${randomId}`]
      },
      'Reason List': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                descriptionInput: `rDesc-${randomId}`
              }
            ],
            subEntityParametersToInsert: [
              {
                categoryNameInput: `CategoryOne-${randomId}`,
                reasonList: 1
              },
              {
                categoryNameAutoComplete: `CategoryOne-${randomId}`,
                reasonList: 2
              },
              {
                newCategoryToggle: '',
                categoryNameInput: `CategoryTwo-${randomId}`,
                reasonList: 1
              },
              {
                categoryNameAutoComplete: `CategoryTwo-${randomId}`,
                reasonList: 2
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedRName-${randomId}`,
                descriptionInput: `updatedRDesc-${randomId}`
                //isDefaultToggle: ""
              }
            ],
            subEntityParametersToInsert: [
              {
                categoryNameInput: `updatedCategoryName-${randomId}`
              }
            ]
          },
          delete: 'deleteReasonLists',
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'userManagementMenu',
          subMainBar: 'navigationLinkReasonLists'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`],
        deleteSearchValue: `updatedRName-${randomId}`
      },
      Skill: {
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
                descriptionInput: `updatedRDesc-${randomId}`,
                hasProficiencyToggle: ''
              }
            ],
            subEntityToAddAndRemove: [
              {
                usersSVG: 'usersSVG'
              },
              {
                outboundIdentifierListsSVG: 'outboundIdentifierListsSVG'
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
        updateSearchValue: [`rName-${randomId}`]
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
            ],
            subEntityToAddAndRemove: [
              {
                usersSVG: 'usersSVG'
              },
              {
                outboundIdentifierListsSVG: 'outboundIdentifierListsSVG'
              },
              {
                reasonListsSVG: 'reasonListsSVG'
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
        updateSearchValue: [`rName-${randomId}`]
      },
      'Transfer List': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                descriptionInput: `rDesc-${randomId}`
              }
            ],
            subEntityParametersToInsert: [
              {
                categoryNameInput: `CategoryOne-${randomId}`,
                contactNameInput: `ContactOne-${randomId}`,
                contactTypeList: 'SIP',
                transferTypeList: 'Internal',
                warmColdTransferCheckbox: {
                  input: ['warmTransferCheckbox', 'coldTransferCheckbox'],
                  value: 'warmTransfer, coldTransfer'
                },
                endpointInput: `sip:${randomId}@gmail.com`
              },
              {
                categoryNameAutoComplete: `CategoryOne-${randomId}`,
                contactNameInput: `ContactOne-${randomId}`,
                contactTypeList: 'PSTN',
                transferTypeList: 'External',
                warmColdTransferCheckbox: {
                  input: ['coldTransferCheckbox'],
                  value: 'coldTransfer'
                },
                endpointInput: `+1${randomPhoneNum()}`
              },
              {
                newCategoryToggle: '',
                categoryNameInput: `CategoryTwo-${randomId}`,
                contactNameInput: `ContactTwo-${randomId}`,
                contactTypeList: 'PSTN',
                transferTypeList: 'Internal',
                warmColdTransferCheckbox: {
                  input: ['warmTransferCheckbox'],
                  value: 'warmTransfer'
                },
                endpointInput: `+1${randomPhoneNum()}`
              },
              {
                categoryNameAutoComplete: `CategoryTwo-${randomId}`,
                contactNameInput: `ContactTwo-${randomId}`,
                contactTypeList: 'PSTN',
                transferTypeList: 'External',
                warmColdTransferCheckbox: {
                  input: ['coldTransferCheckbox'],
                  value: 'coldTransfer'
                },
                endpointInput: `+1${randomPhoneNum()}`
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedRName-${randomId}`,
                descriptionInput: `updatedRDesc-${randomId}`
              }
            ],
            subEntityParametersToInsert: [
              {
                contactNameInput: `updatedContact-${randomId}`,
                contactTypeList: 'PSTN',
                transferTypeList: 'Internal',
                warmColdTransferCheckbox: {
                  input: ['warmTransferCheckbox'],
                  value: 'coldTransfer'
                },
                endpointInput: `+1${randomPhoneNum()}`
              }
            ]
          },
          delete: 'deleteTransferLists',
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'configurationMenu',
          subMainBar: 'navigationLinkTransferLists'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`],
        deleteSearchValue: `updatedRName-${randomId}`
      },
      Disposition: {
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
                descriptionInput: `updatedRDesc-${randomId}`,
                sharedToggle: ''
              }
            ]
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'flowsMenu',
          subMainBar: 'navigationLinkDispositions'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`]
      },
      'Disposition List': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                descriptionInput: `rDesc-${randomId}`
              }
            ],
            subEntityParametersToInsert: [
              {
                categoryNameInput: `CategoryOne-${randomId}`,
                dispositionList: 1
              },
              {
                categoryNameAutoComplete: `CategoryOne-${randomId}`,
                dispositionList: 2
              },
              {
                newCategoryToggle: '',
                categoryNameInput: `CategoryTwo-${randomId}`,
                dispositionList: 1
              },
              {
                categoryNameAutoComplete: `CategoryTwo-${randomId}`,
                dispositionList: 2
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedRName-${randomId}`,
                descriptionInput: `updatedRDesc-${randomId}`
              }
            ],
            subEntityParametersToInsert: [
              {
                categoryNameInput: `updatedCategoryName-${randomId}`
              }
            ]
          },
          delete: 'deleteDispositionLists',
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'flowsMenu',
          subMainBar: 'navigationLinkDispositionLists'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`],
        deleteSearchValue: `updatedRName-${randomId}`
      },
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
            ],
            subEntityToAddAndRemove: [
              {
                skillsSVG: 'skillsSVG'
              },
              {
                groupsSVG: 'groupsSVG'
              },
              {
                reasonListsSVG: 'reasonListsSVG'
              },
              {
                messageTemplatesSVG: 'messageTemplatesSVG'
              },
              {
                transferListsSVG: 'transferListsSVG'
              },
              {
                outboundIdentifierListsSVG: 'outboundIdentifierListsSVG'
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
        userPSTNNumber: '+15063003002',
        userSIPAddress: 'sip:882402150@64.240.105.99',
        whichCatagoryToSearch: 'searchEmailColumn',
        updateSearchValue: [`remail-${randomId}@gmail.com`]
      },
      Role: {
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
                descriptionInput: `updatedRDesc-${randomId}`,
                sharedToggle: ''
              }
            ],
            subEntityToAddAndRemove: [
              {
                permissionsSVG: 'permissionsSVG'
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
        updateSearchValue: [`rName-${randomId}`]
      },
      List: {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                listTypeList: 'Disposition Codes Type'
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedRName-${randomId}`,
                sharedToggle: ''
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
        updateSearchValue: [`rName-${randomId}`]
      },
      Sla: {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                descriptionInput: `rDesc-${randomId}`
              }
            ],
            subEntityParametersToInsert: [
              {
                subEntityFormNameInput: `versionName-${randomId}`,
                subEntityFormDescriptionInput: `versionDesc-${randomId}`,
                thresholdInput: '20',
                abandonTypeRadio: 'ignore-abandons',
                abandonThresholdInput: '30'
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedName-${randomId}`,
                descriptionInput: `updatedDesc-${randomId}`
                // sharedToggle: '',
              }
            ]
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'configurationMenu',
          subMainBar: 'navigationLinkSlas'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`]
      },
      'Email Template': {
        specs: {
          update: {
            parametersToInsert: [
              {
                emailList: "Custom Email",
                emailTemplateSubjectInput: "Custom CxEngage password change request",
                emailTemplateBodyInput: "Click on this link {{{password-reset-url}}} to reset password for {{{username}}}",
                sharedToggle: "",
              }
            ]
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: "configurationMenu",
          subMainBar: "navigationLinkEmailTemplates"
        },
        whichCatagoryToSearch: "searchNameColumn",
        updateSearchValue: ['password-reset']
      },
      'Chat Widget': {
          specs: {
          deleteBeforeAPI: {
            parameters: {}
          },
          createAPI: {
            parameters: {}
          },
          create: {
            parametersToInsert: [
              {
                nameInput: 'Config2 Automation Web Integration',
                descriptionInput: `rDesc-${randomId}`,
                contactPointInput: 'messaging-contact-point',
                appIdList: 'Chat Widget Automation App',
                displayStyleRadio: 'button',
                buttonIconURLInput: 'https://www.fakeButtonURL.com/',
                buttonWidthInput: '45',
                buttonHeightInput: '50',
                businessNameInput: 'Automation is fun',
                businessIconURLInput: 'https://www.fakeBusinessIconURL.com',
                backgroundImageURLInput: 'https://www.fakeBackgroundImageURL.com',
                brandColorInput: '#0099ff',
                conversationColorInput: '#ff0026',
                actionColorInput: '#65758e',
                fixedIntroPaneToggle: '',
                prechatCaptureRadio: 'email'
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                descriptionInput: `rUpdatedDesc-${randomId}`,
                contactPointInput: 'messaging-contact-point-updated',
                clientDisconnectInput: '5',
                displayStyleRadio: 'tab',
                businessNameInput: 'Automation is super fun',
                businessIconURLInput: 'https://www.fakeUpdatedBusinessIconURL.com',
                backgroundImageURLInput: 'https://www.fakeUpdatedBackgroundImageURL.com',
                brandColorInput: '#306dcb',
                conversationColorInput: '#ff0026',
                actionColorInput: '#0099ff',
                fixedIntroPaneToggle: '',
                prechatCaptureRadio: 'name'
              }
            ]
          },
          deleteAfterAPI: {
            parameters: {}
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: "configurationMenu",
          subMainBar: "navigationLinkChatWidgets"
        },
        whichCatagoryToSearch: "searchNameColumn",
        updateSearchValue: ['Config2 Automation Web Integration']
      }, 
      'Whatsapp Integration': {
        specs: {
          deleteBeforeAPI: {
            parameters: {}
          },
          create: {
            parametersToInsert: [
              {
                nameInput: 'Config2 Automation WhatsApp Integration',
                descriptionInput: `rDesc-${randomId}`,
                whatsappIdList: 1,
                clientDisconnectMinutesInput: '60'
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                descriptionInput: `rUpdatedDesc-${randomId}`,
                clientDisconnectMinutesInput: '88',
              }
            ]
          },
          deleteAfterAPI: {
            parameters: {}
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: "configurationMenu",
          subMainBar: "navigationLinkWhatsappIntegrations"
        },
        whichCatagoryToSearch: "searchNameColumn",
        updateSearchValue: ['Config2 Automation WhatsApp Integration']
      },
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
        updateSearchValue: [`keyName-${randomId}`],
        deleteSearchValue: `updatedKeyName-${randomId}`
      },
      'Message Template': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                descriptionInput: `rDesc-${randomId}`,
                msgTemplatechannelsCheckbox: {
                  input: ['smsCheckbox'],
                  value: 'sms'
                },
                templateInput: `rTemplateInput-${randomId}-${randomId}`
              },
              {
                nameInput: `rRichName-${randomId}`,
                descriptionInput: `rRichDesc-${randomId}`,
                msgTemplatechannelsCheckbox: {
                  input: ['emailCheckbox'],
                  value: 'email'
                },
                typeList: 1,
                richTextEditorInput: `rTemplateInput-${randomId}-${randomId}`
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedRName-${randomId}`,
                descriptionInput: `updatedRDesc-${randomId}`,
                msgTemplatechannelsCheckbox: {
                  input: ['smsCheckbox', 'messagingCheckbox'],
                  value: 'messaging'
                },
                templateInput: `rUpdatedTemplateInput-${randomId}-${randomId}`
              },
              {
                nameInput: `updatedRichName-${randomId}`,
                descriptionInput: `updatedRichDesc-${randomId}`,
                richTextEditorInput: `rUpdatedRichTemplateInput-${randomId}-${randomId}`
              }
            ]
          }
        },
        navigation: {
          mainBar: 'configurationMenu',
          subMainBar: 'navigationLinkMessageTemplates'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`, `rRichName-${randomId}`]
      },
      'Business Hour': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `rName-${randomId}`,
                descriptionInput: `rDesc-${randomId}`
              }
            ],
            draftEntityParametersToInsert: [
              {
                timezoneList: 1,
                ruleNameInput:`ruleName-${randomId}`,
                ruleTypeList:1,
                ruleDescriptionInput:`Rule Description-${randomId}`,
                ruleRepeatList:1,
                ruleEveryInput:1
              }],
            subEntityParametersToInsert: [
              {
                versionNameInput: `version-${randomId}`,
                makeActiveToggle: true,
              },
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedRName-${randomId}`,
                descriptionInput: `updatedRDesc-${randomId}`
              }
            ]
          }
        },
        navigation: {
          mainBar: 'configurationMenu',
          subMainBar: 'navigationLinkBusinessHours'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`rName-${randomId}`],
        deleteSearchValue: `updatedKeyName-${randomId}`
      },
      'Flow': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `dMapName-${randomId}`,
                descriptionInput: `dMapDesc-${randomId}`,
                typeList: "Customer"
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updatedDMapName-${randomId}`,
                descriptionInput: `updatedDMapDesc-${randomId}`,
                typeList: "Resource"
              }
            ]
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: "flowsMenu",
          subMainBar: "navigationLinkFlows"
        },
        whichCatagoryToSearch: "searchNameColumn",
        updateSearchValue: [`dMapName-${randomId}`]
      },
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
        updateSearchValue: [`dMapName-${randomId}`]
      },
      /* Commenting out because we cannot add more than 50 custom attributes per tenant
      'Custom Attribute': {
        specs: {
          create: {
            parametersToInsert: [
              {
                attributeIdentifierInput: `cAttrName-${randomId}`,
                attributeNameInput: `cAttrName-${randomId}`,
                descriptionInput: `cAttrDesc-${randomId}`,
                realtimeToggle: true,
                historicalToggle: true
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                attributeNameInput: `updatedAAttrName-${randomId}`,
                descriptionInput: `updatedAAttrDesc-${randomId}`,
                realtimeToggle: false,
                historicalToggle: false
              }
            ]
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'flowsMenu',
          subMainBar: 'navigationLinkCustomAttributes'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`cAttrName-${randomId}`]
      },
      */
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
        updateSearchValue: [`rName-${randomId}`]
      },
      // Tenant: {
      //   specs: {
      //     create: {
      //       parametersToInsert: [
      //         {
      //           nameInput: `tName-${randomId}`,
      //           descriptionInput: `tDesc-${randomId}`,
      //           tenantAdminList: 1,
      //           timezoneList: '(-05:00) US/Eastern',
      //           navBarInput: '#f11115',
      //           navBarTextInput: '#59e4cd',
      //           primaryColorInput: '#de6060',
      //           accentColorInput: '#30d230',
      //           accentHoverColorInput: '#add2b3'
      //         }
      //       ]
      //     },
      //     update: {
      //       parametersToInsert: [
      //         {
      //           nameInput: `updatedTName-${randomId}`,
      //           descriptionInput: `updatedTDesc-${randomId}`,
      //           tenantAdminList: 1,
      //           timezoneList: '(-05:00) US/Eastern',
      //           navBarInput: '#12f168',
      //           navBarTextInput: '#e61c9c',
      //           primaryColorInput: '#d6c66e',
      //           accentColorInput: '#4b46de',
      //           accentHoverColorInput: '#d2d7dc'
      //         }
      //       ]
      //     },
      //     read: {
      //       parameters: {}
      //     }
      //   },
      //   navigation: {
      //     mainBar: 'configurationMenu',
      //     subMainBar: 'navigationLinkTenants'
      //   },
      //   whichCatagoryToSearch: 'searchNameColumn',
      //   updateSearchValue: [`tName-${randomId}`]
      // },
      /* Not sure why there are two `Tenant`s... */
      // Tenant: {
      //   specs: {
      //     create: {
      //       parametersToInsert: [
      //         {
      //           nameInput: `tName-${randomId}`,
      //           descriptionInput: `tDesc-${randomId}`,
      //           tenantAdminList: 1,
      //           timezoneList: '(-05:00) US/Eastern',
      //           navBarInput: '#f11115',
      //           navBarTextInput: '#59e4cd',
      //           primaryColorInput: '#de6060',
      //           accentColorInput: '#30d230',
      //           accentHoverColorInput: '#add2b3'
      //         }
      //       ]
      //     },
      //     update: {
      //       parametersToInsert: [
      //         {
      //           nameInput: `updatedTName-${randomId}`,
      //           descriptionInput: `updatedTDesc-${randomId}`,
      //           tenantAdminList: 1,
      //           timezoneList: '(-05:00) US/Eastern',
      //           navBarInput: '#12f168',
      //           navBarTextInput: '#e61c9c',
      //           primaryColorInput: '#d6c66e',
      //           accentColorInput: '#4b46de',
      //           accentHoverColorInput: '#d2d7dc'
      //         }
      //       ]
      //     },
      //     read: {
      //       parameters: {}
      //     }
      //   },
      //   navigation: {
      //     mainBar: 'configurationMenu',
      //     subMainBar: 'navigationLinkTenants'
      //   },
      //   whichCatagoryToSearch: 'searchNameColumn',
      //   updateSearchValue: [`tName-${randomId}`]
      // },
      'Contact Attribute': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `attrName-${randomId}`,
                typeList: 1,
                defaultInput: `defaultAttr-${randomId}`,
                madatoryToggle: true,
                localizationLabelInput: `label-${randomId}`,
                localizationLanguageList: 1,
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                defaultInput: `updated-defaultAttr-${randomId}`,
                madatoryToggle: false,
                localizationLabelInput: `updated-label-${randomId}`,
                localizationLanguageList: 2,
              }
            ]
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'configurationMenu',
          subMainBar: 'navigationLinkContactAttributes'
        },
        whichCatagoryToSearch: 'searchObjectNameColumn',
        updateSearchValue: [`attrName-${randomId}`]
      },
      
      'Contact Layout': {
        specs: {
          create: {
            parametersToInsert: [
              {
                nameInput: `layoutName-${randomId}`,
                descriptionInput: `layoutDesc-${randomId}`,
              },
            ],
            subEntityParametersToInsert: [
              {
                categoryNameInput: `categoryName-${randomId}`,
                localizationLabelInput: `label-${randomId}`,
                localizationLanguageList: 1,
                contactAttributesAutoComplete: `attrName-${randomId}`,
              }
            ]
          },
          update: {
            parametersToInsert: [
              {
                nameInput: `updated-layoutName-${randomId}`,
                descriptionInput: `updated-layoutDesc-${randomId}`,
              }
            ],
            subEntityParametersToInsert: [
              {
                categoryNameInput: `updated-categoryName-${randomId}`,
                localizationLabelInput: `updated-label-${randomId}`,
                localizationLanguageList: 2,
              },
            ]
          },
          read: {
            parameters: {}
          }
        },
        navigation: {
          mainBar: 'configurationMenu',
          subMainBar: 'navigationLinkContactLayouts'
        },
        whichCatagoryToSearch: 'searchNameColumn',
        updateSearchValue: [`layoutName-${randomId}`],
        statusColumnFilter: 'All'
      }
    };
  }
};
