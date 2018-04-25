# GitHub OAuth Repo List - Front-end Challenge

## About me

  - Rodrigo Vallades [rodrigo.vallades@gmail.com]
  - GitHub: https://github.com/rodrigovallades
  - Linkedin: http://lnkd.in/p9wz2A

## Challenge requirements

### Login page

- Must have a login button that enables the user to connect with a GitHub account
- When authenticated, must redirect the user automatically to a new page listing the user's repos

### List page

- Only authenticated users have access to this page
- The authenticated session must persist even if the user reloads the page
- When exiting the page, the login expires
- Each repo must show at least this info: name, stars and forks
- The list page should have a specific route

### API

You will need to use these GitHub's endpoints:

- Authentication

https://developer.github.com/v3/guides/basics-of-authentication/#accepting-user-authorization

- Repo listing

https://developer.github.com/v3/repos/#list-your-repositories


## Technologies, techniques and best practices used

- [x] React 16 + Redux 5 + React-Router 4
- [x] ES6
- [x] Persisting OAuth token with sessionStorage
- [x] Flexbox
- [x] Bootstrap 4
- [x] BEM: CSS naming is following (block__element--modifier) pattern
- [x] Mobile first approach: the layout, the dimensions and the font sizes are primarily set for mobile screens and then inscreased as needed for bigger screens

## Getting started

### Installing
```
npm install
```

### Development (run locally)
```
npm start
```

### How to build for production (minify, etc)
```
npm run build
```


Thank you,
Rodrigo
