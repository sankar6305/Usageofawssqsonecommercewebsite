const AWS = require('aws-sdk');
const mysql = require('mysql');


AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION'
});


const connection = mysql.createConnection({
    host: 'YOUR_DATABASE_HOST',
    user: 'YOUR_DATABASE_USERNAME',
    password: 'YOUR_DATABASE_PASSWORD',
    database: 'YOUR_DATABASE_NAME'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to the database');
    }
});



const sqs = new AWS.SQS();


const processMessage = (message) => {
    const data = JSON.parse(message.Body);

    const query = `INSERT INTO orders VALUES (?)`;
    const values = [data];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error storing data in the database:', err);
        } else {
            console.log('Data stored in the database:', results);
        }
    });
};


const processMessages = () => {
    const params = {
        QueueUrl: 'YOUR_SQS_QUEUE_URL',
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20
    };

    sqs.receiveMessage(params, (err, data) => {
        if (err) {
            console.error('Error receiving messages from SQS:', err);
        } else if (data.Messages) {
            data.Messages.forEach((message) => {
                processMessage(message);

                // Delete the processed message from the SQS queue
                sqs.deleteMessage({
                    QueueUrl: 'YOUR_SQS_QUEUE_URL',
                    ReceiptHandle: message.ReceiptHandle
                }, (err) => {
                    if (err) {
                        console.error('Error deleting message from SQS:', err);
                    }
                });
            });
        }

        // Continue fetching and processing messages recursively
        processMessages();
    });
};

processMessages();
