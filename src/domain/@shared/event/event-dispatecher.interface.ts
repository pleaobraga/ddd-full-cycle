import { EventHandlerInterface } from "./event-handler.interface"
import { EventInterface } from "./event.interface"


export interface EventDispatcherInterface {
  notify(event: EventInterface): void
  register(eventName: string, eventeHandler: EventHandlerInterface): void
  unregister(eventName: string, eventeHandler: EventHandlerInterface): void
  unregisterAll(): void
}
