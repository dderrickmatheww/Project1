

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
        
       
  
   $("#add-vid").on("click", function(event) {
    event.preventDefault();
    console.log("yes")
    var input = $("#vid-input").val().trim() + " game trailer"  
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ input + "&key=AIzaSyAhsb0OUjYC9-im6U3pNoks26zkjBWUtHo"
    $("#player").empty()
 $.ajax({
         url: url,
      method: "GET"
        }).then(function (response) {

           var videoId = response.items[0].id.videoId
           console.log(videoId)

            iFrame = $("<iframe id='ytplayer' type='text/html' width='640' height='360'src='https://www.youtube.com/embed/" + videoId + "?autoplay=0' frameborder='0'>")
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
                   
                   var name = $("<h1>")

                   name.append(author)
                   
                   var commentBox = $("<div>")
                   
                   var authorPic = $("<img src='" + authorImg + "'>")
                   
                    console.log(authorPic)

                    commentBox.append(name)
                    commentBox.append(authorPic)
                    commentBox.append(comments)
                    
                    $("#player").append(commentBox)
                }





            })



        })
    })