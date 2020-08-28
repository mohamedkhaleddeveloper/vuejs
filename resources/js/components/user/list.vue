<template>
        <div class="container mt-5" v-if="$gate.isAdmin()" >
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users</h3>
                        <div class="card-tools">
                            <button class="btn btn-primary" @click="newModel"  ><i class="fas fa-user-plus"></i></button>
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
export default {
  name: 'user',
  props: ['users'],
  methods:{
    newModel(){
            // this.editmode = false;
            // this.form.reset();
            $('#addnew').modal('show');                
        },
     getResults(page = 1) {
			axios.get('api/user?page=' + page)
				.then(response => {
					this.users = response.data;
				});
		    },
    }
}
</script>