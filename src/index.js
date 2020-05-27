import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const APP_STARTUP_TIME = 'app_startup_time';

console.time(APP_STARTUP_TIME);

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          alignItems: 'center',
          fontFamily: 'Roboto',
        }}
      >
        <img
          alt="Beaver"
          style={{
            height: '250px',
          }}
          src="https://pbs.twimg.com/profile_images/2779323089/f1d2488fedff90047a32244dbc624e59_400x400.jpeg"
        />
        <h2>Beaver</h2>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'), () => {
  console.timeEnd(APP_STARTUP_TIME);
});
