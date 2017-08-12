# ChitChat

[ChitChat live][heroku]

[heroku]: http://www.chitchat-app.co
ChitChat is a full-stack web application inspired by Slack.  It utilizes a Node.js and Express.js backend, a MongoDB database, React.js with a Redux architectural framework on the frontend, and Socket.io for real-time chat.

## Features & Implementation

  ChitChat has several major features:

  1. User account creation and authentication with JWTs
  2. Users can create and view different channels, along with adding specific users to join in on the discussion
  3. Users can create either one-on-one or multi-person private messages
  4. Users can chat with each other in real-time with notifications
  5. Users can add emojis to their messages or have emoji reactions to other users' messages
  6. Users can add gifs to their messages (from Giphy) through a search tool or through smart Giphy integration



### User authentication

  User authentication is provided through JWTs. JWT-based auth (vs something like session-based auth) was chosen due to its compact nature (faster transmission) as well as the fact that its self-contained (i.e. stateless, so the DB only has to be queried once).

  ![image of user auth](/docs/production_images/splash_page.png)


### Channels

  Channels are simply chatrooms that you can create and add specific users to. They can be based on any topics that can bring like-minded users together. Users can switch between these different channels on the fly and have multiple different channels based on a variety of their interests.  

  ![image of channel view](/docs/production_images/channel_view.png)

### Private messaging

  In addition to channels, ChitChat allows you the ability to privately message users.  These are only accessible by the members of the message, and can be both one-on-one chats or multi person chats.

![image of private messaging](/docs/production_images/private_message.png)


### Real-time chat

  The core feature of ChitChat is the ability to message with other users in real-time.  This was achieved through the socket.io library, and allows seamless communication in both your private messages and your channels.

  When we create a message, we use the .then() method from our API call's returned Promise to make sure that we only perform our socket broadcast upon a successful call to the server. In our success callback, we then emit an event that our socket on the server-side will be listening for, and pass it an object with the appropriate data (our message, and the channel our message is in).
  ```javascript
this.props.createMessage(msg).then((createdMsg) => {
    this.props.scrollToBottom();
    this.props.socket.emit('broadcast message',
    { message: createdMsg, channel: this.state.channelId });
});
  ```

  The server listens for this event, and uses the incoming data to broadcast the message to all other connected users to the specific 'room' (or channel) that the message was created in. Notifications are also broadcasted to every connected user.
  ```javascript
socket.on('broadcast message', function(data){
    socket.broadcast.to(data.channel).emit('receive message', data);
    socket.broadcast.emit('receive notification', data.channel);
});
  ```

  Finally in our ChatList view component, we listen for the socket event emitted from our server, and use the appropriate data (the created message), and dispatch an action (addMessage in this case) in order to update our state.  
  ```javascript
this.props.socket.on('receive message', (payload) => {
    self.props.addMessage(payload.message.message);
    this.scrollToBottom();
});
  ```

  Socket integration allows us to receive messages in real-time along with notifications.

![gif of chat](/docs/production_images/giphy.gif)

### Emoji messages and reactions

  A fun way to express your feelings nowadays is through the use of emojis, and ChitChat allows you to do just this through the use of react-emoji and react-emoji-picker.  You can use emojis in your chat messages or even have reactions to other users' messages if you happen to find them funny, sad, rage-inducing, etc.

![image of tag drawer](/docs/production_images/emojis.png)

### Giphy integration

  Moving pictures are worth a thousand words, so ChitChat allows you to integrate gifs into your chat through 3rd party API Giphy integration.  Users can either search for gifs through a search tool and pick a specfic gif, or use smart Giphy translate by typing the special command '/giphy ' followed by a search term.

  In order to translate our Gif, we first make use of our API utility function Giphy.translateToGif() that makes a 3rd party API call to Giphy using a search term and returns the appropriate JSON. We return a native Promise in order to use .then() in a later function.
  ```javascript
translateGif(){
    const searchTerm = this.state.content.split(' ').slice(1).join(' ');

    return new Promise((resolve, reject) => {
        Giphy.translateToGif(searchTerm).then((giphy) => {
          return resolve('giphy:' + giphy.data.images.fixed_height.url + ' ' + searchTerm);
        });
    });
}
  ```

  In our handleKeyPress function, we check to see if our method starts with our special key word '/giphy '...if so we call the function above.  Since we only want to call createMessage() once we have the Giphy data, we returned a Promise above.  Thus, we're able to use .then() and call create our message in the success callback using the custom data returned from our API call to Giphy.
  ```javascript
// handleKeyPress function

if(this.state.content.startsWith('/giphy ')){
    this.translateGif().then((custom) => {
      this.createMessage(custom);
    });
}
  ```

  ![image of Giphy integration](/docs/production_images/giphy_prod_gif.gif)

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for ChitChat are outlined below.

### Chat bot

Bots, AI, and machine learning are subjects that interest me greatly and I would love to implement a chat-bot in a future iteration of ChitChat.
