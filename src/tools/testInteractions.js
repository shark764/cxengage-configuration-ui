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
    phoneNumber += Math.floor(Math.random() * 10 + 1);
  }
  return phoneNumber;
}

function exampleDuration() {
  const secondsMinutesHours = [35000, 326000, 3645000];
  let randomTime = secondsMinutesHours[Math.floor(Math.random() * 3 + 1) - 1];
  return randomTime;
}
// function exampleStartTime() {
//   const timesArray = [
//     "2018-01-24T13:22:59.054Z",
//     "2018-03-24T14:54:59.054Z",
//     "2018-03-09T02:05:47.162Z"
//   ];
//   let randomDate = timesArray[Math.floor(Math.random() * 3 + 1) - 1];
//   return randomDate;
// }

export function makeFakeInteraction() {
  return {
    interactionId: guid(),
    agents: [{ agentName: 'Nick Guimond' }],
    customer: randomPhoneNumber(),
    contactPoint: randomPhoneNumber(),
    flowName: Math.floor(Math.random() * 10 + 1) > 4 ? 'Sales' : 'Support',
    direction: Math.floor(Math.random() * 10 + 1) > 4 ? 'inbound' : 'outbound',
    startTimestamp: moment(),
    currentStateDuration: exampleDuration(),
    channelType: 'voice',
    state: 'in-conversation'
  };
}
