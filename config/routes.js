var adminRoutes = {
    // 'GET /': { action: 'common/view-homepage-or-redirect'},
    "GET ": { action: "common/view-homepage-or-redirect" },
    "GET /login": {
        view: "admin/login",
        locals: { layout: "admin/layouts/layout" },
    },

    // Not Secured API
    "POST /login": {
        action: "admin/admin/auth/login",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /logout": {
        action: "admin/admin/auth/logout",
        locals: { layout: "admin/layouts/layout" },
    },

    // Secured Views and APIs
    "GET /dashboard": {
        action: "admin/dashboard/view-index",
        locals: { layout: "admin/layouts/master" },
    },

    // Secured Views and APIs
    "GET /dashboard/analytics": {
        action: "admin/dashboard/analytics",
    },

    // admin
    "GET /admins": {
        action: "admin/admin/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /create": {
        action: "admin/admin/view-create",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /edit/:adminId": {
        action: "admin/admin/view-edit",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /index": { action: "admin/admin/index" }, //getting list of admin with datatable
    "GET /get-details": { action: "admin/admin/get-details" },
    "POST /create": { action: "admin/admin/create" },
    "POST /update/:adminId": {
        action: "admin/admin/update",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /show/:adminId": {
        action: "admin/admin/view-show",
        locals: { layout: "admin/layouts/master" },
    },
    "DELETE /:id": { action: "admin/admin/delete" },

    // user
    "GET /users": {
        action: "admin/user/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /user/create": {
        action: "admin/user/view-create",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /user/edit/:userId": {
        action: "admin/user/view-edit",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /user/show/:userId": {
        action: "admin/user/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /user/index": { action: "admin/user/index" }, //getting list of admin with datatable
    "POST /user/create": { action: "admin/user/create" },
    "POST /user/update/:id": { action: "admin/user/update" },
    "DELETE /user/:id": { action: "admin/user/delete" },
    "GET /user/status-change/:userId": { action: "admin/user/status-change" },
    "GET /user/music/index/:userId": { action: "admin/user/music-index" }, //getting list of admin with datatable

    // artist
    "GET /artist": {
        action: "admin/artist/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /artist/create": {
        action: "admin/artist/view-create",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /artist/edit/:artistId": {
        action: "admin/artist/view-edit",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /artist/show/:artistId": {
        action: "admin/artist/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /artist/music/index/:artistId": { action: "admin/artist/music-index" }, //getting list of admin with datatable
    "GET /artist/index": { action: "admin/artist/index" }, //getting list of admin with datatable
    "POST /artist/create": { action: "admin/artist/create" },
    "POST /artist/update/:id": { action: "admin/artist/update" },
    "DELETE /artist/:id": { action: "admin/artist/delete" },
    "GET /artist/status-change/:userId": { action: "admin/user/status-change" },

    // music-type
    "GET /music-type": {
        action: "admin/music-type/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /music-type/create": {
        action: "admin/music-type/view-create",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /music-type/edit/:musicTypeId": {
        action: "admin/music-type/view-edit",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /music-type/index": { action: "admin/music-type/index" }, //getting list of admin with datatable
    "POST /music-type/create": { action: "admin/music-type/create" },
    "POST /music-type/update/:musicTypeId": { action: "admin/music-type/update" },
    "DELETE /music-type/:id": { action: "admin/music-type/delete" },

    // broadcast
    "GET /broadcast": {
        action: "admin/broadcast/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /broadcast/index": { action: "admin/broadcast/index" },
    "POST /broadcast/create": { action: "admin/broadcast/create" },
    "DELETE /broadcast/:id": { action: "admin/broadcast/delete" },

    // music
    "GET /music": {
        action: "admin/music/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /music/create": {
        action: "admin/music/view-create",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /music/edit/:musicId": {
        action: "admin/music/view-edit",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /music/show/:musicId": {
        action: "admin/music/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /music/index": { action: "admin/music/index" }, //getting list of admin with datatable
    "POST /music/create": { action: "admin/music/create" },
    "POST /music/update/:musicId": { action: "admin/music/update" },
    "GET /music-type/list": { action: "admin/music/get-music-type" },
    "DELETE /music/:id": { action: "admin/music/delete" },

    // music purchase
    "GET /music-purchase": {
        action: "admin/music-purchase/view-index",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /music-purchase/show/:musicId": {
        action: "admin/music-purchase/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /music-purchase/index": { action: "admin/music-purchase/index" },

    // earning
    "GET /earning": {
        action: "admin/earning/view-index",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /earning/show/:musicId": {
        action: "admin/earning/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /earning/index": { action: "admin/earning/index" },

    // music download
    "GET /music-download": {
        action: "admin/music-download/view-index",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /music-download/show/:musicId": {
        action: "admin/music-download/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /music-download/index": { action: "admin/music-download/index" },

    // Commissions
    "GET /payment-setting": {
        action: "admin/payment-settings/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "POST /payment-setting/create": { action: "admin/payment-settings/create" },
    "POST /payment-setting/update/:id": {
        action: "admin/payment-settings/update",
    },

    // terms and condition
    "GET /terms": {
        action: "admin/termsCondition/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /termsCondition/create": {
        action: "admin/termsCondition/view-create",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /termsCondition/edit/:termId": {
        action: "admin/termsCondition/view-edit",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /termsCondition/index": { action: "admin/termsCondition/index" },
    //"GET /termsCondition/language-description": { action: "admin/termsCondition/language-description" },
    "POST /termsCondition/create": { action: "admin/termsCondition/create" },
    "POST /termsCondition/update/:termId": {
        action: "admin/termsCondition/update",
    },
    "DELETE /termsCondition/:id": { action: "admin/termsCondition/delete" },
    "GET /termsCondition/show/:id": {
        action: "admin/termsCondition/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    //block-user
    "GET /block-user": {
        action: "admin/block-user/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /block-user/index": { action: "admin/block-user/index" },

    //report-user
    "GET /report-user": {
        action: "admin/report-user/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /report-user/index": { action: "admin/report-user/index" },

    // policy
    "GET /policy": {
        action: "admin/policy/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /policy/create": {
        action: "admin/policy/view-create",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /policy/edit/:policyId": {
        action: "admin/policy/view-edit",
        locals: { layout: "admin/layouts/master" },
    },

    "GET /policy/index": { action: "admin/policy/index" },
    "POST /policy/create": { action: "admin/policy/create" },
    "POST /policy/update/:policyId": { action: "admin/policy/update" },
    "DELETE /policy/:id": { action: "admin/policy/delete" },
    "GET /policy/show/:id": {
        action: "admin/policy/view-show",
        locals: { layout: "admin/layouts/master" },
    },

    //privacy-policy and terms & conditions
    "GET /privacy-policy": { action: "api/v1/policy/get-policy" },
    "GET /terms-and-condition": { action: "api/v1/terms/get-terms" },

    // inquiry
    "GET /inquiry": {
        action: "admin/inquiry/view-index",
        locals: { layout: "admin/layouts/master" },
    },
    "GET /inquiry/index": { action: "admin/inquiry/index" },
    "DELETE /inquiry/:id": { action: "admin/inquiry/delete" },
};

var apiV1 = {
    // ========================================================== All Users =====================================================================
    //---------------------- Auth Flow ----------------------
    "POST /all-user/auth/login": { action: "api/v1/all-user/auth/login" },
    "POST /all-user/auth/signup": { action: "api/v1/all-user/auth/signup" },
    "POST /all-user/auth/send-otp": { action: "api/v1/all-user/auth/send-otp" },
    "POST /all-user/auth/verify-otp": {
        action: "api/v1/all-user/auth/verify-otp",
    },
    "POST /all-user/auth/send-forgot-mail": {
        action: "api/v1/all-user/auth/send-forgot-mail",
    },
    "POST /all-user/auth/forgot-password": {
        action: "api/v1/all-user/auth/forgot-password",
        locals: { layout: "admin/layouts/layout" },
    },

    "POST /all-user/auth/forgot-password-verify/:verificationToken": {
        action: "api/v1/all-user/auth/verify-forgot-password-link",
    },

    //---------------------- Chat Module ----------------------
    "POST /all-user/chat/send-message": {
        action: "api/v1/all-user/chat/send-message",
    },
    "GET /all-user/chat/get-chat-list": {
        action: "api/v1/all-user/chat/get-chat-list",
    },
    "GET /all-user/chat/get-online-users": {
        action: "api/v1/all-user/chat/get-online-users",
    },
    "GET /all-user/chat/get-messages-list": {
        action: "api/v1/all-user/chat/get-messages-list",
    },
    "GET /all-user/chat/subscribe-user": {
        action: "api/v1/all-user/chat/subscribe-user",
    },
    "GET /all-user/chat/typing": { action: "api/v1/all-user/chat/typing" },
    "GET /all-user/chat/is-chat-exist": {
        action: "api/v1/all-user/chat/is-chat-exist",
    },
    "POST /all-user/chat/subscribe-group": {
        action: "api/v1/all-user/chat/subscribe-group",
    },
    "GET /all-user/chat/get-unread-count": {
        action: "api/v1/all-user/chat/get-unread-count",
    },
    "POST /all-user/chat/delete-messages": {
        action: "api/v1/all-user/chat/delete-messages",
    },
    "POST /all-user/chat/delete-chat": {
        action: "api/v1/all-user/chat/delete-chat",
    },

    //---------------------- Chat Test API ----------------------
    "POST /all-user/chat/test/send-message": {
        action: "api/v1/all-user/chattest/send-message",
    },
    "GET /all-user/chat/test/subscribe-user/:userId": {
        action: "api/v1/all-user/chattest/subscribe-user",
    },
    "GET /all-user/chat/test/subscribe-group/:userId/:groupId": {
        action: "api/v1/all-user/chattest/subscribe-group",
    },
    "POST /all-user/chat/test/is-user-online": {
        action: "api/v1/all-user/chattest/is-user-online",
    },

    //---------------------- Profile ----------------------
    "POST /all-user/profile/update": { action: "api/v1/all-user/profile/update" },
    "GET /all-user/profile/get": { action: "api/v1/all-user/profile/get" },
    "DELETE /all-user/profile/delete": {
        action: "api/v1/all-user/profile/delete",
    },
    "POST /all-user/profile/block-unblock": { action: "api/v1/all-user/profile/block-unblock" },
    "GET /all-user/profile/block-user-list": { action: "api/v1/all-user/profile/block-user-list" },
    "POST /all-user/profile/report-user": { action: "api/v1/all-user/profile/report-user" },

    //---------------------- Notification ----------------------
    "GET /all-user/notifications": {
        action: "api/v1/all-user/notification/get",
    },
    "POST /all-user/notification/token/add": {
        action: "api/v1/all-user/notification/token/add",
    },
    "POST /all-user/notification/token/remove": {
        action: "api/v1/all-user/notification/token/remove",
    },
    "POST /all-user/notifications/read": {
        action: "api/v1/all-user/notification/read",
    },
    "GET /all-user/notifications/get-unread-count": {
        action: "api/v1/all-user/notification/get-unread-count",
    },

    //---------------------- Music ----------------------
    "GET /all-user/music/get-genre-type": {
        action: "api/v1/all-user/music/get-genre-type",
    },
    // ========================================================== All Users =====================================================================

    // ========================================================== Artist =====================================================================
    //---------------------- music ----------------------
    "POST /artist/music/add": { action: "api/v1/artist/music/add" },
    "POST /artist/music/image-upload": { action: "api/v1/artist/music/image-upload" },
    "POST /artist/music/audio-upload": { action: "api/v1/artist/music/audio-upload" },
    "POST /artist/music/video-upload": { action: "api/v1/artist/music/video-upload" },
    "POST /artist/music/upload-media": { action: "api/v1/artist/music/upload-media" },
    "GET /artist/music/get": { action: "api/v1/artist/music/get" },
    "GET /artist/music/get-user-by-music/:musicId": {
        action: "api/v1/artist/music/get-user-by-music",
    },
    "POST /artist/music/update/:musicId": {
        action: "api/v1/artist/music/update",
    },
    "DELETE /artist/music/delete/:musicId": {
        action: "api/v1/artist/music/delete",
    },
    "GET /artist/music/download-history/:musicId": {
        action: "api/v1/artist/music/download-history",
    },

    //---------------------- follow ----------------------
    "GET /artist/follow/user-list": {
        action: "api/v1/artist/follow/follower-list",
    },

    //---------------------- like ----------------------
    "GET /artist/like-music/music-list/:musicId": {
        action: "api/v1/artist/like-music/music-list",
    },

    //---------------------- payment ----------------------
    "GET /artist/payment/history": {
        action: "api/v1/artist/payment/sell-music-history",
    },
    "POST /artist/payment/withdraw": {
        action: "api/v1/artist/payment/withdraw-amount",
    },
    //---------------------- album ----------------------
    "GET /artist/album/get-album-list": {
        action: "api/v1/artist/album/get-album-list",
    },
    "GET /artist/album/get-album-music-list": {
        action: "api/v1/artist/album/get-album-music-list",
    },
    "POST /artist/album/create-album": {
        action: "api/v1/artist/album/create-album",
    },
    "POST /artist/album/update-album": {
        action: "api/v1/artist/album/update-album",
    },
    "DELETE /artist/album/delete-album/:albumId": {
        action: "api/v1/artist/album/delete-album",
    },
    "POST /artist/album/add-album-music": {
        action: "api/v1/artist/album/add-album-music",
    },
    "POST /artist/album/update-album-music": {
        action: "api/v1/artist/album/update-album-music",
    },
    "DELETE /artist/album/delete-album-music/:albumMusicId": {
        action: "api/v1/artist/album/delete-album-music",
    },
    //---------------------- Home ----------------------
    "GET /artist/home/get-artist-with-music-list": {
        action: "api/v1/all-user/home/get-artist-with-music-list",
    },
    "GET /artist/home/get-music-list-by-artist/:artistId": {
        action: "api/v1/all-user/home/get-music-list-by-artist",
    },

    //---------------------- Bank Details ----------------------
    "POST /artist/bank-details/add": {
        action: "api/v1/artist/bank-details/add",
    },
    "GET /artist/bank-details/list": {
        action: "api/v1/artist/bank-details/get-bank-list",
    },

    //---------------------- Explore ----------------------
    "GET /artist/explore/get-random-music": {
        action: "api/v1/artist/explore/get-random-music",
    },

    // ========================================================== Artist =====================================================================

    // ========================================================== User =====================================================================
    //---------------------- Music ----------------------
    "POST /user/music/buy": { action: "api/v1/user/music/buy" },
    "POST /user/music/download": { action: "api/v1/user/music/download" },

    //---------------------- Explore ----------------------
    "GET /user/explore/get-random-music": {
        action: "api/v1/user/explore/get-random-music",
    },
    "POST /user/explore/traversal-of-music": {
        action: "api/v1/user/explore/traversal-of-music",
    },

    //---------------------- Follow ----------------------
    "POST /user/follow/follow-unfollow": {
        action: "api/v1/user/follow/follow-unfollow",
    },
    "GET /user/follow/artist-list": {
        action: "api/v1/user/follow/followed-list",
    },

    //---------------------- Like ----------------------
    "POST /user/like/like-unlike": {
        action: "api/v1/user/like-music/like-unlike",
    },
    "GET /user/like/get-like-music-list": {
        action: "api/v1/user/like-music/get-like-music-list",
    },

    //---------------------- Comment ----------------------
    "GET /user/comment/get-comment-list": {
        action: "api/v1/user/comment/get-comment-list",
    },
    "POST /user/comment/add-comment": {
        action: "api/v1/user/comment/add-comment",
    },
    "DELETE /user/comment/delete-comment": {
        action: "api/v1/user/comment/delete-comment",
    },

    //---------------------- Payment ----------------------
    "POST /user/payment/add": {
        action: "api/v1/user/payment/create",
    },
    "GET /user/payment/history": {
        action: "api/v1/user/payment/buy-music-history",
    },
    "GET /user/payment/get-tax": {
        action: "api/v1/user/payment/get-tax",
    },

    //---------------------- Playlist ----------------------
    "GET /user/playlist/get-playlist-list": {
        action: "api/v1/user/playlist/get-playlist-list",
    },
    "GET /user/playlist/get-playlist-music-list": {
        action: "api/v1/user/playlist/get-playlist-music-list",
    },
    "POST /user/playlist/create-playlist": {
        action: "api/v1/user/playlist/create-playlist",
    },
    "POST /user/playlist/update-playlist": {
        action: "api/v1/user/playlist/update-playlist",
    },
    "DELETE /user/playlist/delete-playlist/:playlistId": {
        action: "api/v1/user/playlist/delete-playlist",
    },
    "POST /user/playlist/add-music-in-playlist": {
        action: "api/v1/user/playlist/add-music-in-playlist",
    },
    "DELETE /user/playlist/delete-music-in-playlist/:playlistMusicId": {
        action: "api/v1/user/playlist/delete-music-in-playlist",
    },

    //---------------------- Home ----------------------
    "GET /user/home/get-artist-with-music-list": {
        action: "api/v1/all-user/home/get-artist-with-music-list",
    },
    "GET /user/home/get-music-list-by-artist/:artistId": {
        action: "api/v1/all-user/home/get-music-list-by-artist",
    },
    "GET /user/home/get-music-details/:musicId": {
        action: "api/v1/all-user/home/get-music-details",
    },
    "GET /user/home/get-new-release-music": {
        action: "api/v1/all-user/home/get-new-release-music",
    },
    // ========================================================== User =====================================================================
};

var otherRoutes = {
    "/": { view: "pages/homepage" },
    "GET /socket": { view: "chat/index" },

    "/privacy-policy": { view: "pages/privacy-policy" },
    "/terms-condition": { view: "pages/terms-condition" },
    "/support": { view: "pages/support" },
    "GET /email/confirm": {
        action: "common/confirm-email",
        locals: { layout: "admin/layouts/layout" },
    },
    "GET /user/forgot-password/:verificationToken": {
        action: "api/v1/all-user/auth/verify-forgot-password-link",
    },
    "GET /test-job": { action: "common/test-job" },
    "POST /webhooks": { action: "common/webhooks" },
    "POST /test-api": { action: "common/test-api" },
    "GET /get-policy": { action: "common/get-policy" },
    "GET /get-terms": { action: "common/get-terms" },
    "GET /terms-and-condition": {
        action: "common/terms-and-condition",
        locals: {},
    },
    "GET /privacy-policy": { action: "common/privacy-policy", locals: {} },
    "GET /test-mail": { action: "common/test-mail" },
    "GET /data-seed": { action: "common/data-seed" },
    "POST /graphql": { action: "graphql/graphql" },
    "POST /inquiry": { action: "common/inquiry" },
};

function genRoutes(objRoutes) {
    var prefix = Object.keys(objRoutes);
    let newRoutes = {};
    let routes = {};

    for (let i = 0; i < prefix.length; i++) {
        var paths = Object.keys(objRoutes[prefix[i]]);
        paths.forEach(function (path) {
            var pathParts = path.split(" "),
                uri = pathParts.pop(),
                prefixedURI = "",
                newPath = "";

            prefixedURI = (prefix[i] ? "/" : "") + prefix[i] + uri;
            pathParts.push(prefixedURI);
            newPath = pathParts.join(" ");
            // construct the new routes
            newRoutes[newPath] = objRoutes[prefix[i]][path];
        });
    }
    routes = newRoutes;
    return routes;
}

// generate route with prefix keys
var routes = genRoutes({
    "": otherRoutes,
    admin: adminRoutes,
    "api/v1": apiV1,
});

// assigning generated route
module.exports.routes = routes;
