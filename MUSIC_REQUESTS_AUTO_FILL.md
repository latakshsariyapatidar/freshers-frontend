# Music Requests - Default Song Auto-Fill Implementation

## Changes Made

### Summary
Modified the music requests form to automatically fill missing song entries with a default song when users submit fewer than 3 songs.

### Key Changes

1. **Default Song Added**:
   ```javascript
   const DEFAULT_SONG = 'https://open.spotify.com/track/1rEVydQSe04NJUqyyEyeEq?si=77634cc57bcb4d89';
   ```

2. **Updated Padding Function**:
   ```javascript
   // Before: Filled with empty strings
   const padArrayToThree = (arr) => {
     const paddedArray = [...arr];
     while (paddedArray.length < 3) {
       paddedArray.push('');
     }
     return paddedArray;
   };

   // After: Fills with default song
   const padArrayToThree = (arr) => {
     const paddedArray = [...arr];
     while (paddedArray.length < 3) {
       paddedArray.push(DEFAULT_SONG);
     }
     return paddedArray;
   };
   ```

3. **Removed Warning Dialog**:
   - Eliminated the warning when submitting less than 3 songs
   - Removed `showWarning` state and `handleWarningConfirm` function
   - Simplified submission flow

4. **Updated Submission Logic**:
   - Always pads user entries to exactly 3 songs
   - Uses default song for missing entries
   - No user notification about auto-fill

### User Experience

#### Before:
- User enters 1 song → Warning dialog appears → User confirms → Submits with 2 empty slots

#### After:
- User enters 1 song → Submits immediately → Backend receives 3 songs (1 user + 2 default)

### Technical Implementation

```javascript
// Example scenarios:

// User enters 1 song:
userSongs = ['https://open.spotify.com/track/user-song']
paddedSongs = [
  'https://open.spotify.com/track/user-song',
  'https://open.spotify.com/track/1rEVydQSe04NJUqyyEyeEq?si=77634cc57bcb4d89',
  'https://open.spotify.com/track/1rEVydQSe04NJUqyyEyeEq?si=77634cc57bcb4d89'
]

// User enters 2 songs:
userSongs = ['user-song-1', 'user-song-2']
paddedSongs = [
  'user-song-1',
  'user-song-2', 
  'https://open.spotify.com/track/1rEVydQSe04NJUqyyEyeEq?si=77634cc57bcb4d89'
]

// User enters 3 songs:
userSongs = ['user-song-1', 'user-song-2', 'user-song-3']
paddedSongs = ['user-song-1', 'user-song-2', 'user-song-3'] // No padding needed
```

### Benefits

1. ✅ **Seamless UX**: No warning dialogs or confirmations
2. ✅ **Consistent API**: Always sends exactly 3 songs
3. ✅ **Hidden Default**: Users don't see the default song in the UI
4. ✅ **Simplified Code**: Removed complex warning logic
5. ✅ **Guaranteed Playlist**: Party playlist always has enough songs

### Backend Considerations

The backend will now always receive exactly 3 songs per submission:
- User's actual song choices (1-3)
- Default song filling remaining slots
- No empty/null entries in the array

This ensures consistent data structure and prevents any issues with playlist generation.

## Default Song Details

**Song**: https://open.spotify.com/track/1rEVydQSe04NJUqyyEyeEq?si=77634cc57bcb4d89

This song will be used to fill any missing entries, ensuring the party playlist has variety even when users submit fewer than 3 songs.
