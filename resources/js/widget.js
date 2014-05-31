$(function() {
  React.renderComponent(
    WCup.Components.GoalKeeper.Widget({}), 
    document.getElementById('goalkeeper'));
});
function statusChangeCallback(response) {
  if (response.status === 'connected') {
    $('.fb_iframe_widget').hide();
    testAPI();
  } else {
    $('#status').text('Please log into this app.');
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '526580450786887',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  FB.api('/me', function(response) {
    console.log(response);
    $('#status').text('Thanks for logging in, ' + response.name + '!');
  });
  FB.api("/me/picture", function (response) {
    if (response && !response.error) {
      console.log(response);
    }
  });
}

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));