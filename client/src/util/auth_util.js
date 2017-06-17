const AuthUtil = {

  signup(user){
    return $.ajax({
      method: "POST",
      url: "/api/users",
      data: user,
    });
  },

  login(user){
    return $.ajax({
      method: "POST",
      url: "/auth/signin",
      data: user,
    });
  },

};

export default AuthUtil;
