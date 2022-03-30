module.exports = {

  isOwner:function(request, response){
    if(request.user){ // request.session.is_logined에서 request.user 로 변경, 로그인되었다면 request 객체에 user 객체가 있을 것임.
      return true;
    }else{
      return false;
    }
  },

  statusUI:function(request, response){
    var authStatusUI = `<a href="/auth/login">login</a>`
    if(this.isOwner(request, response)){
      authStatusUI = `${request.user.nickname} | <a href="/auth/logout">logout</a> `; 
      // isOwner의  값을 구현했기 때문에, create/update/delete 같은것으로 접근해도 소유자가 아니면 접근할 수 없도록 이미 처리가 되어있으니 확인 해 볼것
    }
    return authStatusUI;
  }
}

