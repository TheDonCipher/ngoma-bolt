import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
export declare class TracksController {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    mintTrack(file: Express.Multer.File, createTrackDto: CreateTrackDto): Promise<string>;
    purchaseTrack(tokenId: string): Promise<any>;
    withdrawRoyalties(): Promise<any>;
}
