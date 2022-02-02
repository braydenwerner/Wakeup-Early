import { TriggerNotification } from '@notifee/react-native'

export const logTriggerNotifications = (
  triggerNotifications: TriggerNotification[]
) => {
  for (const triggerNotification of triggerNotifications) {
    console.log(triggerNotification)
  }
}
