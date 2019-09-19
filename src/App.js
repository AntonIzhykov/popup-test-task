import React from 'react';
import Popup from './components/Popup';

class App extends React.Component {
  state = {
    showPopup: false
  };

  handleShowPopup = () => {
    this.setState({
      showPopup: true
    });
  };

  handleClosePopup = () => {
    this.setState({
      showPopup: false
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleShowPopup} className="m-4">
          Show popup
        </button>
        <Popup isOpen={this.state.showPopup} handleClose={this.handleClosePopup} />
      </div>
    );
  }
}

export default App;
