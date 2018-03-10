$(document).ready(function() {
  function Gify() {
    return {
      buttons : [],
      renderButtons : function() {
        var _this = this;
        $("#button-bar").html('');
        this.buttons.forEach((b, index) => { 
          
          $("#button-bar").append('<button id="btn' + index + '" type="button"  class="btn btn-primary m-2">' + b + '</button>');
          $("#btn" + index).on('click', function(evt) {
            _this.search(b);
          });
        });
      },
      get: function(q) {
        var queryURL =
        "https://api.giphy.com/v1/gifs/search?api_key=Oeh9PYrFZeBmJTsvfKUTzgXQmaGDUpv3&q=" + q +"&limit=10&offset=0&rating=G&lang=en";

        return $.ajax({
          url: queryURL,
          method: "GET"
        });
      },
      search: function(search) {
        console.log('searching');
        $(".x-marks-spot").html('');
        //$(".x-marks-spot").empty();

        gify.get(search).then(function(data){
          console.log(data);
          var list = data.data
            .map(s => { return { rating : s.rating, animated: s.images.fixed_height.url, still: s.images.fixed_height_still.url } })
            .forEach((o, index) => {
              var arr = [];
    
              
              arr.push('<div class="col-2" >');
    
              arr.push('<div class="card" >');
              arr.push('  <img class="card-img-top" src="' + o.still + '" alt="Card image cap" id="img' + index +'">');
              arr.push('  <div class="card-body">');
              arr.push('    <p class="card-text">Rating:' + o.rating +'</p>');
              arr.push('  </div>');
              arr.push('</div>');
    
              arr.push('</div>');


              $(".x-marks-spot").append(arr.join(''));
              $("#img" + index).on('mouseover', function(evt) {
                $(this).attr('src', o.animated);
              });
              $("#img" + index).on('mouseout', function(evt) {
                $(this).attr('src', o.still);
              });
            });
        }, function(err) {
          alert('Error getting data.');
        });;

      }
    };
  }

  var gify = new Gify();

  $("#home").on("click", function(evt) {
    gify.search('Hello')
  });

  gify.buttons = [ "hello", "world" ];
  gify.renderButtons();

  console.log("Game Initialized");
});
