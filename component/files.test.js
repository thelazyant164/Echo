import { React } from 'react';
import renderer from 'react-test-renderer';
import { Files } from './files';

describe('<Files />', () => {
  let filesPage;
  beforeEach(() => {
    filesPage = renderer.create(<Files />).toJSON();
  });

  test('Renders correctly', () => {
    expect(filesPage).toMatchSnapshot();
  });
});
