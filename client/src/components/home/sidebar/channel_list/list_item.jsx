import React from 'react';

const ListItem = ({ channel }) => {
  const name = channel.private ? `@${channel.name}` : `#${channel.name}`;
  const link = channel._id;

  return (
    <li className="list-item">
      <a href={`#/messages/${link}`} className="list-item-link">
        <h5 className="list-item-name">{name}</h5>
      </a>
    </li>
  );
};

export default ListItem;
