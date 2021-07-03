import React from 'react';
import NavBar from '../src/components/navBar/navbar';
import { shallow } from 'enzyme';

describe('NavBar unit testing', () => {
  test('NavBar branding', () => {
    let wrapper = shallow(<NavBar/>);
    expect(wrapper.find('.navbar-brand').at(0).text()).toBe('REACH');
  });
})