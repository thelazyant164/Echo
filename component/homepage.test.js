import { React } from 'react';
import renderer from 'react-test-renderer';
import { Homepage } from './homepage';

describe('<Homepage />', () => {
  let homepage;
  beforeEach(() => {
    homepage = renderer.create(<Homepage />).toJSON();
  });

  test('Renders correctly', () => {
    expect(homepage).toMatchSnapshot();
  });
});
