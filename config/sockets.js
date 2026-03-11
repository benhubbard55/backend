module.exports.sockets = {
    // transports: [ 'websocket' ],

    // beforeConnect: function(handshake, proceed) {

    //   // `true` allows the socket to connect.
    //   // (`false` would reject the connection)
    //   return proceed(undefined, true);

    // },

    afterDisconnect: async function (session, socket, done) {
        if (!session || typeof session !== "object") {
            session = {}; // Use an empty session
        }
        if (socket?.id) {
            await UserOnlineStatusManage(socket.id);
        }
        return done();
    },

    // async onConnect(session, socket) {
    //     sails.onlineUsers = sails.onlineUsers || {};
    //     sails.onlineUsers[socket.id] = true;

    //     const headers = socket.handshake.headers;
    //     // console.log('headers', headers)

    //     await UserOnlineStatusManage(socket.id, false, true)
    //     sails.sockets.broadcast('user', 'online', { userId: socket.id });
    // },

    // grant3rdPartyCookie: true,
};

async function UserOnlineStatusManage(socketId) {
    try {
        var userData = await User.update({ socketId: socketId }).set({
            isUserOnline: false,
            socketId: null,
        });

        sails.sockets.blast("message", {
            action: "userIsOffline",
            data: {
                userId: userData[0]["id"],
                name: userData[0]["name"],
            },
            message: sails.__("User is Offline"),
        });
    } catch (e) { }
    return;
}
