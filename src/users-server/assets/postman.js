for (let i = 0; i < 10; i++) {
    addRandomUser();
}

function random(from, to) {
    return Math.floor(Math.random() * to) + from;
}

function getRandomLogin() {
    let loginBegin = ['Den','Andy','Mark','Helen','Mary'];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    let result = loginBegin[random(0,loginBegin.length-1)];
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(random(0, charactersLength - 1));
    }
    return result;
}

function getRandomPass() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < random(8, 12); i++) {
        result += characters.charAt(random(0, charactersLength - 1));
    }
    return result;
}

function addRandomUser() {


    let value = {
        "login": getRandomLogin(),
        "password": getRandomPass(),
        "age": random(4, 77)
    };
    console.log(value);
    pm.sendRequest({
        url: 'http://localhost:3000/api/users',
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Host': 'localhost:3000',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(value)
        }
    }, function (err, res) {
        console.log(res);
    });
}