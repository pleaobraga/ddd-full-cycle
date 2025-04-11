import { EventHandlerInterface } from '../../../../@shared/event/event-handler.interface'
import { CustomerCreatedEvent } from '../customer-created.event'

export class SendMessageWhenCustomerIsCreated2Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
