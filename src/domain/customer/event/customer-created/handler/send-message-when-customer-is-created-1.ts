import { EventHandlerInterface } from '../../../../@shared/event/event-handler.interface'
import { CustomerCreatedEvent } from '../customer-created.event'

export class SendMessageWhenCustomerIsCreated1Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
