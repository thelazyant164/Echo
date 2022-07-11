import { React } from 'react';
import renderer from 'react-test-renderer';
import FileUploadForm from './file-upload-form';

describe('<FileUploadForm />', () => {
  let fileUploadForm;
  beforeEach(() => {
    fileUploadForm = renderer.create(<FileUploadForm />).toJSON();
  });

  test('Renders correctly', () => {
    expect(fileUploadForm).toMatchSnapshot();
  });
});
