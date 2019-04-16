//************************************************************************************************************************************************************************************ */
//Global Variable Declarations for function transfers
//************************************************************************************************************************************************************************************ */
var lastComment = "";
var lastAuthor = "";
var game = "";
var gameExists;

//********************************************************************************************************************************************************************************* */
//Game Comments Display and Storage
//********************************************************************************************************************************************************************************* */
// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAmHvnWBuXY5SM6u8iw992av8ggO7ueVoA",
    authDomain: "hot-drop-fa9ff.firebaseapp.com",
    databaseURL: "https://hot-drop-fa9ff.firebaseio.com",
    projectId: "hot-drop-fa9ff",
    storageBucket: "hot-drop-fa9ff.appspot.com",
    messagingSenderId: "91907967407"
  };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// When a comment is added update the page
// database.ref().on("value", function(snapshot) {
//   console.log("DB updated!");
// });
var gameRef = firebase.database().ref('game');

$(".add-Comment").on("click", function (){
  console.log("Add comment clicked!");
  lastComment = $(".input-Comment").val().trim();
  lastAuthor = $(".comment-Author").val().trim();
  console.log(lastComment + "|" + lastAuthor);
  $(".input-Comment").empty();
  $(".comment-Author").empty();
  var game = $("#search").val().trim();
  gameExists = false;

  var ref = firebase.database().ref(game).once("value").then(function(snapshot) {
    gameExists = snapshot.child(game).exists();
    console.log("Existing" + gameExists);
  });
  console.log("Game: " + game);
  console.log("Existing" + gameExists);

  // If the comment is not blank
  if (lastComment != "") {
    // If the author field isn't blank
      if (lastAuthor != "") {
        //check and see if the game exists in Firebase.Database

          if (gameExists) {
            gameRef.child().push({
              comment: lastComment + "|" + lastAuthor

            });
          } else {
            // add the game and comment to the database
            database.ref().push(game);

            gameRef.child(game).push({
              comment: lastComment + "|" + lastAuthor
            });
          };
      } else {
        $(".comment-Input").text("Comments must have an author name!");
      };
    } else {
      $(".comment-Input").text("Please enter a comment!");
    };
  });



//************************************************************************************************************************************************************************************ */
//NEWS API FOR OUR NEWS DROP DOWN
//************************************************************************************************************************************************************************************ */
$("#news").hide()
$(".game-card").hide()
$('#player').hide()
$(".loading").hide()
$(".load").hide();
$(".ignArticles").show()
$(".row").hide()
$(".comments-Section").hide()

$(".news-pop").on("click", function (event) {
  event.preventDefault();
  $("#player").empty();
  $("#player").show()

  var input = $("h2.title.game-title.pt-2").text().split(' ').join('+');
  var articleURL = 'https://newsapi.org/v2/everything?sources=ign,polygon&language=en&q="' + input + '"&sortBy=relevancy&apiKey=f38cc49da4df4fd0b9ceea723e83cb15';

  $.ajax({
    url: articleURL,
    method: "GET"
  }).then(function (response) {
    var result = response.articles;
    console.log(result);

    for (var i = 0; i < result.length; i++) {
      var title = result[i].title;
      var author = result[i].author;
      var image = result[i].urlToImage;
      var descript = result[i].description;
      var url = result[i].url;
      var newsDiv = $("<div class='float-left float:right col-md-12'>");
      newsDiv.addClass("border-bottom")

      if (title) {
        var h1 = $("<h3>").text(title);
        newsDiv.append(h1);
      }
      if (image) {
        var personImage = $("<img>");
        personImage.attr("src", image);
        personImage.addClass("img-thumbnail news-image")
        newsDiv.append(personImage);
      }
      if (author) {
        var p2 = $("<p>").html("<h4>Author:</h4> " + author);
        newsDiv.append(p2);
      }
      if (descript) {
        var p1 = $("<p>").html("<h4>Description:</h4> " + descript + "<a href='" + url + "'> Read more </a>");
        newsDiv.append(p1);
      }
      $("#player").append(newsDiv)
      
    }
    
  })

})

//****************************************************************************************************************************************************************************************** */
//GIANT BOMB API USED FOR GRABBING THE PROFILE OF THE GAME INCLUDING THE DISCRIPTION, PROFILE PIC, RELEASE DATE.
//****************************************************************************************************************************************************************************************** */

$("#search-btn").on("click", function (event) {
  event.preventDefault();
  $(".bd-example").hide()
  $(".comments-Section").show();
  if ($("#search").val().trim() === ""){
    $(".form-control").val("");
    $(".form-control").attr("placeholder", "Please enter a game title");
    $(".form-control").addClass("red");

    return false;
  }
  $(".form-control").attr("placeholder", "Where we droppin'?");
  $(".form-control").removeClass("red");

  $(".ignArticles").hide()
  $(".loading").show();
  setTimeout(function() { $(".loading").hide(); }, 4000);
  $(".load").show();
  setTimeout(function() { $(".load").hide(); }, 4000);

  var input = $("#search").val();
  $("#player").empty();
  $('#player').hide()
  $(".game-card").show()
  $('.instruct').hide()
  $("#news").hide()

  $(".row").show()
  $(".comments-Section").show()
  
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9&query=' + input + "&resources=game"
  }).then(function (data) {
    results = data.results
    console.log(results)
    var name = results[0].name
    var image = results[0].image.medium_url
    var description = results[0].deck
    var releaseDate = results[0].original_release_date
    var nothere = " TBA"
 $(".fa-playstation").hide();
 $(".fa-windows").hide();
 $(".fa-xbox").hide();
 $(".fa-apple").hide();
 $(".fa-linux").hide();
 $(".fa-nintendo-switch").hide();
 $(".fa-app-store").hide();
 $(".fa-steam").hide();
 $(".fa-google-play").hide();
 
    for(i = 0; i < 1; i++){

    if(description){
    $(".info-desc").html(description);
    }
    if(image){
    $(".game-logo").attr("src", image)
    }
    if(releaseDate){
    
    $("#release").html(releaseDate.slice(-30, -9))
    }
    else{
      $("#release").html(nothere)
    }
    if(name){
      $(".game-title").html(name)
      }
    }
    
    
      for(i = 0; i < results[0].platforms.length; i++){
      var platforms = results[0].platforms[i]

      if (platforms.name === "PC") {
        $(".fa-windows").show();
      } 
      if (platforms.name === "Xbox One" || platforms.name === "Xbox 360" || platforms.name === "Xbox") {
        $(".fa-xbox").show();
      } 
      if (platforms.name === "PlayStation 4" || platforms.name === "PlayStation 3" || platforms.name === "PlayStation") {
        $(".fa-playstation").show();
      } 
      if (platforms.name === "Mac") {
        $(".fa-apple").show();
      } 
      if (platforms.name === "Linux") {
        $(".fa-linux").show();
      } 
      if (platforms.name === "Nintendo Switch") {
        $(".fa-nintendo-switch").show();
      } 
      if (platforms.name === "Android") {
        $(".fa-google-play").show();
      } 
      if (platforms.name === "iPhone" || platforms.name === "iPad") {
        $(".fa-app-store").show();
      } 
    }

  })
    //*********************************************************************************************************************************************************************************** */
    //IGN NEWS ARTICLE API FOR TOP TWO ARTICLES WHEN SEARCHING THE GAME
    //*********************************************************************************************************************************************************************************** */

 
  
  var input = $("#search").val();
  var articleURL = 'https://newsapi.org/v2/everything?sources=ign,polygon&language=en&q="' + input + '"&sortBy=relevancy&apiKey=f38cc49da4df4fd0b9ceea723e83cb15';

  $.ajax({
    url: articleURL,
    method: "GET"
  }).then(function (response) {
    var result = response.articles;
   
      if (response.totalResults != 0) {
        
        console.log(result);
        var title1 = result[0].title;
        var title2 = result[1].title;
        var author1 = result[0].author;
        var author2 = result[1].author;
        var image1 = result[0].urlToImage;
        var image2 = result[1].urlToImage;
        var descript1 = result[0].description;
        var descript2 = result[1].description;
        var url1 = result[0].url;
        var url2 = result[1].url;



        console.log("yes")
        if (title1) {
          $(".article-title1").html(title1);
        }
        if (title2) {
          $(".article-title2").html(title2);
        }
        if (author1) {
          $(".readmore1").html("<a href='" + url1 + "'> Read more </a>")
        }
        if (author2) {
          $(".readmore2").html("<a href='" + url2 + "'> Read more </a>")
        }
        if (descript1) {
          $(".info-desc1").html(descript1)
        }
        if (descript2) {
          $(".info-desc2").html(descript2)
        }
        if (author1) {
          $(".author1").html("Author: " + author1)
        }
        if (author2) {
          $(".author2").html("Author: " + author2)
        }
        if (image1) {
          $(".article-img1").attr("src", image1)
        }
        if (image2) {
          $(".article-img2").attr("src", image2)
        }
        $("#news").show()
      } 
      
     
    
  })
})




//********************************************************************************************************************************************************************************* */
//YOUTUBE API FOR EMBEDED VIDS AND COMMENTS
//********************************************************************************************************************************************************************************* */

$(".yt-pop").on("click", function (event) {
  event.preventDefault();
  $("#player").empty()
  $('#player').show()

  console.log("yes")
  var input = $("h2.title.game-title.pt-2").text().split(' ').join('+');
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + input + "+game+trailer" + "&type=video&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"

  $.ajax({
    url: url,
    method: "GET"
  }).then(function (response) {

    var videoId = response.items[0].id.videoId
    console.log(videoId)

    iFrame = $("<iframe id='ytplayer' class='container-fluid' type='text/html' width='640' height='360'src='https://www.youtube.com/embed/" + videoId + "?autoplay=0' frameborder='0'>")
    iFrame.addClass("frameBorder")
    $("#player").append(iFrame);



 var comment = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&moderationStatus=published&order=relevance&textFormat=html&videoId=" + videoId + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"


    $.ajax({
      url: comment,
      method: "GET"
    }).then(function (response) {

      results = response.items

      for (i = 0; i < 10; i++) {

        var author = results[i].snippet.topLevelComment.snippet.authorDisplayName;
        var authorImg = results[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
        var comments = results[i].snippet.topLevelComment.snippet.textDisplay;

        var name = $("<h5>")

        name.append(author)

        var commentBox = $("<div class='container-fluid'>")
        commentBox.addClass("border-bottom pb-3 comment border-info")

        var authorPic = $("<img src='" + authorImg + "'>")
        authorPic.addClass("border comment-pic mr-2")
        commentBox.append(name)
        commentBox.append(authorPic)
        commentBox.append(comments)

        $("#player").append(commentBox)


      }
    })
  })
})

// ****************************************************************************************************************************************************************************************** */
// HOMEPAGE NEWS ARTICLES/ LATEST NEWS IN THE MEDIA WORLD FROM IGN
// ****************************************************************************************************************************************************************************************** */

$( document ).ready(function() {
  
  console.log("yes");

  var queryURL ="https://newsapi.org/v2/top-headlines?sources=ign&apiKey=f38cc49da4df4fd0b9ceea723e83cb15";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.articles;
    console.log(results);

    for (var i = 0; i < results.length; i++) {
      var title = results[i].title;
      var author = results[i].author;
      var image = results[i].urlToImage;
      var description = results[i].description;
      var content = results[i].content;
      var url = results[i].url;

      //varibles
      var vidDiv = $("<div class='container float-left text-center vidDiv'>");
      //grabs rating and sets it to a paragraph tag
      if (title) {
        var h1 = $("<h2 id='pic'>").text(title);
        vidDiv.append(h1);
      }
      if (image) {
        var personImage = $("<img class='img-thumbnail article-img2 mr-4'>");
        personImage.attr("src", image);
        vidDiv.append(personImage);
      }
      if (author) {
        var p2 = $("<p class='info-desc'>").html("<h4>Author:</h4> " + author);
        vidDiv.append(p2);
      }
      if (description) {
        var p1 = $("<p class='info-desc'>").html("<h4>Description: </h4> " + description);
        vidDiv.append(p1);
      }
      if (content) {
        var p3 = $("<p class='info-desc'>").html(
          "<h4>Article:</h4> " +
            content +
            " " +
            "<a href='" +
            url +
            "'> Read more </a>"
        );
        vidDiv.append(p3);
      } else {
        var p1 = $("<p class='info-desc'>").html(
          "<h3>Description:</h3> " +
            description +
            " " +
            "<a href='" +
            url +
            "'> Read more </a>"
        );
      }

 
      $("#player2").append(vidDiv);
    }
  });
});