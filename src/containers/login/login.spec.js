import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Login } from './index'

describe('Login container', function () {
  beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
  });

  it('renders "Login" component', () => {
    const component = shallow(<Login/>);
  expect(component.exists()).toEqual(true);
  });
})
