const UserUtil = {

  fetchUsers(){
    return $.ajax({
      method: "GET",
      url: "/api/users",
    });
  },

};

export default UserUtil;
