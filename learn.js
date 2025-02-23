// console.log("Hello javas")
// function getData() {
//     setTimeout(() => {
//         console.log("Fetching data...");
//     }, 2000);
// }

// console.log("Start");
// getData();  // This runs asynchronously
// console.log("End");

const bcrypt = require("bcrypt");

async function hashPassword() {
    const hash = await bcrypt.hash("bjsdhdsjd", 10);
    console.log(hash);
}

hashPassword();

// async function getData() {
//     console.log("Fetching data...");
//     return "Data received!";
// }

// async function fetchData() {
//     console.log("Start");
//     const result = await getData(); // Waits for getData() to complete
//     console.log(result);
//     console.log("End");
// }

//fetchData();
