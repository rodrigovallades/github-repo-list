import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Repos } from './index'

describe('Repos container', function () {
  beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
  });

  it('renders "Repos" component', () => {
    const component = shallow(<Repos/>);
    expect(component.exists()).toEqual(true);
  });
})
