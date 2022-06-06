<template>
     <div>
           <div class="container-fluid">

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">DataTables Student</h6>

                            <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw" data-bs-dismiss="modal"></i>Add Student</button>
                        
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                        <th>NISN</th>
                                        <th>NIS</th>
                                        <th>STUDENT NAME</th>
                                        <th>ADDRESS</th>
                                        <th>CLASS</th>
                                        <th>TELP</th>
                                        <th>ACTION</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="la in student_list" :key="la"> 
                                       <td>{{la.nisn}}</td>
                                       <td>{{la.nis}}</td>
                                       <td>{{la.student_name}}</td>
                                       <td>{{la.address}}</td>
                                      <td><span class="badge bg-dark" >{{ la.class_name + ' '}}</span></td>
                                       <td>
                                             <button class="btn btn-success" @click="Edit(la)" data-bs-toggle="modal" data-bs-target="#student_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                             <button class="btn btn-danger" @click="Delete(la.nisn)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                       </td>  
                                    </tr> 
                              </tbody>
                              </table>
                            </div>
                        </div>
                    </div>

                </div>
               <!-- Modal -->
               <div class="modal fade" id="student_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-md bg-priamry">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <div class="mb-3">
                                 <label for="student_name" class="form-label">Student Name</label>
                                 <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="Student Name">
                              </div> 

                              <div class="mb-3">
                                   <label for="telp" class="form-label">Telp</label>
                                   <input type="text" class="form-control" id="telp" v-model="telp">
                              </div>


                              <div class="mb-3">
                                   <label for="address" class="form-label">Address</label>
                                   <textarea class="form-control" id="address" v-model="address" rows="3"></textarea>
                              </div>

                              <div class="mb-3">
                                   <label for="class" class="form-label">Class</label>
                                   <select class="form-control" v-model="class_id">
                                        <option value="" disabled>-- Choose Class --</option>
                                        <option v-for="b in list_class" :key="b" v-bind:value="b.class_id">{{ b.class_name }} - {{ b.major }}</option>
                                   </select>
                               </div>
                        </div>
                        <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                        </div>
                        </div>
                </div>

        </div>
     </div>
</template>
<script>
module.exports = {
        //state
        data : function(){
                return {
                        nisn: "",
                        nis: "",
                        student_name: "",
                        telp: "",
                        address: "",
                        action: "",
                        class_id: "",
                        student_list: [],
                        list_class: []
                }
        },
        methods: {
                getData: function(){
                        //token
               let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }
                axios.get(api_url + "/Student", config)
                .then( response => {
                  this.student_list = response.data;   
                })

                },
                getClass: function(){
                        //token
               let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }
                axios.get(api_url + "/Grade", config)
                .then( response => {
                  this.list_class = response.data;   
                })

                },
                Add: function(){
                    this.nisn = ""
                    this.nis = ""
                    this.student_name = ""
                    this.telp = ""
                    this.address = ""
                    this.class_id = ""
                    this.action = "insert"

                    this.getClass()
                
                },
                Edit: function(la){
                      this.nisn = la.nisn
                      this.nis = la.nis
                      this.student_name = la.student_name
                      this.telp= la.telp
                      this.address = la.address
                      this.class_id = la.class_id
                      this.action = la.action = "update" 

                      this.getClass()

                },
                
                Save: function(){
                //maping token
                let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                //maping data 
                let form = {
                        //harus sama dengan backend
                        'nis': this.nis,
                        'student_name': this.student_name,
                        'telp': this.telp,
                        'address': this.address,
                        'class_id': this.class_id,

                }

                if(this.action === 'insert'){ //POST

                        axios.post(api_url + '/Student', form, config)
                        .then( response => {
                        Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })

                                 this.getData()
                        })

                } else { //PUT

                        axios.put(api_url + '/Student/' + this.nisn, form, config)
                        .then( response => {
                        Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                        })

                }
               
               this.getData()
               
                },
                Delete: function(nisn){
                //maping token 
                    let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                        Swal.fire({
                                title: 'Delete Data Student',
                                text: 'Do you want to delete this data?',
                                icon: 'warning',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: 'Yes',
                                denyButtonText: `No`,
                                }).then((result) => {
                        if (result.isConfirmed) {
                                axios.delete(api_url + '/Student/' + nisn, config)
                        .then( response => {

                                Swal.fire({
                                title: 'Success!',
                                text: response.data.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                        })

                                this.getData()
                        })
     
                        } else  {
                                Swal.fire({
                                title: 'Cancel !',
                                text: 'Data is not deleted',
                                icon: 'error',
                                confirmButtonText: 'OK'
                        })
                        }
                })

            }    
        },
        mounted(){
                this.getData()
        },
}
</script>