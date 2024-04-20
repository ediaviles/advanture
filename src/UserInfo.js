export var UserProfile = (function() {
    var firstName = ""
    var lastName = ""
    var username = ""
    var userId = ""
    var interests = []
    var following = []

    var setFirstName = function(first_name) {
        firstName = first_name
    }

    var setLastName = function(last_name) {
        lastName = last_name
    }

    var setUsername = function(user_name) {
        username = user_name
    }

    var setUserId = function(user_id) {
        userId = user_id
    }

    var setInterests = function(user_interests) {
        interests = user_interests
    }

    var setFollowing = function(user_following) {
        following = user_following
    }

    var getInterests = function () {
        return interests
    }

    var getFirstName = function() {
        return firstName
    }

    var getLastName = function() {
        return lastName
    }

    var getUsername = function() {
        return username
    }

    var getUserId = function() {
        return userId
    }

    var getFollowing = function() {
        return following
    }

    var loginUser = function(user) {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setUsername(user.username)
        setUserId(user.id)
        setInterests(user.interests)
        setFollowing(user.following)
        window.dispatchEvent(new CustomEvent('user-login-status-changed'));

    }

    return {
        setFirstName: setFirstName,
        setLastName: setLastName,
        setUsername: setUsername,
        setUseId: setUserId,
        setInterests: setInterests,
        setFollowing: setFollowing,
        getInterests: getInterests,
        getFirstName: getFirstName,
        getLastName: getLastName,
        getUsername: getUsername,
        getUserId: getUserId,
        getFollowing: getFollowing,
        loginUser: loginUser
    }
})()
