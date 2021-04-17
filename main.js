require.config({
    waitSeconds: 60,
    paths: {
        'sdk': uiBuilderSDKPath + '/sdk',
    }
});

define(['sdk'], BackendlessUI => BackendlessUI.startApp());

define('./functions/71c90b7681f2c8b9eb72624de9567aa7/code.js', () => { 

var currentUser, error, errorCode;



BackendlessUI.Functions.Custom['loadCurrentUser'] = async function loadCurrentUser(appData) {
    if (!(await BackendlessUI.Functions.Custom['getCurrentUser'](appData))) {
    try {
      currentUser = (await Backendless.UserService.getCurrentUser());

    } catch (error) {
      errorCode = (error['code']);
      if (errorCode == 3064) {
        await Backendless.UserService.logout()
      }
      console.log(error);

    }
    appData['currentUser'] = currentUser;
  }



}

})
define('./functions/c4e97af1f13356084877663da10b7363/code.js', () => { 

BackendlessUI.Functions.Custom['getCurrentUser'] = async function getCurrentUser(appData) {


  return (appData['currentUser'])
}

})
define('./pages/404/components/902c9641de4ec9e73427e7192a118d14/bundle.js', [], () => ({
  /* content */

  /* handler:onClick */
  async onClick(___arguments) {
      ;await ( async function (pageName, pageData){ BackendlessUI.goToPage(pageName, pageData) })('', null);

  },  
/* handler:onClick *//* content */
}));

define('./pages/chat/components/page/bundle.js', [], () => ({
  /* content */

  /* handler:onEnter */
  async onEnter(___arguments) {
      await BackendlessUI.Functions.Custom['loadCurrentUser'](___arguments.context.appData)
  if (!(await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData))) {
    ;await ( async function (pageName){ BackendlessUI.goToPage(pageName) })('landing');
  } else {
    ___arguments.context.pageData['currentLocation'] = (await ( async function (){ return new Promise(resolve => navigator.geolocation.getCurrentPosition(p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }))) })())
  }

  },  
/* handler:onEnter */
/* content */
}));

define('./pages/chat/components/222914427ab8caf9ccb26d9331f9ea99/bundle.js', [], () => ({
  /* content */

  /* handler:onSubmit */
  async onSubmit(___arguments) {
    var currentLocation, message, appUsername;


  appUsername = ((await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData))['username']);
  currentLocation = (___arguments.context.pageData['currentLocation']);
  message = (___arguments.context.dataModel['message']);
  if (message) {
    ___arguments.context.dataModel['message'] = '';
    await Backendless.Messaging.publish('default', ({ 'username': appUsername,'message': message,'lat': (currentLocation['lat']),'lng': (currentLocation['lng']) }), new Backendless.PublishOptions({ subtopic: '' }), new Backendless.DeliveryOptions({ publishPolicy: 'PUBSUB' }));
  }

  },  
  /* handler:onSubmit *//* content */
}));

define('./pages/chat/components/d0292826e5d48b277e8221d63f75b556/bundle.js', [], () => ({
  /* content */

  /* handler:onContentAssignment */
  async onContentAssignment(___arguments) {
    var currentUserName, currentUser;


  currentUser = (await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData));
  if (currentUser) {
    currentUserName = (currentUser['username']);
  }

  return currentUserName

  },  
/* handler:onContentAssignment *//* content */
}));

define('./pages/chat/components/27aa0363fcadd775649ca32eccead29e/bundle.js', [], () => ({
  /* content */

  /* handler:onPointsAssignment */
  onPointsAssignment(___arguments) {
      return (___arguments.context.getComponentDataStoreByUid('cb8a6da6ad05d1735f21d545ec2bbd19')['points'])

  },  
/* handler:onPointsAssignment *//* content */
}));

define('./pages/chat/components/73712c1793d263f9c8dcdfd451233039/bundle.js', [], () => ({
  /* content */

  /* handler:onClick */
  async onClick(___arguments) {
      await Backendless.UserService.logout()
  ___arguments.context.appData['currentUser'] = null
  ;await ( async function (pageName){ BackendlessUI.goToPage(pageName) })('landing');

  },  
/* handler:onClick *//* content */
}));

define('./pages/chat/components/cb8a6da6ad05d1735f21d545ec2bbd19/bundle.js', [], () => ({
  /* content */

  /* handler:onBeforeMount */
  onBeforeAppear(___arguments) {
    var messageData, messages, points, message;

function addItemToList(l, v) { Array.prototype.push.apply(l, Array.isArray(v) ? v : [v]);return l;}

function defineGlobalScope() { const root = (typeof window !== 'undefined' ? window : global);root.codelessScope = root.codelessScope || {};return root.codelessScope;}

function getGlobalEntitiesMap(mapName) { const globalScope = defineGlobalScope();return globalScope[mapName] = globalScope[mapName] || {};}

function getChannelInstance(channelName) { const channelsMap = getGlobalEntitiesMap('channels');if(!channelsMap[channelName] || !channelsMap[channelName].connection) { channelsMap[channelName] = Backendless.Messaging.subscribe(channelName); }return channelsMap[channelName];}

function getRTSubscriptions() { const subs = getGlobalEntitiesMap('subscriptions');subs.map = subs.map || {};subs.remove = subs.remove || (subId => { if (subs.map[subId]) { subs.map[subId](); delete subs.map[subId];} });subs.add = subs.add || ((subId, callback) => {    if (subs.map[subId]) { throw new Error(`RT subscription with ID: "${subId}" already exists.`) }    subs.map[subId] = callback; });return subs;}


  ___arguments.context.dataModel['messages'] = [];
  ___arguments.context.dataModel['points'] = [];
  messages = (___arguments.context.dataModel['messages']);
  points = (___arguments.context.dataModel['points']);
  console.log('add messagesSub');

  ;(function() {
    const callback = async message => {
        messageData = (message['message']);
    addItemToList(points, ({ 'autoOpenInfo': true,'infoWindow': ['<b>',(messageData['username']),'</b>: ',(messageData['message'])].join(''),'lat': (messageData['lat']),'lng': (messageData['lng']),'showLabel': true }));
    addItemToList(messages, messageData);

    };

    const channel = getChannelInstance('default');

    const selector = '';
    const options = [callback];

    if (selector) {
       options.unshift(selector);
    }

    channel.addMessageListener.apply(channel, options);

    getRTSubscriptions().add('messagesSub', () => channel.removeMessageListener.apply(channel, options));
  })()

  },  
/* handler:onBeforeMount *//* handler:onBeforeUnmount */
  onBeforeDisappear(___arguments) {
    function defineGlobalScope() { const root = (typeof window !== 'undefined' ? window : global);root.codelessScope = root.codelessScope || {};return root.codelessScope;}

function getGlobalEntitiesMap(mapName) { const globalScope = defineGlobalScope();return globalScope[mapName] = globalScope[mapName] || {};}

function getRTSubscriptions() { const subs = getGlobalEntitiesMap('subscriptions');subs.map = subs.map || {};subs.remove = subs.remove || (subId => { if (subs.map[subId]) { subs.map[subId](); delete subs.map[subId];} });subs.add = subs.add || ((subId, callback) => {    if (subs.map[subId]) { throw new Error(`RT subscription with ID: "${subId}" already exists.`) }    subs.map[subId] = callback; });return subs;}


  console.log('remove messagesSub');
  getRTSubscriptions().remove('messagesSub');;

  },  
/* handler:onBeforeUnmount */
/* content */
}));

define('./pages/chat/components/db8e872ab8c674ae309410e4a91151d6/bundle.js', [], () => ({
  /* content */

  
/* handler:onDisplayAssignment */
  async onDisplayAssignment(___arguments) {
      return (!((___arguments.context.pageData['currentLocation']) && (await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData))))

  },  
/* handler:onDisplayAssignment *//* content */
}));

define('./pages/chat/components/0361d15231333a8ce8a69a336a98aba1/bundle.js', [], () => ({
  /* content */


  /* handler:onBeforeMount */
  async onBeforeAppear(___arguments) {
    var user, commandSender, users, currentUserId, command, createdUser, updatedUser;

function defineGlobalScope() { const root = (typeof window !== 'undefined' ? window : global);root.codelessScope = root.codelessScope || {};return root.codelessScope;}

function getGlobalEntitiesMap(mapName) { const globalScope = defineGlobalScope();return globalScope[mapName] = globalScope[mapName] || {};}

function getRTSubscriptions() { const subs = getGlobalEntitiesMap('subscriptions');subs.map = subs.map || {};subs.remove = subs.remove || (subId => { if (subs.map[subId]) { subs.map[subId](); delete subs.map[subId];} });subs.add = subs.add || ((subId, callback) => {    if (subs.map[subId]) { throw new Error(`RT subscription with ID: "${subId}" already exists.`) }    subs.map[subId] = callback; });return subs;}

function addItemToList(l, v) { Array.prototype.push.apply(l, Array.isArray(v) ? v : [v]);return l;}

function getChannelInstance(channelName) { const channelsMap = getGlobalEntitiesMap('channels');if(!channelsMap[channelName] || !channelsMap[channelName].connection) { channelsMap[channelName] = Backendless.Messaging.subscribe(channelName); }return channelsMap[channelName];}

/**
 * Describe this function...
 */
async function isUserExist(user) {
  return (users.map(item => item['objectId'])).includes((user['objectId']))
}

function stopSetTimeout(timerId) {  const timers = getGlobalEntitiesMap('setTimeouts'); if (timerId && timers[timerId]) {    clearTimeout(timers[timerId]);    delete timers[timerId]; }}

function runSetTimeout(timerId, callback, delay) {  const timers = getGlobalEntitiesMap('setTimeouts'); const timer = setTimeout(callback, delay); if (timerId) {  stopSetTimeout(timerId);  timers[timerId] = timer }}

/**
 * Describe this function...
 */
async function toggleTypingState(user) {
  user['isTyping'] = true;

  ;(function() {
    const callback = async () => {
        user['isTyping'] = false;

    };

    const timerId = (String('isTypingTimer-') + String(user['objectId']));
    const timerDelay = 1000;

    runSetTimeout(timerId, callback, timerDelay)
  })()
}


  ___arguments.context.dataModel['users'] = (JSON.parse((JSON.stringify((await Backendless.Data.of('Users').find(Backendless.DataQueryBuilder.create().setPageSize(100)))))));
  users = (___arguments.context.dataModel['users']);
  currentUserId = ((await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData))['objectId']);

  ;(function() {
    const callback = async updatedUser => {
        for (var user_index in users) {
      user = users[user_index];
      if ((updatedUser['objectId']) == (user['objectId'])) {
        Object.assign(user, updatedUser);
      }
    }

    };

    const rtHandlers = Backendless.Data.of('Users').rt();

    const whereClause = '';
    const options = [callback];

    if (whereClause) {
       options.unshift(whereClause);
    }

    rtHandlers.addUpdateListener.apply(rtHandlers, options);

    getRTSubscriptions().add('usersUpdateListener', () => rtHandlers.removeUpdateListener(callback));

  })()

  ;(function() {
    const callback = async createdUser => {
        if (!await isUserExist(createdUser)) {
      addItemToList(users, createdUser);
    }

    };

    const rtHandlers = Backendless.Data.of('Users').rt();

    const whereClause = '';
    const options = [callback];

    if (whereClause) {
       options.unshift(whereClause);
    }

    rtHandlers.addCreateListener.apply(rtHandlers, options);

    getRTSubscriptions().add('usersCreateListener', () => rtHandlers.removeCreateListener(callback));

  })()

  ;(function() {
    const callback = async command => {
        if ((command['type']) == 'user is typing') {
      commandSender = (command['userId']);
      if (commandSender != currentUserId) {
        for (var user_index2 in users) {
          user = users[user_index2];
          if ((user['objectId']) == commandSender) {
            await toggleTypingState(user);
            break;
          }
        }
      }
    }

    };

    const channel = getChannelInstance('default');

    const subId = 'usersTypingCommandListener';

    channel.addCommandListener(callback);

    getRTSubscriptions().add('usersTypingCommandListener', () => channel.removeCommandListeners(options));
  })()

  },  
/* handler:onBeforeMount *//* handler:onBeforeUnmount */
  async onBeforeDisappear(___arguments) {
    function defineGlobalRTScope() {
      const root = (typeof window !== 'undefined' ? window : global);
      root.codelessRTScope = root.codelessRTScope || {};
      return root.codelessRTScope;
    }

    function getRTEntitiesMap(mapName) {
      const globalRTScope = defineGlobalRTScope();
      return globalRTScope[mapName] = globalRTScope[mapName] || {};
    }

    function getRTSubscriptions() {
      const subs = getRTEntitiesMap('subscriptions');
      subs.map = subs.map || {};
      subs.remove = subs.remove || (subId => {
        if (subs.map[subId]) {
          subs.map[subId]();
          delete subs.map[subId];
        }
      });
      subs.add = subs.add || ((subId, callback) => {
        if (subs.map[subId]) {
          throw new Error(`RT subscription with ID: "${subId}" already exists.`)
        }
        subs.map[subId] = callback;
      });
      return subs;
    }


    getRTSubscriptions().remove('usersUpdateListener');
    ;
    getRTSubscriptions().remove('usersCreateListener');
    ;
    getRTSubscriptions().remove('usersTypingCommandListener');
    ;

  },
  /* handler:onBeforeUnmount */
/* content */
}));

define('./pages/chat/components/4ce227124015185deb189bf933a33926/bundle.js', [], () => ({
  /* content */

  /* handler:onContentAssignment */
  async onContentAssignment(___arguments) {
    var user, currentUserObjectId, currentUser;


  user = ___arguments.context.getComponentDataStoreByUid('95af91783da5053a184c19ada36ab7b2');
  currentUser = (await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData));
  currentUserObjectId = currentUser && (currentUser['objectId']);

  return (currentUserObjectId == (user['objectId']) ? '(you)' : ((user['online']) ? 'online' : 'offline'))

  },  
/* handler:onContentAssignment *//* handler:onDisplayAssignment */
  onDisplayAssignment(___arguments) {
      return (!(___arguments.context.getComponentDataStoreByUid('95af91783da5053a184c19ada36ab7b2')['isTyping']))

  },  
/* handler:onDisplayAssignment *//* content */
}));

define('./pages/chat/components/1573ed51a976fec22559f974b9bc9d4d/bundle.js', [], () => ({
  /* content */

  /* handler:onListItemsAssignment */
  async onListItemsAssignment(___arguments) {
      return ((await (async function (componentId){ return ___arguments.context.getComponentDataStoreById(componentId) })('Workspace'))['messages'])

  },  
/* handler:onListItemsAssignment *//* handler:onDynamicItemsAssignment */
  onDynamicItemsAssignment(___arguments) {
      return (___arguments.context.getComponentDataStoreByUid('cb8a6da6ad05d1735f21d545ec2bbd19')['messages'])

  },  
/* handler:onDynamicItemsAssignment *//* content */
}));

define('./pages/chat/components/4b759b87cd111534fad9f19ab3a350ad/bundle.js', [], () => ({
  /* content */

  /* handler:onContentAssignment */
  onContentAssignment(___arguments) {
      return (String(___arguments.context.getComponentDataStoreByUid('f0310d9161a1f45c7c4a6bc537c273a2')['username']) + String(': '))

  },  
/* handler:onContentAssignment *//* content */
}));

define('./pages/chat/components/cf1749e3be6e3fcf0c1585f52da63d5f/bundle.js', [], () => ({
  /* content */

  /* handler:onChange */
  async onChange(___arguments) {
    function defineGlobalScope() { const root = (typeof window !== 'undefined' ? window : global);root.codelessScope = root.codelessScope || {};return root.codelessScope;}

function getGlobalEntitiesMap(mapName) { const globalScope = defineGlobalScope();return globalScope[mapName] = globalScope[mapName] || {};}

function getChannelInstance(channelName) { const channelsMap = getGlobalEntitiesMap('channels');if(!channelsMap[channelName] || !channelsMap[channelName].connection) { channelsMap[channelName] = Backendless.Messaging.subscribe(channelName); }return channelsMap[channelName];}


  await (getChannelInstance('default')).send('user is typing', '');

  },  
/* handler:onChange *//* content */
}));

define('./pages/chat/components/3aed9c98df6f4d3f76466c26cdbbefd4/bundle.js', [], () => ({
  /* content */

  /* handler:onDisplayAssignment */
  async onDisplayAssignment(___arguments) {
      return ((___arguments.context.pageData['currentLocation']) && (await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData)))

  },  
/* handler:onDisplayAssignment *//* content */
}));

define('./pages/landing/components/page/bundle.js', [], () => ({
  /* content */

  /* handler:onEnter */
  async onEnter(___arguments) {
      await BackendlessUI.Functions.Custom['loadCurrentUser'](___arguments.context.appData)
  ;await ( async function (pageName){ BackendlessUI.goToPage(pageName) })(((await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData)) ? 'chat' : 'login'));

  },  
/* handler:onEnter *//* content */
}));

define('./pages/login/components/page/bundle.js', [], () => ({
  /* content */

  /* handler:onEnter */
  async onEnter(___arguments) {
      await BackendlessUI.Functions.Custom['loadCurrentUser'](___arguments.context.appData)
  if (await BackendlessUI.Functions.Custom['getCurrentUser'](___arguments.context.appData)) {
    ;await ( async function (pageName){ BackendlessUI.goToPage(pageName) })('chat');
  }

  },  
/* handler:onEnter *//* content */
}));

define('./pages/login/components/e13c78778b412de8d2c2d4ad9f421133/bundle.js', [], () => ({
  /* content */

  /* handler:onSubmit */
  async onSubmit(___arguments) {
    var user, error, password, username, stayLoggedIn, logging, loginButton;

/**
 * Describe this function...
 */
async function setError(error) {
  ((function (componentUid){ return ___arguments.context.getComponentDataStoreByUid(componentUid) })('e13c78778b412de8d2c2d4ad9f421133'))['error'] = error;
}

/**
 * Describe this function...
 */
async function register() {
  await Backendless.UserService.register( new Backendless.User({ 'username': username,'password': password }) );
}

/**
 * Describe this function...
 */
async function login() {
  try {
    user = (await Backendless.UserService.login( username, password, stayLoggedIn  ));

  } catch (error) {
    await setError(error);

  }
}

/**
 * Describe this function...
 */
async function updateLoginButton(logging) {
  loginButton = ((function (componentUid){ return ___arguments.context.getComponentByUid(componentUid) })('359e942fb9f2d5df44939e52ea244ac3'));
  loginButton['label'] = (logging ? 'Please wait...' : 'Log In');
  loginButton['disabled'] = logging;
}


  await setError(null);
  username = (___arguments.context.dataModel['username']).trim();
  password = (___arguments.context.dataModel['password']);
  stayLoggedIn = (___arguments.context.dataModel['stayLoggedIn']);
  if (username && password) {
    await updateLoginButton(true);
    try {
      await register();
      await login();

    } catch (error) {
      if ((error['code']) == 3033) {
        await login();
      } else {
        await setError(error);
      }

    } finally {
      await updateLoginButton(false);

    }
  } else {
    await setError((new Error('Username and Password must be filled')));
  }
  if (user) {
    ___arguments.context.appData['currentUser'] = user;
    ;await ( async function (pageName, pageData){ BackendlessUI.goToPage(pageName, pageData) })('chat', null);
  }

  },  
/* handler:onSubmit */
/* handler:onBeforeMount */
  onBeforeAppear(___arguments) {
      ___arguments.context.dataModel['username'] = '';
  ___arguments.context.dataModel['password'] = '';
  ___arguments.context.dataModel['stayLoggedIn'] = true;

  },  
/* handler:onBeforeMount *//* content */
}));
