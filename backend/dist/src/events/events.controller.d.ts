import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    createEvent(createEventDto: CreateEventDto): Promise<Event>;
    getEvents(type?: string, artistId?: string): Promise<any>;
    getEvent(id: string): Promise<Event>;
    updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    deleteEvent(id: string): Promise<Event>;
    registerForEvent(id: string): Promise<Event>;
}
