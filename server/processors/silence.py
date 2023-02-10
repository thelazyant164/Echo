from pydub import AudioSegment
from pydub.silence import split_on_silence
import sys


def Silence(file):
    # file is name of audio (no extension) in file system
    # Reading and splitting the audio file into chunks
    sound = AudioSegment.from_file(f"server/temp/files/{file}.wav", "wav")
    audio_chunks = split_on_silence(
        sound, min_silence_len=100, silence_thresh=-45, keep_silence=50)
    # Putting the file back together
    combined = AudioSegment.empty()
    for chunk in audio_chunks:
        combined += chunk
    combined.export(
        f'server/temp/results/{file}-silenceRemoved.wav', format="wav")
    print(f'server\\temp\\results\\{file}-silenceRemoved.wav')


Silence(sys.argv[1])
