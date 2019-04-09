//************************************************************************************************************************************************************************************ */
//NEWS API FOR OUR NEWS DROP DOWN
//************************************************************************************************************************************************************************************ */
$(".news-pop").on("click", function (event) {
  event.preventDefault();
  $("#player").empty();
  var input = $("#search").val();
  var articleURL = "https://newsapi.org/v2/everything?sources=ign&language=en&q=" + input + "&sortBy=popularity&apiKey=f38cc49da4df4fd0b9ceea723e83cb15";
  
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
      var newsDiv = $("<div class='float-left text-center'>");
      
      if (title) {
        var h1 = $("<h1>").text(title);
        newsDiv.append(h1);
      }
      if (image) {
        var personImage = $("<img>");
        personImage.attr("src", image);
        newsDiv.append(personImage);
      }
      if (author) {
        var p2 = $("<p>").html("<h2>Author:</h2> " + author);
        newsDiv.append(p2);
      }
      if (descript) {
        var p1 = $("<p>").html("<h2>Description:</h2> " + descript + "<a href='" + url + "'> Read more </a>");
        newsDiv.append(p1);
      }
      $("#player").append(newsDiv)
    }
  })
 
})

//****************************************************************************************************************************************************************************************** */
//GAINT BOMB API USED FOR GRABBING THE PROFILE OF THE GAME INCLUDING THE DISCRIPTION, PROFILE PIC, RELEASE DATE.
//****************************************************************************************************************************************************************************************** */

$("#search-btn").on("click", function (event) {
  event.preventDefault();
  var input = $("#search").val();
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'http://www.giantbomb.com/api/search/?format=jsonp&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9&query=' + input + "&resources=game"
  }).then(function (data) {
    results = data.results
    var name = results[0].name
    var image = results[0].image.medium_url
    var description = results[0].deck
    var releaseDate = results[0].original_release_date


    $(".info-desc").html(description);
    $(".game-title").html(name)
    $(".game-logo").attr("src", image)
    $("#release").html(releaseDate)

    for (i = 0; i < results[0].platforms[i].length; i++) {
      var platforms = results[0].platforms[i]
      if (platforms.name === "Xbox One" || platforms.name === "Xbox" || platforms.name === "Xbox 360") {

      } else {
        $(".fa-xbox").hide();

      }
      if (platforms.name === "Playstation" || platforms.name === "Playstation 4" || platforms.name === "Playstation 3") {

      } else {
        $(".fa-playstation").hide();
      }
      if (platforms.name === "PC") {

      } else {
        $(".fa-steam").hide();
      }
    }

//*********************************************************************************************************************************************************************************** */
//IGN NEWS ARTICLE API FOR TOP TWO ARTICLES WHEN SEARCHING THE GAME
//*********************************************************************************************************************************************************************************** */

  })
  var input = $("#search").val();
  var articleURL = "https://newsapi.org/v2/everything?sources=ign&language=en&q=" + input + "&sortBy=popularity&apiKey=f38cc49da4df4fd0b9ceea723e83cb15";

  $.ajax({
    url: articleURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var result = response.articles;
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
  })
})

//****************************************************************************************************************************************************************************************** */
//HOMEPAGE NEWS ARTICLES/ LATEST NEWS IN THE MEDIA WORLD FROM IGN
//****************************************************************************************************************************************************************************************** */

// $("#add-vid").on("click", function(event) {
//   event.preventDefault();
//   console.log("yes");

//   var queryURL =
//     "https://newsapi.org/v2/top-headlines?sources=ign&apiKey=f38cc49da4df4fd0b9ceea723e83cb15";

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     var results = response.articles;
//     console.log(results);

//     for (var i = 0; i < results.length; i++) {
//       var title = results[i].title;
//       var author = results[i].author;
//       var image = results[i].urlToImage;
//       var description = results[i].description;
//       var content = results[i].content;
//       var url = results[i].url;

//       //varibles
//       var vidDiv = $("<div class='float-left text-center'>");
//       //grabs rating and sets it to a paragraph tag
//       if (title) {
//         var h1 = $("<h1>").text(title);
//         vidDiv.append(h1);
//       }
//       if (image) {
//         var personImage = $("<img>");
//         personImage.attr("src", image);
//         vidDiv.append(personImage);
//       }
//       if (author) {
//         var p2 = $("<p>").html("<h2>Author:</h2> " + author);
//         vidDiv.append(p2);
//       }
//       if (description) {
//         var p1 = $("<p>").html("<h2>Description:</h2> " + description);
//         vidDiv.append(p1);
//       }
//       if (content) {
//         var p3 = $("<p>").html(
//           "<h2>Article:</h2> " +
//             content +
//             " " +
//             "<a href='" +
//             url +
//             "'> Read more </a>"
//         );
//         vidDiv.append(p3);
//       } else {
//         var p1 = $("<p>").html(
//           "<h2>Description:</h2> " +
//             description +
//             " " +
//             "<a href='" +
//             url +
//             "'> Read more </a>"
//         );
//       }

//       $("#add-vid").attr("data-person", vidCats[i]);
//       $("#player").append(vidDiv);
//     }
//   });
// });



//********************************************************************************************************************************************************************************* */
//YOUTUBE API FOR EMBEDED VIDS AND COMMENTS
//********************************************************************************************************************************************************************************* */

$(".yt-pop").on("click", function (event) {
  event.preventDefault();
  $("#player").empty()
  console.log("yes")
  var input = $("#search").val() + " game trailer";
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + input + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"
  
  $.ajax({
    url: url,
    method: "GET"
  }).then(function (response) {

    var videoId = response.items[0].id.videoId
    console.log(videoId)

    iFrame = $("<iframe id='ytplayer' type='text/html' width='640' height='360'src='https://www.youtube.com/embed/" + videoId + "?autoplay=0' frameborder='0'>")
    iFrame.addClass("frameBorder")
    $("#player").append(iFrame);



    var comment = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&moderationStatus=published&order=relevance&textFormat=html&videoId=" + videoId + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"


    $.ajax({
      url: comment,
      method: "GET"
    }).then(function (response) {

      results = response.items

      for (i = 0; i < results.length; i++) {

        var author = results[i].snippet.topLevelComment.snippet.authorDisplayName;
        var authorImg = results[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
        var comments = results[i].snippet.topLevelComment.snippet.textDisplay;

        var name = $("<h5>")

        name.append(author)

        var commentBox = $("<div>")
        commentBox.addClass("border-bottom comment border-info")

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

