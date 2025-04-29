export type NotificationErrorProps = {
  message: string
  context: string
}

export class Notification {
  private errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps): void {
    this.errors.push(error)
  }

  messages(context?: string): string {
    if (context) {
      return this.errors
        .filter((error) => error.context === context)
        .map((error) => `${context}: ${error.message}`)
        .join(', ')
    }

    return this.errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  get errorsList(): NotificationErrorProps[] {
    return this.errors
  }
}
