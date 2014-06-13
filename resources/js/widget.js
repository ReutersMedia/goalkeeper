$(function() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '526580450786887',
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.0' // use version 2.0
    });
    FB.getLoginStatus(function(response) {
      WCup.facebook.status_change_callback(response);
    });
  };
  // load facebook api
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});

WCup.API = {
  base_url: 'http://local.brazil2014.reutersmedia.net:30000',
  update_user_info: function(user_info) {
    var user_info = _.extend({
      country: '',
      player: '',
      level: 0
    }, user_info);
    console.log(user_info);
    return $.post(this.base_url + '/goalkeeper/users/' + user_info.id, user_info)
      .fail(_.bind(function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }, this))
      .done(_.bind(function(resp) {
      }, this));
  },
  get_current_time: function() {
    return moment().format('YYYY-MM-DD HH:mm:ss')+'-0400';
  },
  get_tommorow_time: function() {
    return moment().add('h', 26).format('YYYY-MM-DD HH:mm:ss')+'-0400';
  },
  get_top_predictors: function(limit) {
    var from = this.get_current_time();
    var to = this.get_tommorow_time();
    return $.getJSON(this.base_url + '/goalkeeper/users?from='+from+'&to='+to+'&limit=' + limit)
      .fail(_.bind(function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }, this));
  },
  get_my_info: function(user_info) {
    return $.getJSON(this.base_url + '/goalkeeper/users/?from='+from+'&to='+to+'&limit=' + limit)
  }
};

WCup.facebook = {
  get_user_info: function(callback) {
    var user_info = null;
    var picture_url = null;
    var user_results = _.after(2, function() {
      if (user_info && picture_url) {
        callback(_.extend(user_info, { picture_url: picture_url}));
      } else {
        callback(null);
      }
    });
    FB.api('/me', function(response) {
      if (response && !response.error) {
        user_info = {
          first: response.first_name,
          last: response.last_name,
          id: response.id
        };
        user_results();
      } else {
        console.error(response);
        user_results();
      }
    });
    FB.api("/me/picture", function (response) {
      if (response && !response.error) {
        picture_url = response.data.url;
        user_results();
      } else {
        console.error(response);
        user_results();
      }
    });
  },
  status_change_callback: function (response) {
    var create_widget = function(user) {
      WCup.API.get_top_predictors(10).done(function(predictors) {
        var Widget = WCup.Components.GoalKeeper.Widget;
        if (user) {
          var my_predictions;
          _.each(predictors, function(predictor, index) {
            if(predictor.id === parseInt(user.id)) {
              my_predictions = _.extend({ rank: index + 1}, predictor);
            }
          });
        }
        React.renderComponent(
          Widget({
            users: _.first(predictors,5), 
            user: user,
            my_predictions: my_predictions
          }), 
          document.getElementById('goalkeeper')
        );
      });
    };
    if (response.status === 'connected') {
      this.get_user_info(function(user_info) {
        WCup.API.update_user_info(user_info);
        create_widget(user_info);
      });
    } else {
      create_widget();
    }
  },
  check_login_state: function() {
    FB.getLoginStatus(_.bind(function(response) {
      this.status_change_callback(response);
    },this));
  }
};