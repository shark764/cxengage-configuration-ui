import moment from 'moment';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function randomPhoneNumber() {
  let phoneNumber = `+1506`;
  for (let i = 0; i < 7; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}

function randomChannel() {
  let options = ['voice', 'sms', 'messaging', 'email'];
  return options[Math.floor(Math.random() * options.length)];
}

function exampleDuration() {
  const secondsMinutesHours = [35000, 326000, 3645000];
  let randomTime = secondsMinutesHours[Math.floor(Math.random() * 3)];
  return randomTime;
}
function exampleStartTime() {
  const dateNow = new Date().toISOString();
  return dateNow;
}

export const mockInteraction = {
  interactionId: '0000-1111-2222-3333',
  agents: [
    {
      agentName: 'Nick Guimond',
      agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
      groups: [
        { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
        {
          groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
          groupName: 'everyone'
        }
      ],
      skills: [
        {
          skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
          skillName: 'Support Questions'
        },
        {
          skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
          skillName: 'Sales Questions'
        }
      ]
    },
    {
      agentName: 'Alex Giordano',
      groups: [
        { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
        {
          groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
          groupName: 'everyone'
        }
      ],
      skills: [
        {
          skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
          skillName: 'Support Questions'
        },
        {
          skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
          skillName: 'Sales Questions'
        }
      ]
    },
    {
      agentName: 'Doron Orenstein',
      groups: [
        { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
        {
          groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
          groupName: 'everyone'
        }
      ],
      skills: [
        {
          skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
          skillName: 'Support Questions'
        },
        {
          skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
          skillName: 'Sales Questions'
        }
      ]
    },
    {
      agentName: 'Josh Clowater',
      groups: [
        { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
        {
          groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
          groupName: 'everyone'
        }
      ],
      skills: [
        {
          skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
          skillName: 'Support Questions'
        },
        {
          skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
          skillName: 'Sales Questions'
        }
      ]
    }
  ],
  customer: '+12223333',
  contactPoint: '+23334444',
  flowName: 'Sales',
  direction: 'inbound',
  startTimestamp: '2018-02-20T14:24:41.519Z',
  currentStateDuration: 500,
  channelType: 'sms',
  state: 'in-conversation',
  monitors: [
    {
      agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
      agentName: 'Anil Reddy',
      bargedIn: true,
      endTimestamp: '2018-02-20T14:24:41.519Z',
      startTimestamp: '2018-02-20T14:07:41.519Z'
    },
    {
      agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
      agentName: 'Josh Williams',
      bargedIn: false,
      endTimestamp: null,
      startTimestamp: '2018-02-20T14:07:41.519Z'
    }
  ]
};

export const fakeInteractions = [
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: []
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Anil Reddy',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Williams',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Anil Reddy',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Clowater',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Williams',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Anil Reddy',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Williams',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Nick Guimond',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Matt Jones',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Matt Jones',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Anil Reddy',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Nick Guimond',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Clowater',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Alex Giordano',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Williams',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Williams',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Williams',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'messaging',
    state: 'in-conversation',
    monitors: []
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'sms',
    state: 'in-conversation',
    monitors: []
  },
  {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'email',
    state: 'in-conversation',
    monitors: []
  }
];

export function makeFakeInteractions(interactionArray = []) {
  for (let i = 0; i < 5000; i++) {
    interactionArray.push(makeFakeInteraction());
  }
  return interactionArray;
}

export function makeFakeInteraction() {
  return {
    interactionId: guid(),

    agents: [
      {
        agentName: 'Nick Guimond',
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Alex Giordano',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Doron Orenstein',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      },
      {
        agentName: 'Josh Clowater',
        groups: [
          { groupId: 'e2fc7760-163e-11e8-8039-827d48dc951b', groupName: 'HQ' },
          {
            groupId: 'e2458080-8801-11e7-b018-9a5ac3da6edd',
            groupName: 'everyone'
          }
        ],
        skills: [
          {
            skillId: 'd5bce530-163e-11e8-8039-827d48dc951b',
            skillName: 'Support Questions'
          },
          {
            skillId: 'd13f9a70-163e-11e8-8039-827d48dc951b',
            skillName: 'Sales Questions'
          }
        ]
      }
    ],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: exampleStartTime(),
    currentStateDuration: exampleDuration(),
    channelType: randomChannel(),
    state: 'in-conversation',
    monitors: [
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Anil Reddy',
        bargedIn: true,
        endTimestamp: '2018-02-20T14:24:41.519Z',
        startTimestamp: '2018-02-20T14:07:41.519Z'
      },
      {
        agentId: '4c67ac60-16f9-11e7-9873-1b92cd79a0c3',
        agentName: 'Josh Williams',
        bargedIn: false,
        endTimestamp: null,
        startTimestamp: '2018-02-20T14:07:41.519Z'
      }
    ]
  };
}
