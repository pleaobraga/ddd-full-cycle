import { EventDispatcherInterface } from "./event-dispatecher.interface"
import { EventHandlerInterface } from "./event-handler.interface"
import { EventInterface } from "./event.interface"


export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  register(eventName: string, eventeHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }

    this.eventHandlers[eventName].push(eventeHandler)
  }

  unregister(eventName: string, eventeHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventeHandler)

      if (index >= 0) {
        this.eventHandlers[eventName].splice(index, 1)
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {}
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event)
      })
    }
  }
}
