import React from 'react';
import NavBar from '../src/components/navBar/navbar';
import { mount } from 'enzyme';

describe('NavBar unit testing', () => {
  test('NavBar branding', () => {
    let wrapper = mount(<NavBar/>);
    let navbarBrand = wrapper.find('.navbar-title');
    expect(navbarBrand.text()).toBe('REACH');
  });
})