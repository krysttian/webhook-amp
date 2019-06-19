import { Handler, Context, Callback } from 'aws-lambda';
const R = require('ramda');
const URL = require('url').URL;
const request = require('request');

interface AmpIncomingResponse {
  statusCode: number;
  body: string;
}

interface AmpOutgoingRequest {
  body: string
}
// input request, expects a multi value query string with the key url, creates array of URLs and then makes those requests
const amp: Handler = async (event: any, context: Context, callback: Callback) => {
  const urlParamaterValues = R.path(['multiValueQueryStringParameters', 'url'], event);
  //check if query string contains values for URL key
  if (!urlParamaterValues){
    const emptyRequest = {
      statusCode: 401,
      body: JSON.stringify({
        message: "No Urls in Request, request query should look like /amp?url=url1.com&url=url2.net...."
      })    
    }
    callback('401', emptyRequest);
    return;
  }
  let uris;
  // attempts to parse and verify strings passed are valid URLs
  try {
    uris = urlParamaterValues.map((e) => new URL(e));
  } catch(e){
    const emptyRequest = {
      statusCode: 401,
      body: JSON.stringify({
        message: "Bads Urls in Request please review: https://url.spec.whatwg.org/#example-url-parsing"
      })    
    }
    console.dir(urlParamaterValues);
    callback('bad URLS', emptyRequest);
    return; 
  }
  
  const forwardMessage: AmpOutgoingRequest = {
    body: JSON.stringify({
      timeRecived: event.requestContext.requestTimeEpoch,
      timeProcessed: new Date().toUTCString(),
      data: event.body
    })
  };

  const arrayOfRequests = uris.map((e) => request.post(e.toString(), forwardMessage))

  const replies = await Promise.all(arrayOfRequests);

  const response: AmpIncomingResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: "processed and outgoing requests made",
      replies
    })
  }

  callback(undefined, response);
};

export { amp }