module.exports = {

  isOwner: function(request, response){
     if(request.user){
       return true;
     }else{
       return false;
     }
   },      
   
  statusUI: function (request, response){
     var authStatusUI = '<a href="/auth/login">Login</a> | <a href="/auth/register">Register</a>'
     console.log(request.user);
     if(this.isOwner(request, response)){
       authStatusUI =`${request.user.displayName} | <a href="/auth/logout">Logout</a>`
     }
     return authStatusUI;
   }

 }