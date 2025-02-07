export declare enum EventType {
    VIRTUAL = "VIRTUAL",
    PHYSICAL = "PHYSICAL",
    HYBRID = "HYBRID"
}
export declare class CreateEventDto {
    title: string;
    description: string;
    type: EventType;
    startDate: string;
    endDate: string;
    location?: string;
    virtualLink?: string;
    price: number;
    artistId: string;
}
