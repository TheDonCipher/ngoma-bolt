import { MerchandiseType } from './create-merchandise.dto';
export declare class UpdateMerchandiseDto {
    title?: string;
    description?: string;
    type?: MerchandiseType;
    price?: number;
    stock?: number;
    image?: string;
    weight?: number;
    dimensions?: string;
}
