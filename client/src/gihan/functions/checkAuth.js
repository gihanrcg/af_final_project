export function checkAuthStudent() {
    const jwt = localStorage.getItem('af_auth_token');
    if (jwt) {
       const token = parseJwt(jwt);
       if(token.userType === 'Student'){
           return true;
       }else{
           return false;
       }
    }else{
        return false;
    }
}

export function checkAuthAdmin() {
    const jwt = localStorage.getItem('af_auth_token');
    if (jwt) {
        const token = parseJwt(jwt);
        if(token.userType === 'Admin'){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
}





