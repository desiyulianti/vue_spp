<template>
     <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <!-- Nested Row within Card Body -->
                    <div class="card-header">
                        <h1 class="text-center font-weight-light my-4">Login</h1>
                        <div class="card-body p-0"></div>
                        <div class="p-1">
                            <p>{{ message }}</p>
                            <br>
                    </div>
                    <form class="user">
                        <div class="form-floating mb-3">
                            <input type="username" class="form-control form-control-user" v-model="username" id="exampleInputUsername"
                                aria-describedby="emailHelp" placeholder="Enter Userame Address...">
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control form-control-user" v-model="kataSandi" id="exampleInputPassword"
                                placeholder="Password">
                        </div>
                        <a class="btn btn-primary btn-user btn-block" href="/#/index.html" @click="Login">Login</a>
                    </form>
                    <hr>
                    <div class="text-center">
                        <a class="small" href="#">Forgot Password?</a>
                    </div>
                    <div class="text-center">
                        <a class="small" href="#">Create an Account!</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
module.exports = {
  //state
  data: function () {
    return {
      username: "",
      kataSandi: "",
      message: "",
    };
  },
  methods: {
    Login: function () {
      //
      this.message = "Please waiting ...";
      //mapping data post
      let data_login = {
        //sesuai API    //sesuai state
        "username":        this.username,
        "password":     this.kataSandi
      }

      //post data
      axios.post(api_url + "/login", data_login).then((response) => {
        //kondisi status login
        this.message = response.data.message;

        if (response.data.status === 1) {
          //jika berhasil login menyimpan token ke dalam cookies
          //cek dulu apakah ada data token sebelumnya
          if (this.$cookies.isKey("Authorization")) {
            //jika ada, maka di hapus
            this.$cookies.remove("Authorization");
          }

          this.$cookies.set("Authorization", response.data.token);
          this.mycomponent = "apps";
          location.reload();
        } else {
          this.mycomponent = "login";
        }
      });
    },
  },
};
</script>