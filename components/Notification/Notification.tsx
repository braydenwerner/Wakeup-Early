import React, { useEffect } from 'react'
import { View } from 'react-native'
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native'

interface NotificationProps {}

export const Notification: React.FC<NotificationProps> = () => {
  useEffect(() => {
    const interval = setInterval(displayNotification, 5000)

    return () => clearInterval(interval)
  }, [])

  const displayNotification = () => {
    notifee.displayNotification({
      body: 'Full-screen notification',
      android: {
        category: AndroidCategory.ALARM,
        importance: AndroidImportance.HIGH,
        fullScreenAction: {
          id: 'default',
        },
      },
    })
  }
  return <View></View>
}
