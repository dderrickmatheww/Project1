


function showGame() {
    var search = $("#search").val()
    var queryURL = "https://www.giantbomb.com/api/game/" + search + "/?api_key=c2c64e82858ba8a5c69f7ab7ba0e292b74922a05"

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        var results = response.data;
        console.log(results)


    });
}


function showNews() {

    var search = $("#search").val()
    var queryURL = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?key=8DE99AE2B5D2AF27855C6E9EA76CEEB6&appid=" + search + "&count=3&maxlength=300&format=json"

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function (response) {
        var results = response.data;
        console.log(results)
        for (var i = 0; i < results.length; i++) {

            var item = results[i];
            var newsCard = $("<div>");
            newsCard.addClass("news-card clearfix border-top-0");

            var article = $("<div>")
            article.addClass("article")

            var hl = $("<h3>")
            hl.addClass("title pt-2 pl-3 headline")
            hl.html(results.newsItems.title)
            h1.attr("src", results.newsItems.url)

            var artbody = $("<h2>");
            artbody.addClass("info-desc lead")
            artbody.html(results.newsItems.contents)
            p.text("Rating: " + rate);

            newsCard.append(article)
            newsCard.append(hl)
            newsCard.append(artbody)

            $("#news").prepend(newsCard);
        }
    });
}


$(".yt-pop").on("click", function (event) {
    event.preventDefault();
    console.log("yes")
    var input = $("#search").val().trim() + " game trailer"
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + input + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"
    $("#player").empty()
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {

        var videoId = response.items[0].id.videoId
        console.log(videoId)

        iFrame = $("<iframe id='ytplayer' type='text/html' width='640' height='360'src='https://www.youtube.com/embed/" + videoId + "?autoplay=0' frameborder='0'>")
        iFrame.addClass("frameBorder")

        // var vidCats = [];





        // $("#add-vid").on("click", function(event) {
        //     event.preventDefault();
        //     console.log("yes")

        //     var queryURL = "https://newsapi.org/v2/top-headlines?sources=ign&apiKey=f38cc49da4df4fd0b9ceea723e83cb15"

        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        //       }).then(function (response) {
        //                 console.log(response)
        //                 var results = response.articles;
        //                 console.log(results)

        //                 for (var i = 0; i < results.length; i++) {

        //                     var title = results[i].title;
        //                     var author = results[i].author;
        //                     var image = results[i].urlToImage;
        //                     var description = results[i].description
        //                     var content = results[i].content
        //                     var url = results[i].url

        //                     //varibles
        //                     var vidDiv = $("<div class='float-left text-center'>");
        //                     //grabs rating and sets it to a paragraph tag
        //                 if(title){
        //                     var h1 = $("<h1>").text(title)
        //                     vidDiv.append(h1);
        //                 }
        //                 if(image){
        //                     var personImage = $("<img>");
        //                     personImage.attr("src", image);
        //                     vidDiv.append(personImage);
        //                 }
        //                 if(author){
        //                     var p2 = $("<p>").html("<h2>Author:</h2> " + author)
        //                     vidDiv.append(p2);
        //                 }
        //                 if(description){
        //                     var p1 = $("<p>").html("<h2>Description:</h2> " + description);
        //                     vidDiv.append(p1);
        //                 }
        //                 if(content){
        //                     var p3 = $("<p>").html("<h2>Article:</h2> " + content +" " + "<a href='" + url + "'> Read more </a>");
        //                     vidDiv.append(p3)

        //                 } else{
        //                   var p1 = $("<p>").html("<h2>Description:</h2> " + description +" " + "<a href='" + url + "'> Read more </a>")
        //                 }

        //                 $("#add-vid").attr("data-person", vidCats[i])
        //                 $("#player").append(vidDiv);
        //                 }
        //             });

        //         });



        
        })

    })





