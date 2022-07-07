import { React } from 'react';
import renderer from 'react-test-renderer';
import { Featurebutton } from './feature-button';

describe('<Featurebutton />', () => {
  let featureButton;
  beforeEach(() => {
    featureButton = renderer.create(<Featurebutton />).toJSON();
  });

  test('Renders correctly', () => {
    expect(featureButton).toMatchSnapshot();
  });
});
