# SharedList

Share real-time synced grocery list built on Meteor.

## Overview

- Users can sign up and create multiple lists.
- You can share your list with other users, and you both can make updates.

The app is based on the following libraries & tools:

- `Meteor`
- `React`
- `MongoDB`
- `Mocha`
- `expect`

## Getting Started

This app requires you to have Meteor installed on your machine. Then you can clone the repo and run the following:

```
meteor npm install
```

```
meteor
```

These commands will set you up to run the app locally, using :

```
meteor run
```

## Testing

Testinf structure is BDD.The testing framework used is `Mocha`, assertions were made using `expect` package.
To run tests:

```
npm run test
```

The test are divided into 2 parts.

### Client-side testing

Using `enzyme`.

### Server-side testing

Each method is tested for both owner of list and collaborator (add by the owner) of list.








