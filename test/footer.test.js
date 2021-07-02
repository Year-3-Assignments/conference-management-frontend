import React from 'react';
import Footer from '../src/components/footer/footer';
import { mount } from 'enzyme';

describe('Footer Page', () => {
  test('renders without crashing', () => {
    let wrapper = mount(<Footer/>);
    let footer = wrapper.find(h4);
    console.log(footer)
    expect(footer.text()).toBe('Successful Footer Button Links');
  });
})