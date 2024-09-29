import type { Notification } from '../../enterprise/notification'

export type NotificationsRepository = {
  create: (notification: Notification) => Promise<void>
}
