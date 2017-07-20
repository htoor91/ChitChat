import React from 'react';

const Logout = ({ logout, user }) => {
  const toggle = () => {
    document.getElementById('logout-dropdown').classList.toggle('hidden');
  };

  const dropdown = (e) => {
    e.preventDefault();
    toggle();
    document.removeEventListener('click', toggle);
    if(!(document.getElementById('logout-dropdown')
      .classList
      .contains('hidden'))){
      document.addEventListener('click', toggle);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
  };

  return (
    <i id="fa-bars-menu" className="fa fa-bars" aria-hidden="true" onClick={dropdown}>
      <ul id="logout-dropdown" className="hidden">
        <li>
          <div id="logout-box" className="logout-box">
            <div id="logout-box-user-display">
              <div id="logout-box-user-details">
                <p id="logout-box-username">{user.username}</p>
                <p id="logout-box-handle">@{user.username}</p>
              </div>
            </div>
            <span id="logout-box-logout-btn" onClick={logoutHandler}>Logout</span>
          </div>
        </li>
      </ul>
    </i>
  );
};

export default Logout;
