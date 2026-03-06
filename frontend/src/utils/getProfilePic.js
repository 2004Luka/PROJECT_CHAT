import config from '../config/config';

/**
 * Get the full URL for a profile picture
 * Handles empty strings, null, undefined, and relative paths
 * @param {string|null|undefined} profilePic - The profile picture path from the database
 * @returns {string} - The full URL to the profile picture or placeholder
 */
export const getProfilePic = (profilePic) => {
    const placeholder = '/uploads/placeholder.webp';
    
    // If no profile pic or empty string, use placeholder
    if (!profilePic || (typeof profilePic === 'string' && profilePic.trim() === '') || profilePic === 'null' || profilePic === 'undefined') {
        return `${config.API_BASE_URL}${placeholder}`;
    }
    
    // If already a full URL (starts with http), return as is
    if (typeof profilePic === 'string' && (profilePic.startsWith('http://') || profilePic.startsWith('https://'))) {
        // Fallback for broken avatar service
        if (profilePic.includes('avatar.iran.liara.run')) {
            return `${config.API_BASE_URL}${placeholder}`;
        }
        return profilePic;
    }
    
    // If relative path, prepend API base URL
    if (typeof profilePic === 'string' && profilePic.startsWith('/')) {
        return `${config.API_BASE_URL}${profilePic}`;
    }
    
    // Fallback to placeholder
    return `${config.API_BASE_URL}${placeholder}`;
};

export default getProfilePic;

