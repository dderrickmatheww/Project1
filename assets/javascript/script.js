//************************************************************************************************************************************************************************************ */
//NEWS API FOR OUR NEWS DROP DOWN
//************************************************************************************************************************************************************************************ */
$("#news").hide()
$(".game-card").hide()
$('#player').hide()
$(".loading").hide()

$(".news-pop").on("click", function (event) {
  event.preventDefault();
  $("#player").empty();
  $("#player").show()

  var input = $("#search").val();
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
      var newsDiv = $("<div class='float-left text-center'>");

      if (title) {
        var h1 = $("<h3>").text(title);
        newsDiv.append(h1);
      }
      if (image) {
        var personImage = $("<img>");
        personImage.attr("src", image);
        personImage.addClass("img-thumbnail")
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
//GAINT BOMB API USED FOR GRABBING THE PROFILE OF THE GAME INCLUDING THE DISCRIPTION, PROFILE PIC, RELEASE DATE.
//****************************************************************************************************************************************************************************************** */

$("#search-btn").on("click", function (event) {
  event.preventDefault();
  $(".loading").show();
  setTimeout(function() { $(".loading").hide(); }, 4000);
  
  var input = $("#search").val();
  $("#player").empty();
  $('#player').hide()
  $(".game-card").show()
  $('.instruct').hide()
  $("#news").hide()
  
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: 'http://www.giantbomb.com/api/search/?format=jsonp&api_key=99ec1d8980f419c59250e12a72f3b31d084e9bf9&query=' + input + "&resources=game"
  }).then(function (data) {
    results = data.results
    console.log(results)
    var name = results[0].name
    var image = results[0].image.medium_url
    var description = results[0].deck
    var releaseDate = results[0].original_release_date
    var nothere = " TBA"
 $(".fa-playstation").hide();
 $(".fa-steam").hide();
 $(".fa-xbox").hide();
 
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
    
    
      for(i = 0; i < 3; i++){
      var platforms = results[0].platforms[i]
    
      if (platforms.name === "Xbox One" || platforms.name === "Xbox 360" || platforms.name === "Xbox") {
        $(".fa-xbox").show();
      } 
      if (platforms.name === "PlayStation 4" || platforms.name === "PlayStation 3" || platforms.name === "PlayStation") {
        $(".fa-playstation").show();
      } 
      if (platforms.name === "PC") {
        $(".fa-steam").show();
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
  var input = $("#search").val() + " game trailer";
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + input + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"

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

      for (i = 0; i < results.length; i++) {

        var author = results[i].snippet.topLevelComment.snippet.authorDisplayName;
        var authorImg = results[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
        var comments = results[i].snippet.topLevelComment.snippet.textDisplay;

        var name = $("<h5>")

        name.append(author)

        var commentBox = $("<div class='container-fluid'>")
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

