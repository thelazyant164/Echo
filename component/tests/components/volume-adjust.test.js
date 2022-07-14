import { React } from 'react';
import renderer from 'react-test-renderer';
import { VolumeAdjustPage } from '../../volume-adjust';

describe('<VolumeAdjustPage />', () => {
  let volumeAdjustPage;
  beforeEach(() => {
    volumeAdjustPage = renderer.create(<VolumeAdjustPage />).toJSON();
  });

  test('Renders correctly', () => {
    expect(volumeAdjustPage).toMatchSnapshot();
  });
});
