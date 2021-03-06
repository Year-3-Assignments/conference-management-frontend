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
import HomePage from '../pages/home/landingPage/homePage';
import Editor from '../pages/editor/editor';
import workshopPage from '../pages/home/workshopPage/workshopPage';
import ReviewerPage from '../pages/reviewer/reviewer';
import Conferences from '../pages/admin/conferences/conferences';
import KeynotePage from '../pages/home/keynotePage/keynotepage';
import ConferencePage from '../pages/home/conferencePage/conferencePage';

function PageRoutes() {
  return (
    <div>
      <Router>
      <Navbar />
        <section className="content">
          <Switch location={location}>
            <Route path="/signup" component={SignUp } key={location.pathname} exact />
            <Route path="/reviewer" component={ReviewerPage} key={location.pathname} exact />
            <Route path="/login" component={Login} key={location.pathname} exact />
            <Route path="/me" component={UserProfilePage} key={location.pathname} exact />
            <Route path="/admin/dashboard" component={Dashboard} key={location.pathname} exact />
            <Route path="/admin/users" component={Users} key={location.pathname} exact />
            <Route path="/admin/reviewers" component={Reviewers} key={location.pathname} exact />
            <Route path="/admin/editors" component={Editors} key={location.pathname} exact />
            <Route path="/admin/workshops" component={Workshops} key={location.pathname} exact />
            <Route path="/admin/conferences" component={Conferences} key={location.pathname} exact />
            <Route path="/notifications" component={UserNotifications} key={location.pathname} exact />
            <Route path="/workshops" component={workshopPage} key={location.pathname} exact/>
            <Route path="/keynotes" component={KeynotePage} key={location.pathname} exact />
            <Route path="/conferences" component={ConferencePage} key={location.pathname} exact />
            <Route path="/me/editor" component={Editor} key={location.pathname} exact />
            <Route path="/" component={HomePage} exact />
          </Switch>
        </section>
        <Footer/>
      </Router>
    </div>
  );
}

export default PageRoutes;