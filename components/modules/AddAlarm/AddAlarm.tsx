import React, { useEffect, useState } from 'react'
import { Button, View, Text } from 'react-native'
import notifee, {
  TriggerType,
  TimestampTrigger,
  RepeatFrequency,
  TriggerNotification,
  AndroidImportance,
  AndroidVisibility,
  AndroidColor,
  AndroidStyle,
  AndroidCategory,
} from '@notifee/react-native'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

export const AddAlarm: React.FC = () => {
  const [triggerNotifications, setTriggerNotifications] = useState<
    TriggerNotification[]
  >([])

  useEffect(() => {
    getTriggerNotifications()
  }, [])

  const getTriggerNotifications = async () => {
    const t = await notifee.getTriggerNotifications()
    setTriggerNotifications(t)
  }

  const createTriggerNotification = async () => {
    const channelId = await notifee.createChannel({
      id: `channel-${uuidv4()}`,
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
      vibration: true,
      sound: 'bussin',
      vibrationPattern: [50, 50, 50, 50, 50, 50, 50, 50],
    })

    let date = new Date(Date.now())
    date = moment(date).add(10, 's').toDate()
    console.log(date)

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
      alarmManager: true,
    }

    try {
      await notifee.createTriggerNotification(
        {
          id: `trigger-${uuidv4()}`,
          body: 'custom sound? The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
          android: {
            channelId,
            color: AndroidColor.RED,
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
            autoCancel: false,
            ongoing: true,
            fullScreenAction: {
              id: uuidv4(),
            },
            actions: [
              {
                title: '<b>Dance</b> &#128111;',
                pressAction: { id: 'dance' },
              },
              {
                title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
                pressAction: { id: 'cry' },
              },
            ],
          },
        },
        trigger
      )
      getTriggerNotifications()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <Button
        title="Create Alarm"
        onPress={() => createTriggerNotification()}
      />
      <Button
        title="Cancel All Alarms"
        onPress={() => {
          notifee.cancelTriggerNotifications()
          setTriggerNotifications([])
        }}
      />
      <View>
        {triggerNotifications.map(
          (triggerNotification: TriggerNotification, i) => (
            <Text key={i}>{JSON.stringify(triggerNotification, null, 4)}</Text>
          )
        )}
      </View>
    </View>
  )
}
