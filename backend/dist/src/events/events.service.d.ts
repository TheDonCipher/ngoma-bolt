import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { WebsocketService } from '../websocket/websocket.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
export declare class EventsService {
    private prisma;
    private cache;
    private websocket;
    constructor(prisma: PrismaService, cache: CacheService, websocket: WebsocketService);
    createEvent(createEventDto: CreateEventDto): Promise<Event>;
    getEvents(type?: string, artistId?: string): Promise<any>;
    getEvent(id: string): Promise<Event>;
    updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    deleteEvent(id: string): Promise<Event>;
    registerForEvent(id: string): Promise<Event>;
}
