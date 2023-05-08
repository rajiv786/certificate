const express = require('express');
const { jsPDF } = require('jspdf');
const app = express();
const cors = require('cors');
const base64Img = require('base64-img');
app.use(cors({}));

app.get('/api/generate-pdf', async(req, res) => {
  // Load the PNG image as a base64-encoded string
  const userData = await User.findById(req.body.user._id)
  const backgroundImage = base64Img.base64Sync('./check1.png');
const images= base64Img.base64Sync('./rajiv.png')
  // Create a new PDF document
  const doc = new jsPDF({
	orientation: 'landscape',
	unit: 'px',
	format: [350, 500],
  });
  var imgWidth = images.width;
  var imgHeight = images.height;
  
  // Get the dimensions of the page
  var pageWidth = doc.internal.pageSize.getWidth();
  var pageHeight = doc.internal.pageSize.getHeight();
  
  // Calculate the center point of the page
  var centerX = pageWidth / 2;
  var centerY = pageHeight / 2;
  
  // Calculate the position of the image to center it
  var imgX = centerX - (imgWidth / 2);
  var imgY = centerY - (imgHeight / 2);
  // Add the PNG image as a background image
  doc.addImage(backgroundImage, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, undefined, 'FAST');
   // Set the opacity of the image
doc.addImage(images, 'PNG',doc.internal.pageSize.width/2,20)
  // Add the certificate text
  doc.setFontSize(30);
  doc.setTextColor('#000000'); // Set the text color to white
  doc.text('Certificate of Completion', doc.internal.pageSize.width / 2, 100, { align: 'center' });
  doc.setFontSize(16);
	text = `This is to certify that ${userData.Name} successfully completed the course Writing Skills by Kevin Missal from Hubhawks MasterClass`
	const lines = doc.splitTextToSize(text, doc.internal.pageSize.width/1.35 , { align: 'center' });
	doc.text(lines, 50, 150);
  doc.setFontSize(12);
  var currentDate = new Date();

  // Format the date as a string in the desired format
  var dateString = currentDate.toLocaleDateString('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
  });
  
  // Add the formatted date string to the document
  doc.text(`Given on: ${dateString}`, 50, 250, { align: 'left' });
	doc.text('Kevin Missal',doc.internal.pageSize.width - 50, 220, { align: 'right' });	
  
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
app.get('/api/generate-pdfG', async(req, res) => {
	// Load the PNG image as a base64-encoded string
	
	const backgroundImage = base64Img.base64Sync('./check1.png');
  const images= base64Img.base64Sync('./rajiv.png')
	// Create a new PDF document
	const doc = new jsPDF({
	  orientation: 'landscape',
	  unit: 'px',
	  format: [350, 500],
	});
	var imgWidth = images.width;
	var imgHeight = images.height;
	
	// Get the dimensions of the page
	var pageWidth = doc.internal.pageSize.getWidth();
	var pageHeight = doc.internal.pageSize.getHeight();
	
	// Calculate the center point of the page
	var centerX = pageWidth / 2;
	var centerY = pageHeight / 2;
	
	// Calculate the position of the image to center it
	var imgX = centerX - (imgWidth / 2);
	var imgY = centerY - (imgHeight / 2);
	// Add the PNG image as a background image
	doc.addImage(backgroundImage, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, undefined, 'FAST');
	 // Set the opacity of the image
  doc.addImage(images, 'PNG',doc.internal.pageSize.width/2,20)
	// Add the certificate text
	doc.setFontSize(30);
	doc.setTextColor('#000000'); // Set the text color to white
	doc.text('Certificate of Completion', doc.internal.pageSize.width / 2, 100, { align: 'center' });
	doc.setFontSize(16);
	  text = `This is to certify that ${req.body.user1.name} successfully completed the course Writing Skills by Kevin Missal from Hubhawks MasterClass`
	  const lines = doc.splitTextToSize(text, doc.internal.pageSize.width/1.35 , { align: 'center' });
	  doc.text(lines, 50, 150);
	doc.setFontSize(12);
	var currentDate = new Date();
  
	// Format the date as a string in the desired format
	var dateString = currentDate.toLocaleDateString('en-US', {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric'
	});
	
	// Add the formatted date string to the document
	doc.text(`Given on: ${dateString}`, 50, 250, { align: 'left' });
	  doc.text('Kevin Missal',doc.internal.pageSize.width - 50, 220, { align: 'right' });	
	
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
