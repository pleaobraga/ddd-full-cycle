import { EventInterface } from "../../../@shared/event/event.interface";

export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOcurred: Date
  eventData: any

  constructor(data: { id: string; name: string; address: string }) {
    this.dataTimeOcurred = new Date()
    this.eventData = data
  }
}
