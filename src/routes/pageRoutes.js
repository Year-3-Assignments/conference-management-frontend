import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// UI Componentes
import SignUp from '../pages/SignUp/Signup';
import Navbar from '../components/navBar/navbar';
import Footer from '../components/footer/footer';
import Login from '../pages/login/login';
import UserProfilePage from '../pages/userProfile/userProfilePage';
import Dashboard from '../pages/admin/dashboard/dashboard';
import Users from '../pages/admin/users/users';
import Reviewers from '../pages/admin/reviewers/reviewers';
import Editors from '../pages/admin/editors/editors';
import UserNotifications from '../pages/notifications/userNotifications';
import Workshops from '../pages/admin/workshops/workshops';
import HomePage from '../pages/home/homePage';

function PageRoutes() {
  return (
    <div>
      <Router>
      <Navbar />
        <section className="content">
          <Switch location={location}>
            <Route path="/signup" component={SignUp } key={location.pathname} exact />
            <Route path="/login" component={Login} key={location.pathname} exact />
            <Route path="/me" component={UserProfilePage} key={location.pathname} />
            <Route path="/admin/dashboard" component={Dashboard} key={location.pathname} exact />
            <Route path="/admin/users" component={Users} key={location.pathname} exact />
            <Route path="/admin/reviewers" component={Reviewers} key={location.pathname} exact />
            <Route path="/admin/editors" component={Editors} key={location.pathname} exact />
            <Route path="/admin/workshops" component={Workshops} key={location.pathname} exact />
            <Route path="/notifications" component={UserNotifications} key={location.pathname} exact />
            <Route path="/" component={HomePage} exact />
          </Switch>
        </section>
        <Footer/>
      </Router>
    </div>
  );
}

export default PageRoutes;