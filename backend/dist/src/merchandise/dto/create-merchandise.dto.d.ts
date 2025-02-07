export declare enum MerchandiseType {
    PHYSICAL = "PHYSICAL",
    DIGITAL = "DIGITAL"
}
export declare class CreateMerchandiseDto {
    title: string;
    description: string;
    type: MerchandiseType;
    price: number;
    stock: number;
    image: string;
    artistId: string;
    weight?: number;
    dimensions?: string;
}
