import { youtubeService } from "../../services/youtube.service";

export function getSongsFromYoutube(userInput, location) {
    return youtubeService.getSongsFromYoutube(userInput, location)
}