import React from 'react';

const ListItem = ({ channel, currentUser }) => {
  const link = channel._id + '/details';
  let name;
  let listItemName;

  if(channel.private && currentUser){
    let usernames = channel.name
    .split(', ')
    .filter(username => username !== currentUser.username)
    .join(', ');

    name = "@" + usernames;
  } else {
    name = "#" + channel.name;
  }

  if(name.length > 19){
    name = name.slice(0, 19) + '...';
  }

  if(channel.notifications){
    const notification = channel.notifications;
    listItemName = (
      <h5 className="list-item-name white-notification">{name}
        <span id="notifications">{notification}</span>
      </h5>
    );
  } else {
    listItemName = (
      <h5 className="list-item-name">{name}</h5>
    );
  }

  return (
    <li className="list-item">
      <a href={`#/messages/${link}`} className="list-item-link">
        {listItemName}
      </a>
    </li>
  );
};

export default ListItem;
