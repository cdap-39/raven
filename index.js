var request = require('request');

// Query latest news
request('http://35.237.151.220:8081/api/news/1h', function (error, response, body) {
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var raw_data = body;

  // Categorize (pre-defined)
  request.post({url:'http://35.237.151.220:9000/',raw_data}, function(err,httpResponse,body){
    var categorized_news = body;

    // Abstract topic modelling
    request.post({url:'http://35.237.151.220:8082/process',categorized_news}, function(err,httpResponse,body){
        var categorized_news = body;

        // Flag violations of media ethics
        request.put({url:'http://35.237.151.220:5001/validate', categorized_news}, function(err,httpResponse,body){
            var validated_data = bpdy;

            // Upsert processed news
            request.put({url:'http://35.237.151.220:8081/api/processed_news',validated_data}, function(err,httpResponse,body){
                console.log('Processing completed...')
            });
            console.log('Processing completed...')
        });

    });
  });
});