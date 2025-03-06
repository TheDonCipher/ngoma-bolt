// A simpler Artist definition for use in Track and other places
export interface Artist {
  id: string;
  name: string;
  image?: string;
}

// A more full-featured Artist for the album module
export interface ExtendedArtist extends Artist {
  profileImage: string;
  // Other artist properties...
}
