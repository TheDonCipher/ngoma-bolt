import { EventType } from './create-event.dto';
export declare class UpdateEventDto {
    title?: string;
    description?: string;
    type?: EventType;
    startDate?: string;
    endDate?: string;
    location?: string;
    virtualLink?: string;
    price?: number;
}
