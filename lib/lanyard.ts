import axios from 'axios'

export interface Activity {
  id: string
  name: string
  details: string
  state: string
  timestamps: {
    start: number
  }
  assets: {
    large_image: string
    large_text: string
    small_image: string
    small_text: string
  }
}

export interface Spotify {
  album: string
  album_art_url: string
  artist: string
  song: string
  track_id: string
  timestamps: {
    start: number
    end: number
  }
}

export interface GetUserById {
  data: {
    spotify: Spotify
    activities: Activity[]
  }
}

export async function getUserById(id: string) {
  return await axios
    .get<GetUserById>(`https://api.lanyard.rest/v1/users/${id}`)
    .then((res) => res.data.data)
    .catch(() => null)
}
