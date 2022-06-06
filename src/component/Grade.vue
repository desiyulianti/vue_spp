<template>
        <div>
               <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">GRADE DATA</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>CLASS</th>
                                            <th>MAJOR</th>
                                            <th>GENERATION</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         <tr v-for="(major, index) in major" :key="index">
                                <td>{{ index+1 }}</td>
                                <td><span class="badge bg-dark" >{{ major.class_name }}</span></td>
                                <td>{{ major.major}}</td>
                                <td>
                                        <button class="btn btn-success" @click="Edit(major)" data-bs-toggle="modal" data-bs-target="#class_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                        <button class="btn btn-danger" @click="Delete(major.class_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>  
                             </tr> 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

        <!-- Modal -->
        <div class="modal fade" id="class_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-md bg-priamry">
                        <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Grade Data</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <div class="mb-3">
                                 <label for="class_name" class="form-label">Grade Name</label>
                                 <input type="text" class="form-control" id="class_name" v-model="class_name" placeholder="Class Name">
                              </div> 

                              <div class="mb-3">
                                   <label for="major" class="form-label">Major</label>
                                   <input type="text" class="form-control" id="major" v-model="major" placeholder="Major">
                              </div>

                               <div class="mb-3">
                                   <label for="generation" class="form-label">Generation</label>
                                   <input type="text" class="form-control" id="generation" v-model="generation" placeholder="Generation">
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
                         class_id: "",
                         class_name: "",
                         major: "",
                         generation: "",
                         action: "",
                         major: [],
                              }
        },
        methods: {
                getData: function(){
                        //token
               let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }
                axios.get(api_url + "/Grade", config)
                .then( response => {
                  this.major = response.data;   
                })

                },
                Add: function(){
                    this.class_id = ""
                    this.class_name = ""
                    this.major = ""
                    this.generation = ""
                    this.action = "insert"
                
                },
                Edit: function(major){
                    this.class_id = major.class_id
                    this.class_name = major.class_name
                    this.major = major.major
                    this.generation = major.generation
                    this.action = "update"

                },
                
                Save: function(){
                //maping token
                let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                //maping data 
                let form = {
                        //harus sama dengan backend
                         'class_name': this.class_name,
                         'major': this.major,
                         'generation': this.generation,


                }

                if(this.action === 'insert'){ //POST

                        axios.post(api_url + '/Grade', form, config)
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

                        axios.put(api_url + '/Grade/' + this.class_id, form, config)
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
                Delete: function(class_id){
                //maping token 
                    let config = {
                    headers: { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
                }

                        Swal.fire({
                                title: 'Delete Data Class',
                                text: 'Do you want to delete this data?',
                                icon: 'warning',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: 'Yes',
                                denyButtonText: `No`,
                                }).then((result) => {
                        if (result.isConfirmed) {
                                axios.delete(api_url + '/Grade/' + class_id, config)
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