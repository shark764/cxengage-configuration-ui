const { Element, Brow } = require('cx-automation-utils/pageObject');
const Elem = require('..');
//const CreateBehavior = require('../common');

const CreateBehavior = {
    updateJson: function (theName,theDescription,email){
        const fs = require('fs');
        let newLine = {  
            name: theName,
            description: theDescription, 
            other: "OTHER",
        };
        let data = JSON.stringify(newLine);  
        fs.writeFileSync('./createObject.json',data,'utf-8',(err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    },

    updateName: function (newName){
        
    }

}

module.exports = CreateBehavior;
