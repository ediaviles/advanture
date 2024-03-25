var UserProfile = (function() {
    var firstName = ""
    var lastName = ""
    var username = ""

    var setFirstName = function(first_name) {
        firstName = first_name
    }

    var setLastName = function(last_name) {
        lastName = last_name
    }

    var setUsername = function(user_name) {
        username = user_name
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

    return {
        setFirstName: setFirstName,
        setLastName: setLastName,
        setUsername: setUsername,
        getFirstName: getFirstName,
        getLastName: getLastName,
        getUsername: getUsername
    }
})()

export default UserProfile