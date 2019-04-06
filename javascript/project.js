$( document ).ready(function( getinitialGameData ) {
  // An array of shows, added shows will be pushed into this array;
  // ****Global variable Declaration Section**** 
  var localGameData = ""; // Variable that will hold all of the data from the API call for a game title
  var initialGameDataURL = "https://api.steampowered.com/IStoreService/GetAppList/v1/?key=8DE99AE2B5D2AF27855C6E9EA76CEEB6&include_games=true&include_dlc=false&include_hardware=false&include_software=false&include_video=false";
  var newGameData = "";
  var isData = false;
  // ****Function Declaration Section****
  
  // Function initiates the Ajax request to get all of the game titles from Steam on page load
  function getinitialGameData() {
    localGameData = localStorage.getItem("initialGameData");
    if (localGameData == "") { // If no localized game data is found then
      isData = false;
      console.log("Local data not available!");
    } else {
      isData = true;
      console.log("Local data found!");
      initialGameData = JSON.parse(localGameData);
    };
    // Make the Ajax call to get a new copy of the data anyway
    $.ajax({
        url: initialGameDataURL,
        method: "GET"
    })
    .then(function(response) {
      newGameData = response;
      console.log(newGameData); // console test to make sure something returns
      if (isData == false){ // We now need to save the initial Game Data to local storage
      localStorage.setItem("initialGameData",newGameData);
      console.log(window.localStorage.initialGameData); // check what was stored
      } else {
        localStorage.clear();
        var initialGameData = response.data.parse(); //save the response for the Ajax call as initialGameData
        if (initialGameDate === window.localStorage.getItem(initialGameData)) {
          console.log("Local data up to date!");
        } else {
          console.log("Local data not in sync!");
          localStorage.setItem(initialGameData);  // Update the locally stored copy of the response data
        };
      };
    });
  };

  getinitialGameData();

});  
