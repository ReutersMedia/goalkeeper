(function(id){
  var js,
      fjs = document.getElementsByTagName('script')[0];
      if (!document.getElementById(id)) {
        js = document.createElement('script');
        js.id = id;
        js.src= "http://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
}("twitter-wjs"));