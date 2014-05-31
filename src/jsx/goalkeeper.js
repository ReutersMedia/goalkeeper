 /**
 * @jsx React.DOM
 */
WCup = {};
WCup.Components = WCup.Components || {};
WCup.Components.GoalKeeper = _.extend(WCup.Components.GoalKeeper || {}, (function() {
  return {
    Row: React.createClass({
      render: function() {
        return (
          <tr className="row">
            <td>
              <span className="rank">{this.props.rank}</span>
              <span className="score">{this.props.score}</span>
            </td>
            <td>
              <img className="profile-pic" src={this.props.profile_picture_url}/>
              <span className="first-name">{this.props.first_name}</span>
              <span className="last-name">{this.props.last_name}</span>
            </td>
            <td>
              <img className="first-pick" src={this.props.match_1_pick_url}/>
              <img className="second-pick" src={this.props.match_2_pick_url}/>
              <img className="third-pick" src={this.props.match_3_pick_url}/>
              <img className="forth-pick" src={this.props.match_4_pick_url}/>
            </td>
            <td>
              <img className="expert-level" src={this.props.expert_level}/>
            </td>
          </tr>
        );
      }
    }),

    Widget: React.createClass({
      render: function() {
        return (
          <table>
            <thead>
              <tr>
                <th>
                  Ranks &amp; Points
                </th>
                <th>
                  Name
                </th>
                <th>
                  Next Picks
                </th>
                <th>
                  Expert Level
                </th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        );
      }
    })
  };
}()));