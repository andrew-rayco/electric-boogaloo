var request = require('request')

console.log('My favourite is:')
request('http://ergast.com/api/f1/2017/5/driverStandings.json', (error, response, body) => {
    if (response.statusCode == 200) {
      var parsedData = JSON.parse(body)
      console.log(parsedData.MRData.StandingsTable.StandingsLists[0].DriverStandings[4].Driver.familyName)
    }
})


// General search:
// http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
//
// Search with Movie ID:
// http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 
