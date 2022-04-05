const bcrypt = require('bcrypt');
const saltRounds = 10; // 남들이 알아보기 힘들게 하는 일종의 노이즈 같은 것
const myPlaintextPassword = '6362488'; // 나의 비번이 이거라고 해보자
const someOtherPlaintextPassword = '636249';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    bcrypt.compare(myPlaintextPassword, hash, function(err, result){
        console.log('my password', result);
    })

    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result){
           console.log('other password', result);
    })
});