import { VideoClips } from "@scrypted/types";
import { ScryptedMimeTypes } from "@scrypted/types";
import { MediaManager } from "@scrypted/types";
import { VideoClip } from "@scrypted/types";

export async function fetchClipThumbnail(mediaManager: MediaManager, device: VideoClips, clip: VideoClip) {
    const mo = await device.getVideoClipThumbnail(clip.thumbnailId || clip.id);
    const url = (await mediaManager.convertMediaObject(mo, ScryptedMimeTypes.LocalUrl)).toString();
    try {
        const u = new URL(url);
        return u.pathname + '?' + u.search;
    }
    catch (e) {
        return url;
    }
}

export async function fetchClipUrl(mediaManager: MediaManager, device: VideoClips, clip: VideoClip) {
    const mo = await device.getVideoClip(clip.videoId || clip.id);
    const url = (await mediaManager.convertMediaObject(mo, ScryptedMimeTypes.LocalUrl)).toString();
    try {
        const u = new URL(url);
        return u.pathname + '?' + u.search;
    }
    catch (e) {
        return url;
    }
}
