import React from 'react';
import Login from '../src/pages/login/login';
import { mount } from 'enzyme';
import testUtils from 'react-dom/test-utils';

describe('Login Page', () => {
  test('renders without crashing', () => {
    let wrapper = mount(<Login/>);
    let navbarBrand = wrapper.find('.form-text');
    expect(navbarBrand.text()).toBe('Username');
  });
})