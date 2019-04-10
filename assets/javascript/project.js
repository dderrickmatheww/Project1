// ****************************************************************************************************************************************************************************************** */
// HOMEPAGE NEWS ARTICLES/ LATEST NEWS IN THE MEDIA WORLD FROM IGN
// ****************************************************************************************************************************************************************************************** */

$( document ).ready(function() {
  
  console.log("yes");

  var queryURL =
    "https://newsapi.org/v2/top-headlines?sources=ign&apiKey=f38cc49da4df4fd0b9ceea723e83cb15";

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
        var h1 = $("<h1 id='pic'>").text(title);
        vidDiv.append(h1);
      }
      if (image) {
        var personImage = $("<img class='img-thumbnail article-img2 mr-4'>");
        personImage.attr("src", image);
        vidDiv.append(personImage);
      }
      if (author) {
        var p2 = $("<p class='info-desc'>").html("<h2>Author:</h2> " + author);
        vidDiv.append(p2);
      }
      if (description) {
        var p1 = $("<p class='info-desc'>").html("<h2>Description: </h2> " + description);
        vidDiv.append(p1);
      }
      if (content) {
        var p3 = $("<p class='info-desc'>").html(
          "<h2>Article:</h2> " +
            content +
            " " +
            "<a href='" +
            url +
            "'> Read more </a>"
        );
        vidDiv.append(p3);
      } else {
        var p1 = $("<p class='info-desc'>").html(
          "<h2>Description:</h2> " +
            description +
            " " +
            "<a href='" +
            url +
            "'> Read more </a>"
        );
      }

 
      $("#player").append(vidDiv);
    }
  });
});
$("#search-btn").on("click", function (event) {


  window.location.replace("index.html");

  
})
