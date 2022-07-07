import { React } from 'react';
import renderer from 'react-test-renderer';
import { Header } from './header';

describe('<Header />', () => {
  let header;
  beforeEach(() => {
    header = renderer.create(<Header />).toJSON();
  });

  test('Renders correctly', () => {
    expect(header).toMatchSnapshot();
  });
});
