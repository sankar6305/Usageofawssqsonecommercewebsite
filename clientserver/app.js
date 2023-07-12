const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
var path = require('path');
var public = path.join(__dirname, 'public');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', express.static(public));

//AWS configurations
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION'
});


// Initialize SQS client
const sqs = new AWS.SQS();


// Define routes
app.get('/', (req, res) => {
    //how to send an html file
    res.render('index');

});

app.get('/checkout/:id', (req, res) => {
    console.log("ready browser");
    //how to send a json response
    const params = {
        MessageBody: req.params.id,
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue'
        //fake url
    };

    console.log(req.params.id);
    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error('Error sending message to SQS:', err);
            res.status(500).json({ error: 'Failed to process order' });
        } else {
            console.log('Message sent to SQS:', data.MessageId);
            res.json({ message: 'Order placed successfully' });
        }
    });
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
