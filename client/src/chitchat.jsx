import React from 'react';
import ReactDOM from 'react-dom';

const Root = () => {
  return (
    <h1>Hello World</h1>
  );
};

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Root />, document.getElementById('main'));
});
