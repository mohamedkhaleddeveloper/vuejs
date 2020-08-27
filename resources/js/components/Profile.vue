<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 mt-5">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background: url('img/bgdark.png') center center; norepeat">
                        <h3 class="widget-user-username text-left">Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc text-left">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                <h5 class="description-header">3,200</h5>
                                <span class="description-text">SALES</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                <h5 class="description-header">13,000</h5>
                                <span class="description-text">FOLLOWERS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                                <div class="description-block">
                                <h5 class="description-header">35</h5>
                                <span class="description-text">PRODUCTS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                        <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
                        <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="active tab-pane" id="activity"> </div>

                            <div class="tab-pane" id="settings">
                                <form class="form-horizontal">
                                <div class="form-group row">
                                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-10">
                                     <input v-model="form.name" type="text" name="name" placeholder="Name"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                    <has-error :form="form" field="name"></has-error>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10">
                                        <input v-model="form.email" type="email" name="email" placeholder="E_mail"
                                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                         <has-error :form="form" field="email"></has-error>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputName2" class="col-sm-2 col-form-label">Bio</label>
                                    <div class="col-sm-10">
                                        <textarea v-model="form.bio" name="bio" id="bio"
                                            placeholder="Short bio for user (Optional)"
                                            class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                        <has-error :form="form" field="bio"></has-error>
                                    </div>
                                </div>  

                                <div class="form-group row">
                                    <label for="inputName2" class="col-sm-2 col-form-label">Profile Picture</label>
                                    <div class="col-sm-10">
                                        <input type="file" name="photo" @change="updateProfile"/>
                                    </div>
                                </div>                                 
                                
                                <div class="form-group row">
                                    <label for="inputName2" class="col-sm-2 col-form-label">Password</label>
                                    <div class="col-sm-10">
                                        <input v-model="form.password" type="password" name="password" 
                                            placeholder="Password" class="form-control" 
                                            :class="{ 'is-invalid': form.errors.has('password') }">
                                        <has-error :form="form" field="password"></has-error>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="offset-sm-2 col-sm-10">
                                    <button type="submit" @click.prevent="updateInfo" class="btn btn-danger">Update</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
            <!-- /.nav-tabs-custom -->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
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
        mounted() {
            console.log('Component mounted.')
        },
        methods:{
            getProfilePhoto(){
                let photo = (this.form.photo.length > 200) ? this.form.photo : "img/profile/"+ this.form.photo ;
                return photo;
            },
            updateInfo(){
                this.$Progress.start();
                if(this.form.password == ''){
                    this.form.password = undefined;
                }
                this.form.put('api/profile')
                .then(()=>{
                    Toast.fire({
                        icon: 'success',
                        title: 'Updated successfully'
                    });
                    console.log('here');
                    fire.$emit('AfterCreate');
                    this.$Progress.finish();
                })
                .catch(() => {
                    this.$Progress.fail();
                });
            },
            updateProfile(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                let limit = 1024 * 1024 * 2;
                if(file['size'] > limit){
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'You are uploading a large file',
                    })
                    return false;
                }
                reader.onloadend = (file) => {
                    this.form.photo = reader.result;
                }
                reader.readAsDataURL(file);
                
            }
        },
        created(){
            axios.get('api/profile')
            .then(({data})=>(this.form.fill(data)))
            .catch(()=>{

            });
        }
    }
</script>
