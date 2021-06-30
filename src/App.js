import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../node_modules/react-notifications/lib/notifications.css';
import "react-datepicker/dist/react-datepicker.css";
import PageRoutes from './routes/pageRoutes';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <PageRoutes />
      </div>
    );
  }
}

export default App;