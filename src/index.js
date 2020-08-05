import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Employee from './components/employye/employee'
import 'react-bulma-components/dist/react-bulma-components.min.css';

// import App from './App';

class HomePage extends React.Component{

  render(){

    return(
        <div className="container is-fluid mt-4">
          <Employee/>
        </div>
    )
  }
}

ReactDOM.render(
  <HomePage/>,
  document.getElementById('root')
)
