const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
// Set up middleware
app.use(bodyParser.json());

// Set up Google Sheets API client
const keys = require('./keys.json');
const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth: client });
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
  });
  
// Set up Express route handler
app.post('/submit-form', async (req, res) => {
	try {
		console.log(req.body);
	  const { field1, field2, field3 ,field4,field5} = req.body;
	  console.log(req.body);
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: '1MPVvbkcPDSus7CCMc1710WrUdwzEONntx_NafAji76E',
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[field1, field2, field3,field4,field5]]
      }
    });
    console.log(`${response.data.updates.updatedCells} cells appended.`);
    res.status(200).send('Form data inserted successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting form data.');
  }
});

// Start the server
app.listen(5000, () => console.log('Server started on port 5000.'));
