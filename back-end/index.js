const express = require('express');
const { jsPDF } = require('jspdf');
const app = express();
const cors = require('cors');
const base64Img = require('base64-img');
app.use(cors({}));

app.get('/api/generate-pdf', (req, res) => {
  // Load the PNG image as a base64-encoded string
  const backgroundImage = base64Img.base64Sync('./check1.png');

  // Create a new PDF document
  const doc = new jsPDF();

  // Add the PNG image as a background image
  doc.addImage(backgroundImage, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, undefined, 'FAST');
   // Set the opacity of the image

  // Add the certificate text
  doc.setFontSize(30);
  doc.setTextColor('#000000'); // Set the text color to white
  doc.text('Certificate of Completion', doc.internal.pageSize.width / 2, 100, { align: 'center' });
  doc.setFontSize(16);
  doc.text('This is to certify that Raji1 successfully completed the course Writing Skills by Kevin Missal from Hubhawks MasterClass', doc.internal.pageSize.width / 2, 150, { align: 'center' });
  doc.setFontSize(12);
  doc.text('Given on: [DATE]', 50, 250, { align: 'left' });
  doc.text('Given on: [DATE]', doc.internal.pageSize.width / 2, 250, { align: 'center' });
  doc.text('[SIGNATURE]', doc.internal.pageSize.width - 50, 250, { align: 'right' });

  // Get the PDF bytes as an ArrayBuffer
  const pdfBytes = doc.output('arraybuffer');

  // Set the response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
  res.setHeader('Content-Length', pdfBytes.byteLength);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Convert the ArrayBuffer to a Buffer and send it as the response
  res.send(Buffer.from(pdfBytes));
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
