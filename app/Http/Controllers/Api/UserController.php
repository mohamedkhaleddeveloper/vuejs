<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return User::latest()->paginate(5);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $messages = [
            'email.required' => 'Please Insert Email',
        ];
        $this->validate($request,[
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|string|min:9',
            'type' => 'required',
        ], $messages);
        if(!empty($request->password)){
            $request->merge(['password' => Hash::make($request['password'])]);
        }
        $request->merge(['photo' => 'useravatar.png']);
        return User::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function profile()
    {
        //
        return auth('api')->user();
    }

    public function updateProfile(Request $request)
    {
        //
        $user = auth('api')->user();


        $this->validate($request,[
            'name' => 'required|string|max:191',
            'email' => 'required|string|email|max:191|unique:users,email,'.$user->id,
            'password' => 'sometimes|required|min:6'
        ]);


        $currentPhoto = $user->photo;


        if($request->photo != $currentPhoto){
            $name = time().'.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];

            \Image::make($request->photo)->save(public_path('img/profile/').$name);
            $request->merge(['photo' => $name]);

            $userPhoto = public_path('img/profile/').$currentPhoto;
            if(file_exists($userPhoto)){
                @unlink($userPhoto);
            }

        }


        if(!empty($request->password)){
            $request->merge(['password' => Hash::make($request['password'])]);
        }


        $user->update($request->all());
        return ['message' => "Success"];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
        $messages = [
            'email.required' => 'Please Insert Email',
        ];
        $this->validate($request,[
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
            'password' => 'sometimes|min:9',
        ], $messages);
        if(!empty($request->password)){
            $request->merge(['password' => Hash::make($request['password'])]);
        }
        $request->merge(['photo' => 'useravatar.png']);
        $user->update($request->all());
        return ['message' => 'Updated the user info']; 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
      //  $this->authorize('isAdmin');
        $user->delete();
        return ['message' => 'user Deleted'];
        
    }

    public function search(){
        if($search = \Request::get('q')){
            $users = User::where(function($query) use ($search){
                $query->where('name', 'like' ,"%$search%")
                    ->orwhere('email', 'like' ,"%$search%")
                    ->orwhere('type', 'like' , "%$search%");
            })->paginate(20);
        }else{
            $users = User::latest()->paginate(5);
        }
        return $users;
    }
}
