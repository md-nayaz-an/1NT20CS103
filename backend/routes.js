const express = require("express");
const { filter, sort } = require("./utils");
const routes = express.Router();

const url = "http://20.244.56.144/train/"
let token = "";
const authData = {
    "companyName": "NMIT",
    "clientID": "b5ae8a28-59c8-41b1-868e-be8c644fd89f",
    "clientSecret": "QrkgMMItrWApJCAJ",
    "ownerName": "Mohammed Nayaz A N",
    "ownerEmail": "mohammednayazan@gmail.com",
    "rollNo": "1NT20CS103"
}

async function auth () {
    try {
        const response = await fetch(url + "auth", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(authData)
        });
    
        if (!response.ok) {
          throw new Error(`Authentication request failed with status: ${response.status}`);
        }
    
        const responseBody = await response.json();
        token = responseBody.access_token; 
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
}

routes.route("/train/trains").get(
    async(req, res) => {
        try {
            await auth();
            
            const response = await fetch(url + "/trains", {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
        
            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }
        
            const data = await response.json();

            res.json(sort(filter(data)));
          } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({ error: 'An error occurred while fetching data' });
          }
    }
)
routes.route("/train/id").get(
    async(req, res) => {
        try {
            await auth();
            
            let trainNo = req.query.trainno;
            if(trainNo === undefined) {
                throw new Error("Not found");
            }
            
            console.log(url + "/trains/" + trainNo);
            const response = await fetch(url + "/trains/" + trainNo , {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
        
            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }
        
            const data = await response.json();

            res.json(data);
          } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({ error: 'An error occurred while fetching train data' });
          }
    }
)


module.exports = routes