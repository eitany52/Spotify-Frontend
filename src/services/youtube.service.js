import { httpService } from "./http.service"

export const youtubeService = {
    getSongsFromYoutube
}

async function getSongsFromYoutube(userInput, location = '') {
    const searchTerm = userInput
    let maxResults = location === "search-at-station" ? 15 : 4
    try {
        let songs = await httpService.get('youtube/songs', { searchTerm, maxResults })
        songs = _formatSongs(songs)
        return songs
        // return searchRes[0].items.slice(0,4)
    } catch (err) {
        console.log("Having issues with getting songs from youtube", err);
        throw err
    }
}

function _formatSongs(songs) {
    const formattedSongs = []
    songs.forEach(song => {
        formattedSongs.push(_formatSong(song))
    });

    return formattedSongs
}

function _formatSong(song) {
    return {
        id: song.id.videoId,
        title: _getSubstringBeforePipe(song.snippet.title),
        //title: song.snippet.title,
        channelTitle: song.snippet.channelTitle,
        url: `https://youtube.com/watch?v=${song.id.videoId}`,
        imgUrl: song.snippet.thumbnails.default.url,
        addedBy: {},
        addedAt: null,
        duration: _formatSongDuration(song.duration)
    }
}

function _formatSongDuration(songDuration) {
    // Examples of durations: 'PT4M' | 'PT35S' | 'PT4M35S'

    let formattedDuration = null
    if (!songDuration.includes('S')) {
        const minutes = songDuration.substring(2, songDuration.indexOf('M'))
        formattedDuration = `${minutes}:00`
    }
    if (!songDuration.includes('M')) {
        const seconds = songDuration.substring(2, songDuration.indexOf('S'))
        const formattedSeconds = seconds.length < 2 ? `0${seconds}` : seconds
        formattedDuration = `0:${formattedSeconds}`
    }
    if (songDuration.includes('S') && songDuration.includes('M')) {
        formattedDuration = songDuration.substring(2, songDuration.indexOf('S'))
        const [minutes, seconds] = formattedDuration.split('M')
        const formattedSeconds = seconds.length < 2 ? `0${seconds}` : seconds

        formattedDuration = `${minutes}:${formattedSeconds}`
    }

    return formattedDuration
}

function _getSubstringBeforePipe(str) {
    // בדוק אם המחרוזת מכילה את התו '|'
    const pipeIndex = str.indexOf('|');

    // אם אין את התו '|', החזר את המחרוזת כולה
    if (pipeIndex === -1) {
        return str;
    }
    // אחרת, החזר את החלק של המחרוזת עד ל-| הראשון (לא כולל)
    return str.substring(0, pipeIndex);
}