# Mini News
Small app to view posts

## Prequisites
- Make sure you can run [React Native](https://facebook.github.io/react-native/docs/getting-started)
- Use Node version `11.13.0`

## Running the project
- Run `yarn` or `npm install`
- Run `react-native run-android` or `react-native run-ios`

## Features
- TypeScript
- Eslint (with TypeScript rules)
- Redux, react-redux, redux-persist, redux-thunk
- Prettier
- Testing with Jest
- [Native Base](https://nativebase.io/)

## Folder Structure
JavaScript code must be inside `src/` directory.
- All filenames must be `kebab-case`
- `theme` This folder holds native-base ejected components for easy component's customization
- `src/components` Here we place all components that most likely will be reusable or state-less components
- `src/interfaces` Each interface must have its own file. In cases where you need an interface for a property of your interfaces, you can either put it apart or inside the same parent interface.
- `src/redux` Here we have all actions, reducers and its constants
- `src/screens` Here we create a folder for each screen.
