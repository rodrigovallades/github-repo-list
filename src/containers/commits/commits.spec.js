import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Commits } from './index'

jest.mock('react-router-dom', () => ({ Link: 'Link' }))

describe('Commits container', function () {
  beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
  });

  it('renders "Commits" deep correctly', () => {
    const tree = renderer.create(<Commits/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders "Commits" shallow correctly', () => {
    const component = shallow(<Commits/>);
    expect(component.exists()).toEqual(true);
  });
})
