//airtable.js

/*
This .js file will send form input (POST request) to
my airtable using airtable's web api
*/

function submitForm() {
  //get api values
  const API_KEY = window.config.airtableAPIkey; //api token string
  const BASE_ID = window.config.baseID; //base id
  const TABLE_NAME = window.config.tableName; //table name: 'Web Portfolio'

  const apiURL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
  //get values using id
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  //now put data inside object to send
  const data = {
    Name: name,
    Email: email,
    Message: message,
  };

  console.log(data);

  //POST request to table as a record
  fetch(apiURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Record created:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
