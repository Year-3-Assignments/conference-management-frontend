import React from 'react';
import Login from '../src/pages/login/login';
import { mount } from 'enzyme';

describe('Login Page', () => {
  test('renders without crashing', () => {
    let wrapper = mount(<Login/>);
    let navbarBrand = wrapper.find(h4);
    console.log(navbarBrand)
    expect(navbarBrand.text()).toBe('Login to My Account');
  });
})