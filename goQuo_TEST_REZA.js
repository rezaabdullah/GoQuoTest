// PROBLEM DESCRIPTION:
// In Hotel Transylvania, each room can only accommodate a maximum of
//     1. 3 adults
//     AND
//     2. 3 children
//     AND
//     3. 3 infants

// **In one booking, maximum guests can be 7(excluding infants)
// **No room will have only children or infants (i.e without at least one adult supervision)
// **Per booking maximum number of rooms will be only 3
// **If guests are either greater than 7(excluding infants) or rooms are greater than 3, the
//   booking will be rejected.

// AUTHOR: ABDULLAH IBN RASHID REZA
// __________________________________________________________________________________________________________________________

// Module to read data from stream
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// Questions
const PROMPTS = {
    enterOccupants: ["Enter total Number of Adults", "Enter total number of Children", "Enter total number of Infants"],
    // enterRate: ["ONLY TO DEMONSTRATE THE SACLABILITY/VERSATILITY OF THE CODE"]
}

// Prompt for user input
let showPrompt = (answer) => {
    return new Promise((resolve, reject) => {
        let prompts = PROMPTS[answer];

        // Reject if user set unknown parameter
        if (typeof prompts === "undefined") {
            reject(`Wrong input: ${action}`);
        }
        
        // Resolve and chain questions if user enter correct choice
        let chainPrompt = Promise.resolve([]);

        prompts.forEach(eachPrompt => {
            chainPrompt = chainPrompt.then(answers => new Promise((resolve, reject) => {
                    rl.question(`${eachPrompt}: `, answer => {
                        answers.push(Number(answer));
                        resolve(answers);
                    });
                })
            );
        });

        chainPrompt.then((answers) => {
            rl.close();
            resolve(answers);
        })
    });
};

// Error handling 
let errorHandler = (error) => {
    console.log(`ERROR: ${error}`);
}

// Room arrangements
let roomArragement = (answers) => {
    let numAdult = answers[0];
    let numChild = answers[1];
    let numInfant = answers[2];
    let adultChildRatio = answers[0] / answers[1];
    let adultInfantRatio = answers[0] / answers[2];

    // Proceed with the boooking if total number of adults is less than or equal to 9 (3 pax/room)
    // Allowable Adult:Children = 1:3
    // Allowable Adult:Infants = 1:3
    if ((numAdult > 0 && numAdult <= 9) && (adultChildRatio >= 0.33 && adultInfantRatio >= 0.33)) {
        // Assign rooms based on number of adults, children and infants
        let adultQuotient = Math.floor(numAdult / 3);
        let childQuotient = Math.floor(numChild / 3);
        let infantQuotient = Math.floor(numInfant / 3);
        
        // Initialize Number of Rooms
        let numRoom = 0;

        // Determine signnificant occupant to determine room arrangement
        if (numChild >= numInfant) {
            if (adultChildRatio > 1) {
                numRoom = ((numAdult % 3) === 0) ? adultQuotient : (adultQuotient + 1);
            } else {
                numRoom = ((numChild % 3) === 0) ? childQuotient : (childQuotient + 1);
            }
        } else {
            if (adultInfantRatio > 1) {
                numRoom = ((numAdult % 3) === 0) ? adultQuotient : (adultQuotient + 1);
            } else {
                numRoom = ((numInfant % 3) === 0) ? infantQuotient : (infantQuotient + 1);
            }
        }
        console.log(`Number of Rooms: ${numRoom}`);
    } else {
        console.log("Booking is rejected");
    }
}

showPrompt("enterOccupants")
    .then(roomArragement)
    .catch(errorHandler);