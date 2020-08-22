<template>
    <div class="container mt-5">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Users</h3>
                    <div class="card-tools">
                        <button class="btn btn-primary" @click="newModel"><i class="fas fa-user-plus"></i></button>
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
                            <th>Rigestered at</th>
                            <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name | upText}}</td>
                                <td>{{user.email}}</td>
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
            </div>
            <!-- /.card -->
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addnew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-show="!editmode" class="modal-title" id="exampleModalLabel">Add New User</h5>
                        <h5 v-show="editmode" class="modal-title" id="exampleModalLabel">Update User Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <form @submit.prevent="editmode ? updateUser() : createUser()">
                <div class="modal-body">
                    <div class="form-group">
                        <input v-model="form.name" type="text" name="name" placeholder="Name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group">
                        <input v-model="form.email" type="email" name="email" placeholder="E_mail"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                    </div>

                    <div class="form-group">
                        <input v-model="form.password" type="password" name="password" 
                            placeholder="Password" class="form-control" 
                            :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button v-show="editmode" type="submit" class="btn btn-primary">Update</button>
                    <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            editmode : true;
            return{
                users : {},
                form: new Form({
                    name : '',
                    email : '',
                    password : ''
                })
            }
        },
        methods: {
            updateUser(){
                console.log('edite data');
            },
            newModel(){
                this.editmode = false;
                this.form.reset();
                $('#addnew').modal('show');                
            },
            editModel(user){
                this.editmode = true;
                this.form.reset();
                $('#addnew').modal('show');
                this.form.fill(user);
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
                            swal.fire('Failed',form.errors,'warning');
                        });
                    }
                })
            },
            loadUsers(){
                axios.get('api/user').then(({ data }) => [this.users = data.data]);
            },
            createUser(){
                this.$Progress.start();
                this.form.post('api/user')
                    .then(() =>{
                        fire.$emit('AfterCreate');
                        $('#addnew').modal('hide');
                        Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    });
                        this.$Progress.finish();
                    })
                    .catch(() => {

                    });
                
            }
        },
        created() {
            this.loadUsers();
            fire.$on('AfterCreate', () => {
                this.loadUsers();
            });
            //setInterval(() => this.loadUsers(), 3000);
            
        }
    }
</script>
