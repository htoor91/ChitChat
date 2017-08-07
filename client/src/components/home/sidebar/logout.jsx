import React from 'react';

const Logout = ({ logout, user }) => {
  const toggle = () => {
    const dropdownEl = document.getElementById('logout-dropdown');
    if(dropdownEl){
      dropdownEl.classList.toggle('hidden');
      document.removeEventListener("click", toggle);
    }
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
    toggle();
    logout();
  };

  let username;
  let userAvi;

  if(user){
    username = user.username;
    userAvi = user.aviUrl;
  }

  return (
    <i id="fa-bars-menu" className="fa fa-bars" aria-hidden="true" onClick={dropdown}>
      <ul id="logout-dropdown" className="hidden">
        <li>
          <div id="logout-box" className="logout-box">
            <div id="logout-box-user-display">
              <img src={userAvi} />
              <div id="logout-box-user-details">
                <p id="logout-box-username">{username}</p>
                <p id="logout-box-handle">@{username}</p>
              </div>
            </div>
            <button id="logout-box-logout-btn" onClick={logoutHandler}>Logout</button>
          </div>
        </li>
      </ul>
    </i>
  );
};

export default Logout;
