$( document ).ready(function() {
  console.log(ofToc);

  var options = {
    keys: ['name'],
    threshold: 0.15
  };
  var f = new Fuse(ofToc, options);
  var lastTerm = "";

  var searchResult = [];

  var search = function(term){
    if(term != lastTerm) {
      selectedIndex = -1;
      searchResult = f.search(term);

      var searchElm = $('.searchResult');
      searchElm.html("");

      if (searchResult.length == 0) {
        searchElm.addClass("hidden")
      } else {
        searchElm.removeClass("hidden")
      }



      _.first(searchResult,10).forEach(function (res) {
        var el = $('<li>');
        var link = $('<a href="' + res.ref + '">');

        el.append(link);

        link.append('<p class="searchName">' + res.name + '</p>');
        link.append('<span class="searchType">' + res.type + '</span>');
        searchElm.append(el)
      });

      lastTerm = term;
    }
  };


  var sElm =$("#search");
  sElm.keyup(function() {
    search($(this).val());
  });

  if(sElm.val() != ""){
    search(sElm.val());
  }


  // Keyboard navigation

  var selectedIndex = -1;
  $("body").on("keydown", function(e) {
    if(e.keyCode === 38) {
      // up
      selectedIndex--;
    }
    else if(e.keyCode === 40) {
      // down
      selectedIndex++;
    } else if(e.keyCode === 13) {
      // enter
      if(selectedIndex>=0){
        window.location.href = searchResult[selectedIndex].ref;
      }
    } else {
      return;
    }
    $('.searchResult > .selected').removeClass('selected');

    $('.searchResult > li').eq(selectedIndex).addClass('selected');

  });

});
