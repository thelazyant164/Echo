import { React } from 'react';
import renderer from 'react-test-renderer';
import { SpeechToTextPage } from './speech-to-text';

describe('<SpeechToTextPage />', () => {
  let speechToTextPage;
  beforeEach(() => {
    speechToTextPage = renderer.create(<SpeechToTextPage />).toJSON();
  });

  test('Renders correctly', () => {
    expect(speechToTextPage).toMatchSnapshot();
  });
});
