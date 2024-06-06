/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const cors = require('cors')
const aws = require('aws-sdk')
aws.config.region = 'ap-south-1';
var lambda = new aws.Lambda();

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cors())

const options = { useNewUrlParser: true, useUnifiedTopology: true };

/**********************
 * Example get method *
 **********************/

app.get('/', function(req, res) {
  // Add your code here
  res.send({"message": "call succeed from API!!"});
});

app.get('/test', function(req, res){
  res.json({message: "Test successful"});
});

app.get('/trigger/:name', function(req, res){
    const name = req.params.name;
    try {
        var params = {
            FunctionName: 'trigger-function', // the lambda function we are going to invoke
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
            Payload: JSON.stringify({ num1: 10, num2: 20 })
          };
        
          lambda.invoke(params, function(err, data) {
            if (err) {
              res.json({message: err});
            } else {
              response = JSON.parse(data.Payload);
              res.json({
                code: 200,
                message: "Succesfully fetched",
                body: response
              });
            }
        })
    } catch (error) {
        console.log(error);
        res.json({message: error.toString()});
    }
    // res.json({message: "Triggered another function"});
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app