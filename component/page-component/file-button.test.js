import { React } from 'react';
import renderer from 'react-test-renderer';
import { Filebutton } from './file-button';

describe('<Filebutton />', () => {
  let fileButton;
  beforeEach(() => {
    fileButton = renderer.create(<Filebutton />).toJSON();
  });

  test('Renders correctly', () => {
    expect(fileButton).toMatchSnapshot();
  });
});
