// import { EventTypeNames } from '@app/domain/enums/event-type-names.enum';
// import { IEventsProvider } from '@app/domain/interfaces/providers/events-provider.interface';
// import { Config, SegmentClient, TrackEvent } from '@common/segment-client';

// export class EventsProvider implements IEventsProvider {
//   client: SegmentClient;
//   constructor() {
//     const config: Config = {
//       key: process.env.SEGMENT_KEY,
//       ...(process.env.NODE_ENV == 'local' && { devSettings: { flushAt: 2 } })
//     };
//     this.client = new SegmentClient(config);
//   }

//   async sendEvent<T>(content: T, eventType: EventTypeNames) {
//     const trackEvent: TrackEvent = {
//       event: eventType.toString(),
//       properties: {
//         ...content
//       },
//       anonymousId: '-'
//     };
//     await this.client.Track(trackEvent);
//   }
// }

// export const createEventProvider = (): IEventsProvider => {
//   return new EventsProvider();
// }