import React from 'react';

const ListItem = ({ channel }) => {
  const name = channel.private ? `@${channel.name}` : `#${channel.name}`;
  const link = channel._id;
  let listItemName;


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
