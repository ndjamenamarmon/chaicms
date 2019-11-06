# ChaiCMS

A React CMS for the JAMstack.

The demo site can be found [here](https://chaicms-staging.herokuapp.com). If you register, you will only have Member permissions which are very stripped down. Please get in touch with me (jamena@webdevabq.com) if you would like Developer permissions.

See the next section to set up a local installation.

Please note that this project is very much in development and there are bugs. Pull requests and new issues are welcome.

## Get Started

To set up a local installation:

1. Fork and clone this GitHub repository
2. You will need to set up a cloud.mongodb.com cluster and get the Mongo URI.
3. Set up an OAuth application on your GitHub with callback `http://localhost:8080/auth/github/callback`.
4. Create a file in server/config called dev.js (do not commit this file). It should house the keys for your dev environment in this format:
```
module.exports = {
  githubClientID: [GitHub Client Id from step 3],
  githubClientSecret: [GitHub client Id from step 4],
  mongoURI:
    [Mongo UIR from step 2],
  cookieKey: [some random key],
  appUrl: "http://localhost:8080"
};
```
5. Run `yarn run dev`

## Roadmap

- [x] Phase I: Content types, fields, entries
- [x] Phase II: User Authentication, user roles, and Nodejs API + MongoDB database
- [ ] Phase III: Media - Upload, edit, storage, use in entries
- [ ] Phase IV: Workflows and Versioning
