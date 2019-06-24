import React from 'react';
import request from 'request';

const subscriptionKey = '31c5082e88ae4447a14da37ba0e6efbc';
const searchTerm = `lebron james headshot`;

const info = {
   url: `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="${searchTerm}"`,
   headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
   },
};

const ImageURL = request(info, function(error, response, body) {
   const searchResponse = JSON.parse(body);
   return searchResponse.value[0].contentUrl;
   // for (let i = 0; i < searchResponse.webPages.value.length; ++i) {
   //    const webPage = searchResponse.webPages.value[i];
   //    console.log(`name: ${webPage.name}`);
   //    console.log(`url: ${webPage.url}`);
   //    console.log(`displayUrl: ${webPage.displayUrl}`);
   //    console.log(`snippet: ${webPage.snippet}`);
   //    console.log(`dateLastCrawled: ${webPage.dateLastCrawled}`);
   //    console.log();
   // }
});

export default ImageURL;
