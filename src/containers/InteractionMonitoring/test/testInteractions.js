// const {getQuestion, getPersonName} = require('random-questions');

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
    for(let i=0; i < 7; i++) {
        phoneNumber += Math.floor((Math.random() * 10) + 1);
    }
    return phoneNumber;
}

function msToTime(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;
    return `${hrs < 10? `0${hrs}`: hrs}:${mins < 10? `0${mins}`: mins}:${secs < 10? `0${secs}`: secs}`;
}

function exampleDuration() {
   // const secondsMinutesHours = [(Math.random() * 64000),(Math.random() * 640000),(Math.random() * 64000000)];
    // console.log(Math.floor((Math.random() * 3) + 1) - 1);
   // let randomTime = secondsMinutesHours[Math.floor((Math.random() * 3) + 1) - 1 ];
    // console.log(parseInt(randomTime))
    return msToTime(485686);
}

export function makeFakeInteraction() {
    return {
        interactionId: guid(),
        agents : [{agentName: 'Nick Guimond'}],
        customer: randomPhoneNumber(),
        contactPoint: randomPhoneNumber(),
        flowName: Math.floor((Math.random() * 10) + 1) > 4? 'Sales' : 'Support',
        direction: Math.floor((Math.random() * 10) + 1) > 4? 'inbound' : 'outbound',
        startTimestamp: `${new Date('2018-01-24T13:22:59.054Z').toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}`,
        currentStateDuration: exampleDuration(),
    }
}
