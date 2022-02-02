import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import notifee, { EventType } from '@notifee/react-native'

//  https://notifee.app/react-native/docs/events
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail

  console.log(notification)
})

AppRegistry.registerComponent(appName, () => App)
