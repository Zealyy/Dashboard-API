function ajaxShowMovies(url, widget) {
    $.ajax({
        url: url,
        method: 'GET',
        contentType:'application/json',
        success: function(result){
            $(widget).html("");
            movieItems = result["results"];
            if(movieItems[0] === undefined && widget == "#widgetMoviesByPopularity"){
                $(widget).html("<p style='color: red'>These are not valid dates, recheck what you wrote</p>");
            }
            else if(movieItems[0] === undefined && widget == "#widgetSearchMovies"){
                $(widget).html("<p style='color: red'>Found nothing</p>");
            }
            else{
                for (var i=0; i<=5; i++) {
                    $(widget).append("<div class='movie' style='text-align: center'>\
                                                                <h3><strong>"+ movieItems[i]["original_title"] +"</strong></h3><p> (Realeased on the "+ movieItems[i]["release_date"] +")</p>\
                                                                <img class='img-fluid img-thumbnail' style='width: 20%'\
                                                                src='https://image.tmdb.org/t/p/w500/"+ movieItems[i]["poster_path"]+"'>\
                                                                <p style='box-sizing: border-box'>"+ movieItems[i]["overview"] +"</p>\
                                                            </div>\
                                                            <hr>");
                }
            }
            
        
        },
        error: function(error){
            
            console.log("error");
            console.log(error.HEADERS_RECEIVED)
        }
    });
}

$("body").on("click","#getMoviesByPopularity", function(){
    self = $(this).parent()
    ajaxShowMovies("/api/movies/getByPopularity?high-date=" + self.find("#high-date").val()+"&bottom-date="+ self.find("#bottom-date").val(),self.find("#widgetMoviesByPopularity"))
});

$("body").on("click","#btnSearchMovies",function(){
    self = $(this).parent();
    ajaxShowMovies("http://api.themoviedb.org/3/search/movie?api_key=56c9f82dd80939aa8dc40cb237a222e9&query="+self.find("#inputSearchMovies").val(), self.find("#widgetSearchMovies"));
})