 /**
 * @jsx React.DOM
 */
WCup = {};
WCup.Components = WCup.Components || {};
WCup.Components.GoalKeeper = _.extend(WCup.Components.GoalKeeper || {}, (function() {
  return {
    Row: React.createClass({
      render: function() {
        var get_flag = function(game) {
          if (game && game.prediction !== null) {
            var flags = {
              0: game.team0,
              1: game.team1,
              2: 'TIE'
            };
            return flags[game.prediction] || 'EMPTY'; 
          } else {
            return 'EMPTY';
          }
        };
        var score = this.props.user.score ? 
          Math.floor(this.props.user.score * 1.0 / this.props.user.games * 100) + '%' : 
          '--';
        var level = {
          0: 'novice',
          1: 'intermediate',
          2: 'expert'
        };
        var flag0 = 'flag-small flag0 ' + get_flag(this.props.user.predictions[0]);
        var flag1 = 'flag-small flag1 ' + get_flag(this.props.user.predictions[1]);
        var flag2 = 'flag-small flag2 ' + get_flag(this.props.user.predictions[2]);
        var flag3 = 'flag-small flag3 ' + get_flag(this.props.user.predictions[3]);
        var level_icon = 'http://local.brazil2014.reutersmedia.net:8000/images/small_expertise_' + level[this.props.user.level] + '.png';
        return (
          <tr className="row">
            <td className="position">
              <span className="rank">{this.props.user.rank}</span><br/>
              <span className="score">{score}</span>
            </td>
            <td className="name">
              <img className="profile-pic" width="30" height="30" src={this.props.user.picture_url}/>
              <div className="fullname">
                {this.props.user.first}<br/>{this.props.user.last}
              </div>
            </td>
            <td className="predictions">
                <span className={flag0}></span>
                <span className={flag1}></span>
                <span className={flag2}></span>
                <span className={flag3}></span>
            </td>
            <td className="expert-level last">
              <img src={level_icon}/>
            </td>
          </tr>
        );
      }
    }),

    Prediction: React.createClass({
      render: function() {
        console.log(this.props.prediction);
        return (
          <div className="my-prediction">
            
          </div>
        );
      }
    }),

    Top: React.createClass({
      render: function() {
        console.log('top');
        console.log(this.props.my_predictions);
        return (
          <div className="top-container">
            <img src='http://local.brazil2014.reutersmedia.net:8000/images/header.png'/>
            <div className="top">
              <div>
                <img className="my-profile-image" src={this.props.user.picture_url}/>
                <div className="my-name">{this.props.user.first} {this.props.user.last}</div>
              </div>
              <div>
                <div className="my-predictions">
                  <div className="predictions-title">Upcoming Matches</div>
                  <div className="predictions-subtitle">Chooase a winner</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }),

    Widget: React.createClass({
      render: function() {
        var Row = WCup.Components.GoalKeeper.Row;
        var Top = WCup.Components.GoalKeeper.Top;
        var top_predictors = this.props.users.map(function (user, index) {
            user.rank = index + 1;
            return <Row user={user} key={user.id}/>;
        }, this);
        return (
          <div>
            <Top user={this.props.user} my_predictions={this.props.my_predictions}/>
            <table>
              <thead>
                <tr>
                  <th className="rank">
                    Ranks / Points
                  </th>
                  <th className="name">
                    Name
                  </th>
                  <th className="predictions">
                    Next Picks
                  </th>
                  <th className="level last">
                    Expert Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {top_predictors}
              </tbody>
            </table>
          </div>
        );
      }
    })
  };
}()));