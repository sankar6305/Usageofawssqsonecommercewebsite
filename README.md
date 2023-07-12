# Usageofawssqsonecommercewebsite

## We used aws sqs in the basic e-commerce website

 ->  Like if we get more order requests from the client side, our actual backend cannot process all the requests at once.
 That is where aws sqs can play a key role. It store all the requests in a queue and server will access one by one later
 
->   Like every request is sent to aws sqs and stored over there in a queue.

->   By clicking this buy product, we can send the request to sqs . And that requests are stored in a queue.

 ![image](https://github.com/sankar6305/Usageofawssqsonecommercewebsite/assets/58016341/bd5b70e1-dd94-443c-b492-e4746f57d656)


 -> After that our server will run and process each and every request one by one from aws sqs

 ->after that we are storing in our mysql databse.

 
 
