# @kendelchopp/pdga-api
## Disclaimer
This project has **NO AFFILIATION** with the PDGA.

## Getting Started
### API Permission
You must get permission to use the PDGA API from the PDGA. You must also adhere to their use guidelines. You can find more information on that at https://www.pdga.com/dev.

Once you have permission, you will be able to use this package and all of its functionality.

### Install The Package
```bash
npm install --save @kendelchopp/pdga-api
```

## Guide
For a small demo project see: https://github.com/KendelChopp/pdga-api-demo

**Note**: All examples are working under the assumption you import this package as PdgaApi. For example:

```javascript
const PdgaApi = require('@kendelchopp/pdga-api');
```

### Authentication
To authenticate, you must make a `login` call. You can either call `login` with a username and password, or with a session name and session id. This is an asynchronous call, and you should wait for this call to finish before trying to make further calls.

#### Username/Password
```javascript
PdgaApi.login({
  username: 'My Cool Username',
  password: 'My Fancy Secret Password'
});
```

#### Session Name/ID
This might be wise if you are doing the authentication elsewhere and want to retain the same session name and id. If you use this method, no network requests will be required for the login.

```javascript
PdgaApi.login({
  sessionName: 'some-session-name',
  sessionId: 'some-session-id'
});
```

### Courses
Allows you to read courses. Currently, they only have search functionality.

#### Search
```javascript
const courses = await PdgaApi.Course.search({
  stateProv: 'VA'
});
```

### Events
Allows you to read events/tournaments. Currently, they only have search functionality.

#### Search
```javascript
const tournaments = await PdgaApi.Event.search({
  tier: 'NT,M',
  startDate: '2022-01-01'
});
```

### Players
Allows you to read players and their stats. Currently, they have search functionality and stats.

#### Search
```javascript
const players = await PdgaApi.Player.search({
  pdgaNumber: '180146'
});
```

#### Stats
```javascript
// Get stats for a particular player
const players = await PdgaApi.Player.search({
  pdgaNumber: '180146'
});
const player = players[0];
const stats = await player.getStats();

// Search for a player and get stats
const searchedStats = await PdgaApi.Player.searchStats({
  pdgaNumber: '180146'
});
```
