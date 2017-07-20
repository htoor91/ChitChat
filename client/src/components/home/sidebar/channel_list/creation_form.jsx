import React from 'react';
import { withRouter } from 'react-router-dom';
import FAClose from 'react-icons/lib/fa/close';


class CreationForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      private: this.props.private,
      allUsers: "",
      selectedUsers: [this.props.user],
      errors: []
    };

    this.createChannel = this.createChannel.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.deselectUser = this.deselectUser.bind(this);
  }

  componentDidMount(){
    this.props.fetchUsers();
    if(this.state.private){
      this.setState({
        name: "DM"
      });
    }
  }

  update(field){
    return (e) => {
      this.setState({ errors: [] });
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  selectUser(user) {
    this.props.clearErrors();
    if (user.username !== this.props.user.username && !(this.state.selectedUsers.includes(user))) {
      let currentSelectedUsers = this.state.selectedUsers;
      currentSelectedUsers.push(user);
      this.setState({selectedUsers: currentSelectedUsers});
    }
  }

  deselectUser(user) {
    event.preventDefault();
    this.props.clearErrors();
    let i = this.state.selectedUsers.indexOf(user);
    let newSelectedUsers = this.state.selectedUsers.slice(0, i).concat(this.state.selectedUsers.slice(i+1));
    this.setState({selectedUsers: newSelectedUsers});
  }

  createChannel(e){
    e.preventDefault();
    const allChannelNames = this.props.publicChannels.map((channel) => {
      return channel.name;
    });

    if(this.state.name === ""){
      let newErrors = this.state.errors;
      newErrors.push("Please enter a title!");
      this.setState({ errors: newErrors});
    } else if(!this.state.private && allChannelNames.includes(this.state.name)){
      let newErrors = this.state.errors;
      newErrors.push("That channel name already exists!");
      this.setState({ errors: newErrors});
    } else if(this.state.private && this.state.selectedUsers.length < 2){
      let newErrors = this.state.errors;
      newErrors.push("Please select at least one user to DM with!");
      this.setState({ errors: newErrors});
    } else {
      let channel = this.state;
      if(this.state.private){
        let usernames = this.state.selectedUsers
        .map((user) => user.username)
        .join(', ');

        if(usernames.length > 30){
          usernames = usernames.slice(0, 30) + '...';
        }
        channel.name = usernames;
      }
      channel.userIds = this.state.selectedUsers.map((user) => user._id);
      console.log(channel);
      this.props.createChannel(channel).then((res) => {
        this.props.fetchUserChannels(this.props.user._id);
        this.props.history.push(`/messages/${res.channel._id}`);
        this.props.closeModal();
        this.props.clearErrors();
      });
    }
  }

  render(){
    const title = this.state.private ? "New Direct Message" : "New Channel";
    let channelInput;
    let userList;
    if(this.state.errors){
      this.state.errors.forEach((error) => {
        this.props.errors.push(error);
      });
    }
    const errors = this.props.errors.map((error, i) => (
      <li className="creation-form-error-item" key={`error-${i}`}>
        {error}
      </li>
    ));
    if(!this.state.private){
      channelInput = (
        <input type="text"
          id="new-channel-title"
          value={this.state.name}
          onChange={this.update('name')}
          className="new-channel-input"
          placeholder="Channel Name"
        />
      );
    }

    const selectedUsers = this.state.selectedUsers.map((selectedUser, idx) => {
      let deselect;
      if(idx > 0){
        deselect = (
        <i id="delete-selected-user"
          className="fa fa-times-circle-o"
          aria-hidden="true"
          onClick={() => this.deselectUser(selectedUser)}>X</i>
        );
      }

      return (
        <li className="selected-user" key={`selected-${selectedUser._id}`}>
          {selectedUser.username}
          {deselect}
        </li>
      );
    });

    if(this.props.allUsers !== null){
      let filteredUsers = this.props.allUsers.filter(
        (user) => {
          return user.username.indexOf(this.state.allUsers) !== -1;
        }
      );

      userList = filteredUsers.map((user) => {
        return(
          <li
            onClick={() => this.selectUser(user)}
            className="new-channel-user-list-item"
            key={`user-list-${user._id}`}>
            {user.username}
          </li>
        );
      });

    }

    return (
      <div className="creation-form-container">
        <div id="exit-new-channel" onClick={this.props.closeModal}>
          <FAClose className="fa fa-times fa-3x" aria-hidden="true"/>
        </div>
        <form className="creation-form">
          <ul className="creation-form-errors-list">
            {errors}
          </ul>
          <h1>{title}</h1>
          {channelInput}
          <div className="creation-form-user-filter">
            <input type="text"
              id="new-channel-add-users-input"
              value={this.state.allUsers}
              onChange={this.update('allUsers')}
              className="new-channel-input"
              placeholder="Filter by username" />

            <button onClick={this.createChannel}
              id="new-channel-button"
              type="submit"
              value="Submit">Submit</button>
          </div>
          <div id="selected-users">
            <ul id="selected-users-list">
              { selectedUsers }
            </ul>
          </div>
          <ul id="all-users-list">
            { userList }
          </ul>
        </form>
      </div>
    );
  }
}


export default withRouter(CreationForm);