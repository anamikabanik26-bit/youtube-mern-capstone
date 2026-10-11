# Manual Testing Checklist

Use the browser UI and/or Thunder Client. Keep a record of real test results and screenshots.

## Backend health and authentication
- [ ] `GET http://localhost:5000/api/health` returns 200.
- [ ] Register with valid username/email/password returns 201.
- [ ] Invalid email and short password return 400 with helpful messages.
- [ ] Duplicate email returns 409.
- [ ] Login with correct credentials returns token and public user; wrong password returns 401.
- [ ] `GET /api/auth/me` works with a valid bearer token and returns 401 without it.

## Home/search/filter
- [ ] Home page shows seed videos after running `npm run seed`.
- [ ] Search by a distinctive word in a video title.
- [ ] Test All, Technology, Education, Music, Gaming, Science, News and Entertainment filters.
- [ ] Open a video card and verify player, title, description and channel are shown.

## Channel and videos
- [ ] Signed-in user creates a channel; a second channel for the same user is rejected.
- [ ] Upload a video with title and video URL.
- [ ] Verify it appears on home page and channel page.
- [ ] Edit the video title/description and verify changes.
- [ ] Delete the video and verify it no longer appears.
- [ ] Attempt to edit/delete another user's video; API should deny it.

## Reactions and comments
- [ ] Like a video; like count changes.
- [ ] Dislike the same video; dislike count changes and like is removed for that user.
- [ ] Add a comment, edit it, then delete it.
- [ ] Confirm an unauthenticated comment/reaction is rejected.

## Responsive design and final submission
- [ ] Check at desktop, tablet and mobile viewport widths.
- [ ] Verify sidebar toggle and navigation.
- [ ] Capture genuine screenshots of tested features.
- [ ] Record a short demo video showing the application working.
- [ ] Add GitHub URL and setup instructions to README.
