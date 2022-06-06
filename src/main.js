//base URL API
var api_url = "http://127.0.0.1:8000/api";


//konfirmasi route
var router = [
     {
          path: "/home",
          name: "Home",
          component: httpVueLoader("./src/component/Home.vue")
     },
     {
          path: "/student",
          name: "Student",
          component: httpVueLoader("./src/component/Student.vue")
     },
     {
          path: "/grade",
          name: "Grade",
          component: httpVueLoader("./src/component/Grade.vue")
     },
     {
          path: "/officer",
          name: "Officer",
          component: httpVueLoader("./src/component/Officer.vue")
     },
     {
          path: "/payment",
          name: "Payment",
          component: httpVueLoader("./src/component/Payment.vue")
     },
     {
          path: "/spp",
          name: "Spp",
          component: httpVueLoader("./src/component/Spp.vue")
     },
     {
          path: "/login",
          name: "Logout",
          component: httpVueLoader("./src/component/Login.vue")
     },

];

var routers = new VueRouter({ routes: router, base: "/"});

//instance vue
var app = new Vue({
     el: "#app",  //elemen yg di vue kan
     components: {
          'apps': httpVueLoader("./src/component/App.vue"),
          'login': httpVueLoader("./src/component/Login.vue"),
     },
     data: { //hak akses, username, email(sifatnya global)
          user: {
               id_user: "",
               role: "",
               name: "",
               username: "",
          },
          mycomponent: "apps",
     },
     router: routers,
     methods: {
          CekToken: function () {
               //punya token di cookies apa tidak?
               if (this.$cookies.isKey('Authorization')) {
                    //kalau punya 
                    //mapping header token
                    let config = {
                         headers: {
                              "Authorization": "Bearer " + this.$cookies.get('Authorization')
                         }
                    }

                    axios.get(api_url + '/login_check', config)
                         .then(response => {
                              if (response.data.status == 1) {
                                   this.mycomponent = "apps";

                                   this.id_user = response.data.data.id;
                                   this.role = response.data.data.role;
                                   this.name = response.data.data.name;
                                   this.username = response.data.data.username;

                              } else {
                                   this.mycomponent = "login";
                              }
                         })

               } else {
                    //kalau tidak punya, langsung ke login
                    this.mycomponent = "login";
               }

          },
     },
     mounted() {
          this.CekToken();
     }

});
