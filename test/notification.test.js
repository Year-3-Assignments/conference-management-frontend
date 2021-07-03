import React from 'react';
import { shallow } from 'enzyme';
import Notification from '../src/pages/notifications/userNotifications';

describe('NavBar unit testing', () => {
  test('NavBar branding', () => {
    let wrapper = shallow(<Notification/>);
    expect(wrapper.find('.navbar-brand').at(0).text()).toBe('My Notifications');
  });
})