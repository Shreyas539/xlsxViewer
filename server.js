// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const xlsx = require('xlsx');
const cors = require('cors');

const app = express();
app.use(fileUpload());
app.use(cors());

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("No file uploaded");
  }

  const file = req.files.file;
  const workbook = xlsx.read(file.data, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];  // Use the first sheet
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  res.json(sheetData);  // Send JSON data back to frontend
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
