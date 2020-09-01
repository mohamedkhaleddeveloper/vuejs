<template>
        <div class="container mt-5" v-if="$gate.isAdmin()" >
            <add :form='form' v-on:addusers="createduser" v-on:openmodel="openmodel"/>
            <edit :form='form' v-on:edituser="updateusers" />
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users</h3>
                        <div class="card-tools">
                            <button class="btn btn-primary" @click="openmodel" ><i class="fas fa-user-plus"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>type</th>
                                <th>Rigestered at</th>
                                <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users.data" :key="user.id">
                                    <td>{{user.id}}</td>
                                    <td>{{user.name }}</td><!--| upText-->
                                    <td>{{user.email}}</td>
                                    <td>{{user.type}}</td>
                                    <td>{{user.created_at | myDate}}</td>
                                    <td>
                                        <a href="#" @click="editModel(user)">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        /
                                        <a href="#"  @click="deleteUser(user.id)">
                                            <i class="fas fa-trash red"></i>
                                        </a>
                                    </td>
                                </tr>                  
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <pagination :data="users" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
                <!-- /.card -->
            </div>
        </div>
</template>
<script>
import add from './add.vue'
import edit from './edit.vue'
export default {
  name: 'user',
    components:{
        add,
        edit
    },
   data(){
        return{
            users : {},
            form: new Form({
                id: '',
                name : '',
                email : '',
                password : '',
                type : '',
                bio : '',
                photo : '',
            })
        }
        },
  methods:{
        openmodel(){
            this.form.reset();
            $('#addnew').modal('show');                
        },
        createduser(){
            //console.log(this.form);
            this.$Progress.start();
            this.form.post('api/user')
                .then(() =>{
                    fire.$emit('AfterCreate');
                    $('#addnew').modal('hide');
                    Toast.fire({
                    icon: 'success',
                    title: 'Created New User successfully'
                });
                    this.$Progress.finish();
                })
                .catch(() => {

                });    
        },
        editModel(user){
            this.form.reset();
            this.$emit('updateed', user);
            $('#editmodel').modal('show');
            this.form.fill(user);
        },
        updateusers(){
            this.$Progress.start();
            this.form.put('api/user/'+this.form.id)
            .then(()=>{
                $('#editmodel').modal('hide');
                swal.fire(
                    'Updated!',
                    'Informtion has been Updated.',
                    'success'
                )
                this.$Progress.finish();
                fire.$emit('AfterCreate');
            })
            .catch(()=>{
                this.$Progress.fail();
            });
        },
        deleteUser(id){
            swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.form.delete('api/user/'+id).then(()=>{
                        swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                        fire.$emit('AfterCreate');
                    }).catch(()=>{
                        swal.fire("Failed!", "There was something wronge.", "warning");
                    });
                }
            })
        },
        getResults(page = 1) {
			axios.get('api/user?page=' + page)
				.then(response => {
                this.users = response.data;
            });
        },
        loadUsers(){
            if (this.$gate.isAdmin){
                axios.get('api/user').then(({ data }) => [this.users = data]);
            }
        },
    },
    created() {
        fire.$on('searching',() => {
            let query = this.$parent.search;
            axios.get('api/findUser?q=' + query)
            .then((data)=>{
                this.users = data.data;
            }).catch(()=>{

            })
            // console.log('here');
        })
        this.loadUsers();
        fire.$on('AfterCreate', () => {
            this.loadUsers();
        });
        //setInterval(() => this.loadUsers(), 3000);
        
    }
}
</script>