export var UserProfile = (function() {
    var firstName = ""
    var lastName = ""
    var username = ""
    var userId = ""

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

    var loginUser = function(user) {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setUsername(user.username)
        setUserId(user.id)
        window.dispatchEvent(new CustomEvent('user-login-status-changed'));

    }

    return {
        setFirstName: setFirstName,
        setLastName: setLastName,
        setUsername: setUsername,
        setUseId: setUserId,
        getFirstName: getFirstName,
        getLastName: getLastName,
        getUsername: getUsername,
        getUserId: getUserId,
        loginUser: loginUser
    }
})()
