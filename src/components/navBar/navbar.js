import React from 'react';
import logo from '../../../assets/conference_logo.png';
import './navbar.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserNotifications, getUserAccount } from '../../actions/userActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.state = {
      profileImage: '',
      notifications: []
    }
  }

  logoutUser(e) {
    if (localStorage.getItem('role') !== null) {
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      window.location = '/';
    }
  }

  componentDidMount() {
    if (this.props.getuser !== null) {
      this.props.getUserAccount();
      this.props.getUserNotifications();
      this.setState({ profileImage: this.props.getuser.imageurl });
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.usernotifications !== nextProps.usernotifications) {
      this.setState({ notifications: nextProps.usernotifications })
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark navbar-bg">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <a className="navbar-brand" href="#">
              <img src={logo} height="35" alt="" loading="lazy" />
              <small className="navbar-title">REACH</small>
            </a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {localStorage.length ===  0 ?
                  <span className="nav-content">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Keynotes</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Conferences</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Workshops</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Downloads</a>
                      </li>
                    </ul>
                  </span>
                :
                  null
                }

                {localStorage.getItem('role') === 'ROLE_ADMIN' ?
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/users" className="nav-link">Users</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/reviewers" className="nav-link">Reviewers</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/editors" className="nav-link">Editors</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/workshops" className="nav-link">Workshops</Link>
                    </li>
                  </ul>
                :
                  null
                }

                {localStorage.getItem('role') === 'ROLE_REVIEWER' ?
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="#">Resources</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Users</a>
                    </li>
                  </ul>
                :
                  null
                }

                {localStorage.getItem('role') === 'ROLE_EDITOR' ?
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="#">My Edits</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Resources</a>
                    </li>
                  </ul>
                :
                  null
                }

                {localStorage.getItem('role') === 'ROLE_USER' ?
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link" href="/me">My Profile</a>
                    </li>
                  </ul>
                :
                  null
                }
              </div>
            
            {localStorage.getItem('role') === 'ROLE_ADMIN' || 
              localStorage.getItem('role') === 'ROLE_REVIEWER' || 
              localStorage.getItem('role') === 'ROLE_EDITOR' ||
              localStorage.getItem('role') === 'ROLE_USER' ?
              <div className="d-flex align-items-center">
                <a
                  className="text-reset me-3 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell notification-icon"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">
                    {this.state.notifications ? this.state.notifications.length : 0}
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link to="/notifications" className="dropdown-item">See my notifications</Link>
                  </li>
                </ul>
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  {this.props.getuser && this.props.getuser.imageurl ?
                    <img src={this.props.getuser.imageurl} className="rounded-circle" width="35" height="35" alt="" loading="lazy" />
                  :
                    <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-circle" height="35" alt="" loading="lazy" />
                  }
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <a className="dropdown-item" href="/me">My profile</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={this.logoutUser}>Logout</a>
                  </li>
                </ul>
              </div>
            : 
              null
            }

            {localStorage.length === 0 ? 
              <div>
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="dropDown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-caret-down fa-lg" style={{color: '#fff'}}></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropDown">
                  <li>
                    <a className="dropdown-item" href="/signup">Create Account</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/login">Login</a>
                  </li>
                </ul>
              </div>
            :
              null
            }
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  getuser: state.userReducer.getuser,
  usernotifications: state.userReducer.usernotifications
});

const mapDispatchToProps = dispatch =>({
  getUserNotifications: () => {
    dispatch(getUserNotifications());
  },
  getUserAccount: () => {
    dispatch(getUserAccount());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);