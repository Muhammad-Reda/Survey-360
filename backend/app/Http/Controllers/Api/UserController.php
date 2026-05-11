<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index(){
        $user = User::latest()->paginate(15);
        return response()->json([
            'status' => true,
            'data' => $user
        ]);
    }

    public function register(Request $request){
       try{
         $request->validate([
            'name' => 'required',
            'role' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);
        $user = User::create([
             'name' => $request->name,
            'role' => $request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        $token = $user->createToken('AuthToken')->plainTextToken;
        return response()->json([
            'status' => true,
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
            ]);
       }catch(Exception $err){
        return response()->json([
            'status' => false,
            'Error' => $err->getMessage(),
            'message' => 'gagal register user'
        ]);
       }
    }

    public function destroy($id){
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'status' => true,
            'user' => $user,
            'message' => 'berhasil hapus user'
        ]);
    }

   public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|string|email",
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422); // 422 Unprocessable Entity
        }

        $credentials = $request->only("email", "password");

        // Perbaikan: Lakukan attempt, jika GAGAL, kembalikan error
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email atau password salah', // Pesan lebih informatif
                'status' => 'error'
            ], 401); // 401 Unauthorized
        }

        // Perbaikan: Jika Auth::attempt BERHASIL, lanjutkan untuk mendapatkan user dan token
        $user = Auth::user(); // User sudah diautentikasi
        // Gunakan plainTextToken untuk Sanctum
        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil', // Tambahkan pesan sukses
            'user' => $user,
            'authorisation' => [
                "token" => $token,
                'type' => 'bearer',
            ]
        ], 200); // 200 OK
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => 'berhasil logout'
        ]);
    }
}
