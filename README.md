## Starting Five - NBA Lineup Creator

This repo represents the front end of the Starting Five - NBA Lineup Creator. Read more read about the associated API [here.](https://github.com/ellisonr/api-nba-starting-five).

This simple app allows users to create an account, login, create a list of 5 players as part of a unique lineup. Users will be able to share their top players for any niche category they choose. For example, top 5 best dunkers, Canadian players, best all time Lakers etc.

![enter image description here](https://www.budimir.dev/starting-five-img.png)

### **Features**

**Authentication**: Users can signup and login. The app will keep their login token until they have clicked the lockout button. The nav bar is dynamically populated so that logged in users will see differnt options in the menu than users that are not loggedin. A users email and pasword must be valid in order to login.

**Player Search**: We reference two public APIs as well as our API to make it possible for users to search a list of all NBA players from any era.

Step 1: Search the players name in our API
Step 2: If player is not found search for player name in the **NBA Stats** public API.
Step 3: Get player ID from **NBA Stats** public API and make a new request to get that players career stats.
Step 4: Make a request to **Microsoft Bing** to get the first image result for the users search term.
Step 5: Push the player image and carreer stats to our database so that in the future we're not relying on public APIs.

```
if (playerInDB.length === 0) {
         publicPlayerList.filter(player => {
            if (
               changeCase.lowerCase(player.playerFullNameLowerCase) ===
               changeCase.lowerCase(this.state.searchInput)
            ) {
               const subscriptionKey = '31c5082e88ae4447a14da37ba0e6efbc';
               const searchTerm = player.playerFullNameLowerCase;
               const info = {
                  url: `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q="${searchTerm}"`,
                  headers: {
                     'Ocp-Apim-Subscription-Key': subscriptionKey,
                  },
               };
               axios
                  .get(
                     `https://stats.nba.com/stats/commonplayerinfo/?PlayerId=${player.playerID}&SeasonType=Regular+Season&LeagueId=00`
                  )
                  .then(res => {
                     request(
                        info,
                        function(error, response, body) {
                           const searchResponse = JSON.parse(body);
                           const playerStats = {
                              playerID: res.data.resultSets[1].rowSet[0][0],
                              playerName: res.data.resultSets[1].rowSet[0][1],
                              careerPPG: res.data.resultSets[1].rowSet[0][3],
                              careerAPG: res.data.resultSets[1].rowSet[0][4],
                              careerRPG: res.data.resultSets[1].rowSet[0][5],
                              yearsActive: res.data.resultSets[0].rowSet[0][12],
                              playerImage: searchResponse.value[0].contentUrl,
                           };
                           axios
                              .post(
                                 'https://nba-starting-five.herokuapp.com/api/players/new',
                                 playerStats
                              )
                              .then(() => {
                                 this.getPlayersFromDB('newplayer');
                              });
                        }.bind(this)
                     );
                  });
            }
```

**Create a Lineup**: Users can give a custom name and add players to their lineup. If they make a mistake, they have the option to undo the layer they added.

**My Lineups**: If a user is logged in they can see a list of the lineups they created.

### **Site Structure**

-  **Navigation** - **Login**: User can login to an existing account. - **My Lineups**: After a user has logged in they can see a list of their existing lineups. - **Signup**: Allows a new user to sign up. - **Create a Lineup**: A two step flow that allows a user to create their lineup. If a user is not logged in they will be prompted to login before they can create a lineup.
-  **Home**: A feed of recent line.ups submitted by users.

### **Dependencies**

-  "axios": "^0.19.0",
-  "babel-eslint": "10.0.1",
-  "change-case": "^3.1.0",
-  "react": "^16.8.6",
-  "react-dom": "^16.8.6",
-  "react-router": "^5.0.1",
-  "react-router-dom": "^5.0.1",
-  "react-scripts": "3.0.1",
-  "request": "^2.88.0",
-  "styled-components": "^4.3.2"

### **Technologies Used**

**Javascript**
**React**
**Styled Components**
**Bing Search API**

#### Contribution Guidelines

Fork and clone this repo, contribute from a new branch.

-  Deployed App: [[https://earsplitting-account.surge.sh/](https://earsplitting-account.surge.sh/)]
-  API: [https://nba-starting-five.herokuapp.com/api/players/](https://nba-starting-five.herokuapp.com/api/players/)
-  This Repository: [[https://github.com/dbudimir/nba-starting-five/tree/master/src/components](https://github.com/dbudimir/nba-starting-five/tree/master/src/components)]
-  Issue tracker: [[https://github.com/dbudimir/nba-starting-five/issues](https://github.com/dbudimir/nba-starting-five/issues)]

Contact me: [dav.budimir@gmail.com](mailto:dav.budimir@gmail.com)
