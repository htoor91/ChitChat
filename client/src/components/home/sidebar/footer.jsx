import React from 'react';

const Footer = () => {
  return (
    <footer id="sidebar-footer">
      <p>Created by Hassan Toor</p>
      <ul>
        <li>
          <a href="http://hassantoor.com" target="_blank">
            <i className="fa fa-code"
              aria-hidden="true"></i>
            Portfolio
          </a>
        </li>
        <li>
          <a href="http://github.com/htoor91" target="_blank">
            <i className="fa fa-github"
              aria-hidden="true"></i>
            Github
          </a>
        </li>
        <li>
          <a href="http://linkedin.com/in/hassantoor" target="_blank">
            <i className="fa fa-linkedin"
              aria-hidden="true"></i>
            LinkedIn
          </a>
        </li>
        <li>
          <a href="http://hassantoor.com/assets/Resume.pdf" target="_blank">
            <i className="fa fa-file-text-o"
              aria-hidden="true"></i>
            Resume
          </a>
        </li>
        <li>
          <a href="mailto:hassantoor8@gmail.com" target="_blank">
            <i className="fa fa-envelope-o"
              aria-hidden="true"></i>
            Email
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
