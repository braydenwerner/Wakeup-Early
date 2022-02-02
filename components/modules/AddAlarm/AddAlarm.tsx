import React, { useEffect, useState } from 'react'
import { Button, View, Text } from 'react-native'
import notifee, {
  TriggerType,
  TimestampTrigger,
  RepeatFrequency,
  TriggerNotification,
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
      id: 'default',
      name: 'Default Channel',
    })

    let date = new Date(Date.now())
    date = moment(date).add(1, 'm').toDate()
    console.log(date)

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    }

    await notifee.createTriggerNotification(
      {
        id: `trigger-${uuidv4()}`,
        title: 'Bussin',
        body: 'Today at 4PM',
        android: {
          channelId,
        },
      },
      trigger
    )

    getTriggerNotifications()
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
            <Text key={i}>{JSON.stringify(triggerNotification)}</Text>
          )
        )}
      </View>
    </View>
  )
}
