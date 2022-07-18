export abstract class IQueueMessagingService {
  abstract send(message: any): Promise<void>;
}
