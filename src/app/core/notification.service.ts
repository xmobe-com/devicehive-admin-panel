import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {Notification} from '../shared/models/notification.model';

@Injectable()
export class NotificationService {

  NotificationPollQuery = DeviceHive.models.query.NotificationPollQuery;
  NotificationListQuery = DeviceHive.models.query.NotificationListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllNotifications(deviceId: string) {
    const query = new this.NotificationListQuery({deviceId: deviceId});
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.notification.list(query);
  }

  async pollNotifications(deviceId: string) {
    const query = new this.NotificationPollQuery({deviceId: deviceId});
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.notification.poll(query);
  }

  async insertNotification(deviceId: string, notification: Notification) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.notification.insert(deviceId, notification);
  }
}
