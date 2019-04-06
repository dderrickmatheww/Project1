

function showGame() {
    var search = $("#search").val()
    var queryURL = "https://www.giantbomb.com/api/game/" + search + "/?api_key=c2c64e82858ba8a5c69f7ab7ba0e292b74922a05"

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function(response) {
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

    }).then(function(response) {
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

    
$(".yt-pop").on("click", function(event) {
    event.preventDefault();
    console.log("yes")
    var input = $("#search").val().trim() + " game trailer"  
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ input + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"
    $("#player").empty()
    $.ajax({
            url: url,
        method: "GET"
        }).then(function (response) {

            var videoId = response.items[0].id.videoId
            console.log(videoId)

            iFrame = $("<iframe id='ytplayer' type='text/html' width='640' height='360'src='https://www.youtube.com/embed/" + videoId + "?autoplay=0' frameborder='0'>")
            iFrame.addClass("frameBorder")
            $("#player").append(iFrame)
            
            var comment = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&moderationStatus=published&order=relevance&textFormat=html&videoId=" + videoId + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"

            
            $.ajax({
                url: comment,
                method: "GET"
            }).then(function(response){

                results = response.items

                for(i = 0; i < results.length; i++ ){
                    var author = results[i].snippet.topLevelComment.snippet.authorDisplayName;
                    var authorImg = results[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
                    var comments = results[i].snippet.topLevelComment.snippet.textDisplay;
                    
                    var name = $("<h5>")

                    name.append(author)
                    
                    var commentBox = $("<div>")
                    commentBox.addClass("border-bottom comment border-info")

                    var authorPic = $("<img src='" + authorImg + "'>")
                    authorPic.addClass("border comment-pic mr-2")

                    console.log(authorPic)

                    commentBox.append(name)
                    commentBox.append(authorPic)
                    commentBox.append(comments)
                    
                    $("#player").append(commentBox)
                }
            })

        })
})