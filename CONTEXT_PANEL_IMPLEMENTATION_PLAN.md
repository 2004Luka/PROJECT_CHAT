# Context Panel Implementation Plan

## Overview
Make the RightPanel (Context Panel) fully functional with 4 tabs: Pinned Messages, Code Snippets, Files, and Scratchpad.

---

## 📌 TAB 1: PINNED MESSAGES

### Backend Changes Required:

#### 1.1 Update Message Model
**File:** `backend/models/message.model.js`
- Add `isPinned: { type: Boolean, default: false }`
- Add `pinnedBy: { type: ObjectId, ref: 'User' }`
- Add `pinnedAt: { type: Date }`

#### 1.2 Create Pin/Unpin Endpoints
**File:** `backend/controllers/message.controller.js`
- `pinMessage(req, res)` - Pin a message
- `unpinMessage(req, res)` - Unpin a message
- `getPinnedMessages(req, res)` - Get all pinned messages for a conversation

**File:** `backend/routs/message.routes.js`
- `POST /api/messages/:messageId/pin` - Pin message
- `DELETE /api/messages/:messageId/pin` - Unpin message
- `GET /api/messages/:conversationId/pinned` - Get pinned messages

#### 1.3 Socket Events
**File:** `backend/socket/socket.js`
- Emit `messagePinned` event when message is pinned
- Emit `messageUnpinned` event when message is unpinned

### Frontend Changes Required:

#### 1.4 Add Pin Button to Message Component
**File:** `frontend/src/components/messages/Message.jsx`
- Add pin/unpin button in hover actions
- Show pin icon if message is pinned
- Call pin/unpin API on click

#### 1.5 Create Pin Message Hook
**File:** `frontend/src/hooks/usePinMessage.js`
- `pinMessage(messageId)` - Pin a message
- `unpinMessage(messageId)` - Unpin a message
- Handle loading states and errors

#### 1.6 Create Get Pinned Messages Hook
**File:** `frontend/src/hooks/useGetPinnedMessages.js`
- Fetch pinned messages for current conversation
- Auto-refresh when conversation changes
- Listen to socket events for real-time updates

#### 1.7 Update RightPanel - Pinned Tab
**File:** `frontend/src/components/rightpanel/RightPanel.jsx`
- Use `useGetPinnedMessages` hook
- Display actual pinned messages
- Click to scroll to message in chat
- Show unpin option
- Format timestamps properly

---

## 💻 TAB 2: CODE SNIPPETS

### Backend Changes Required:

#### 2.1 Create Code Snippet Model (Optional - can extract from messages)
**File:** `backend/models/codeSnippet.model.js` (NEW)
- `messageId: ObjectId` - Reference to original message
- `conversationId: ObjectId` - Reference to conversation
- `code: String` - The code content
- `language: String` - Detected/specified language
- `title: String` - Optional title
- `author: ObjectId` - Who shared it
- `createdAt: Date`

**OR** Extract from messages on-the-fly (simpler approach)

### Frontend Changes Required:

#### 2.2 Create Code Extraction Utility
**File:** `frontend/src/utils/extractCodeBlocks.js` (NEW)
- Parse messages for code blocks (```language\ncode\n```)
- Extract language and code
- Return array of code snippets

#### 2.3 Create Get Code Snippets Hook
**File:** `frontend/src/hooks/useGetCodeSnippets.js` (NEW)
- Get all messages for conversation
- Extract code blocks using utility
- Group by language
- Sort by date

#### 2.4 Update RightPanel - Code Tab
**File:** `frontend/src/components/rightpanel/RightPanel.jsx`
- Use `useGetCodeSnippets` hook
- Display code snippets with syntax highlighting
- Show language badge
- Click to view full code or jump to message
- Add copy button for each snippet

---

## 📎 TAB 3: FILES

### Backend Changes Required:

#### 3.1 Create File Model
**File:** `backend/models/file.model.js` (NEW)
- `messageId: ObjectId` - Reference to message
- `conversationId: ObjectId` - Reference to conversation
- `fileName: String`
- `fileType: String` (MIME type)
- `fileSize: Number` (bytes)
- `fileUrl: String` - Storage URL/path
- `uploadedBy: ObjectId` - User who uploaded
- `createdAt: Date`

#### 3.2 Update Message Model
**File:** `backend/models/message.model.js`
- Add `attachments: [{ type: ObjectId, ref: 'File' }]` - Array of file references

#### 3.3 Create File Upload Endpoint
**File:** `backend/controllers/file.controller.js` (NEW)
- `uploadFile(req, res)` - Handle file upload
- Use multer for file handling
- Store files (local storage or cloud storage)
- Save file metadata to database
- Associate with message

#### 3.4 Create File Routes
**File:** `backend/routs/file.routes.js` (NEW)
- `POST /api/files/upload` - Upload file
- `GET /api/files/:fileId` - Download file
- `GET /api/files/conversation/:conversationId` - Get all files in conversation
- `DELETE /api/files/:fileId` - Delete file

#### 3.5 Update Message Controller
**File:** `backend/controllers/message.controller.js`
- Modify `sendMessage` to handle file attachments
- Accept `fileIds` array in request body

### Frontend Changes Required:

#### 3.6 Update MessageInput Component
**File:** `frontend/src/components/messages/MessageInput.jsx`
- Implement actual file upload functionality
- Show upload progress
- Display attached files before sending
- Remove file option

#### 3.7 Create File Upload Hook
**File:** `frontend/src/hooks/useUploadFile.js` (NEW)
- Handle file selection
- Upload to backend
- Return file ID
- Handle errors and progress

#### 3.8 Create Get Files Hook
**File:** `frontend/src/hooks/useGetFiles.js` (NEW)
- Fetch files for current conversation
- Auto-refresh when conversation changes

#### 3.9 Update Message Component
**File:** `frontend/src/components/messages/Message.jsx`
- Display file attachments
- Show file icon, name, size
- Click to download/view

#### 3.10 Update RightPanel - Files Tab
**File:** `frontend/src/components/rightpanel/RightPanel.jsx`
- Use `useGetFiles` hook
- Display file list with metadata
- Click to download
- Show file type icons
- Format file sizes

---

## 📝 TAB 4: SCRATCHPAD

### Frontend Changes Only (Local Storage):

#### 4.1 Create Scratchpad Hook
**File:** `frontend/src/hooks/useScratchpad.js` (NEW)
- Save notes to localStorage
- Key: `scratchpad_${conversationId}`
- Auto-save on change (debounced)
- Load notes when conversation changes
- Clear notes option

#### 4.2 Update RightPanel - Scratchpad Tab
**File:** `frontend/src/components/rightpanel/RightPanel.jsx`
- Use `useScratchpad` hook
- Auto-save functionality
- Show save indicator
- Clear button
- Character count (optional)

---

## 🔄 IMPLEMENTATION ORDER (Recommended)

### Phase 1: Quick Wins (Frontend Only)
1. ✅ **Scratchpad** - Easiest, uses localStorage only
2. ✅ **Code Snippets** - Extract from existing messages

### Phase 2: Core Features
3. ✅ **Pinned Messages** - Requires backend changes
4. ✅ **Files** - Most complex, requires file storage

---

## 📋 DETAILED TASKS CHECKLIST

### Phase 1: Scratchpad
- [ ] Create `useScratchpad.js` hook
- [ ] Update RightPanel scratchpad tab
- [ ] Add auto-save with debounce
- [ ] Add clear button
- [ ] Test persistence across conversations

### Phase 2: Code Snippets
- [ ] Create `extractCodeBlocks.js` utility
- [ ] Create `useGetCodeSnippets.js` hook
- [ ] Update RightPanel code tab
- [ ] Add syntax highlighting
- [ ] Add copy button
- [ ] Add click to jump to message

### Phase 3: Pinned Messages
- [ ] Update Message model (backend)
- [ ] Create pin/unpin endpoints (backend)
- [ ] Add socket events (backend)
- [ ] Create `usePinMessage.js` hook (frontend)
- [ ] Create `useGetPinnedMessages.js` hook (frontend)
- [ ] Add pin button to Message component
- [ ] Update RightPanel pinned tab
- [ ] Add scroll to message functionality

### Phase 4: Files
- [ ] Create File model (backend)
- [ ] Update Message model (backend)
- [ ] Create file upload controller (backend)
- [ ] Create file routes (backend)
- [ ] Set up file storage (local/cloud)
- [ ] Create `useUploadFile.js` hook (frontend)
- [ ] Create `useGetFiles.js` hook (frontend)
- [ ] Update MessageInput for file uploads
- [ ] Update Message component to show files
- [ ] Update RightPanel files tab
- [ ] Add file download functionality

---

## 🎯 PRIORITY FEATURES

### Must Have:
1. ✅ Scratchpad (localStorage)
2. ✅ Code Snippets (extract from messages)
3. ✅ Pinned Messages (basic pin/unpin)

### Nice to Have:
4. ✅ Files (full upload/download)
5. ✅ Code snippet syntax highlighting
6. ✅ File preview
7. ✅ Search within context panel

---

## 🔧 TECHNICAL CONSIDERATIONS

### File Storage Options:
1. **Local Storage** (Development)
   - Store in `backend/uploads/` folder
   - Simple, no external dependencies
   
2. **Cloud Storage** (Production)
   - AWS S3, Cloudinary, or similar
   - Better scalability

### Code Highlighting:
- Use `react-syntax-highlighter` or `prism-react-renderer`
- Or simple regex-based highlighting (already implemented)

### Real-time Updates:
- Use existing Socket.io setup
- Emit events for pin/unpin, file uploads
- Listen in hooks for auto-refresh

---

## 📝 NOTES

- All features should respect the high-contrast dark mode design
- Use existing hooks pattern for consistency
- Follow existing error handling patterns
- Add loading states for all async operations
- Test with multiple conversations
- Consider performance for large message histories

