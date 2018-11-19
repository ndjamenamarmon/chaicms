# ChaiCMS

A React CMS for the JAMstack.

## Roadmap

- **Phase I: User authentication, content types, fields, entries**
- Phase II: Initial Release - Media - Upload, edit, storage, use in entries
- Phase III: Workflows and Versioning
- Phase IV: Build a back-end API to handle CRUD actions and hook into different types of databases

## TO DO

- [ ] Write tests for all components, actions, reducers
- [x] Create site fields functionality and attach to content types
- [ ] Improve site field attachment to content type functionality and UX
- [ ] Create default content types (pages, posts) on init
- [x] Enforce uniqueness of API keys
- [x] Enforce uniqueness of unique fields in entries
- [x] Enforce requirement of required fields in entries
- [x] Create content functionality
- [ ] Add meta data to content types: date created, date modified, author
- [ ] Add media functionality - upload, simple image editing
- [ ] Allow upload of image for splash screen or solid color
- **[ ] More robust user authentication with invite links, etc**
- [x] Look into using Hooks
- [ ] Build a REST API with Express to handle all CRUD actions
- [x] Change sidebar to slide in menu
- [ ] Add draft/publish functionality to entries (implement workflows)
- [ ] Add version history to entries
- **[ ] Add ordering of fields for content types**
- [ ] Push form errors in array of objects so multiple errors can be displayed at once (entry form)
- [ ] Fix Markdown editor (need images to work)
- [ ] Add Rich HTML field and editor
- [ ] When checking uniqueness of fields and api keys, check the database before submit
- [ ] Only set state with information the user has permission to see; for example, members should not have invite codes in their React state
- [ ] Implement server side security: rules in firebase (back-end API would handle it in the future)
