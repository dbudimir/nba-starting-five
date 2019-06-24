import request from 'request';
import Search from './components/Search';

console.log(Search);

const subscriptionKey = '31c5082e88ae4447a14da37ba0e6efbc';
const customConfigId = '9c4041c7-3ed6-47fa-96d3-56ee75c8d581';
const searchTerm = `${Search.state.searchInput} headshot`;

const info = {
   url: `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="${searchTerm}"`,
   headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
   },
};

const imageURL = request(info, function(error, response, body) {
   const searchResponse = JSON.parse(body);
   return searchResponse.value[0].contentUrl;
   // console.log(searchResponse);
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

export default imageURL;
