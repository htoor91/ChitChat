import React from 'react';

const ListItem = ({ channel }) => {
  const name = channel.private ? `@${channel.name}` : `#${channel.name}`;
  const link = channel._id;
  const notification = channel.notifications ? channel.notifications : "";

  return (
    <li className="list-item">
      <a href={`#/messages/${link}`} className="list-item-link">
        <h5 className="list-item-name">{name}
          <span id="notifications">{notification}</span>
        </h5>
      </a>
    </li>
  );
};

export default ListItem;
