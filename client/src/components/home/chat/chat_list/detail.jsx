import React from 'react';
import { withRouter } from 'react-router';

class DetailView extends React.Component{
    constructor(props){
      super(props);
      this.closeDetailView = this.closeDetailView.bind(this);
    }

    closeDetailView(){
      this.props.history.push(`/messages/${this.props.channelId}`);
    }

    render(){
      if (this.props.channel === undefined) return <p></p>;
      const name = this.props.channel.private ? "this DM" :
      "#" + this.props.channel.name;
      let userCount;
      let users;
      let userList;
      let listUsername;

      if(this.props.channel.users){
        userCount = this.props.channel.users.length;
        users = this.props.channel.users;
        userList = users.map((user) => {
          if(user.username === this.props.currentUser.username){
            listUsername = user.username + " (you)";
          } else {
            listUsername = user.username;
          }
          return(
            <li key={user._id} id="details-user-list-item">
              <img src={user.aviUrl} />
              <span id="detail-view-username">{listUsername}</span>
            </li>
          );
        });
      }

      return (
        <section id="detail-view">
          <div id="detail-view-header">
            <h2 id="about-team-header">Members of {name}</h2>
            <i onClick={this.closeDetailView} id="detail-view-exit" className="fa fa-times" aria-hidden="true"></i>
          </div>
          <div id="detail-user-info">
            <div id="detail-user-count-header">
              <i id="detail-fa" className="fa fa-user-o" aria-hidden="true"></i>
              <h3>{userCount} members</h3>
            </div>
            <ul id="detail-user-list">
              {userList}
            </ul>
          </div>
        </section>
      );
    }
}
export default withRouter(DetailView);
