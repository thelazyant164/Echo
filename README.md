# Echo

!["Echo" logo](assets/logo.png)

An audio-processing utility mobile app supporting basic functionality such as background noise removal, volume adjustment, speech-to-text transcription & realtime noise-reduced recording.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

A local installation of NodeJS is required

### Installing

To get a development environment running:

1. Clone the repository

```
$ git clone https://github.com/thelazyant164/Echo.git
```

2. Install all necessary dependencies

```
$ npm install
```

3. Start the project

```
$ npm start
```

Follow the CLI prompts to run the app on a web server or on a virtual device. Note that the web mock-up will not have access to native features such as accessing the device storage and writing/reading data to disk.

## Running tests

### Snapshot tests

As of current, only snapshot tests for synchronous & platform-independent components are available, but we have future plans for adding more test coverage.
To run all automated component snapshot tests:

```
npm run test
```

### Coding style tests

Using [Airbnb's ESlint plugin](https://github.com/airbnb/javascript), on top of React Native's recommended rules. A few rules have been overridden to our preference, see [eslintrc.json](https://github.com/thelazyant164/Echo/blob/master/.eslintrc.json) for more details.

```
npm run lint
```

## Built With

### Core

* [React](https://reactjs.org/docs/getting-started.html) - Core library for React
* [React Native](https://reactnative.dev/) - View-layer library for cross-platform compatibility
* [Expo](https://docs.expo.dev/) - Framework & SDK for streamlining development build & ease of access platform-specific API

### Testing

* [Jest](https://jestjs.io/docs/getting-started) - Used to make snapshot component tests

### Development tool

* [ESlint](https://eslint.org/docs/latest/) - Used to enforce consistent coding style & perform static code analysis

## Authors

* **Trung Kien Nguyen** - *Initial idea, developer, designer* - [kiennguyen2403](https://github.com/kiennguyen2403)
* **Aly** -  *Developer, tester* - [thelazyant164](https://github.com/thelazyant164)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details