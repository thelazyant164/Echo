import { React } from 'react';
import renderer from 'react-test-renderer';
import { FolderInput } from './newfolder-input';

describe('<FolderInput />', () => {
  let newFolderInput;
  beforeEach(() => {
    newFolderInput = renderer.create(<FolderInput />).toJSON();
  });

  test('Renders correctly', () => {
    expect(newFolderInput).toMatchSnapshot();
  });
});
