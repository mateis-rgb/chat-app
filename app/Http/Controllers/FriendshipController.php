<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class FriendshipController extends Controller
{
    public function index() {
        $user = User::find(auth()->user()->id);

        return response()->json([
            "friends" => $user->getAcceptedFriendships()
        ]);
    }

    public function getPendings() {
        $user = User::find(auth()->user()->id);

        return response()->json([
            "friends" => $user->getFriendRequests()
        ]);
    }

    public function send(int $id) {
        $user = User::find(auth()->user()->id);
        $friend = User::where("id", $id)->get();

        if(!$friend->isEmpty()) {
            if ($user->id != $friend[0]->id) {
                $user->befriend($friend[0]);

                return response()->json([
                    "status" => 200
                ]);
            }
        }

        return response()->json([
            "status" => 404
        ]);
    }

    public function remove(int $id) {
        $user = User::find(auth()->user()->id);
        $friend = User::where("id", $id)->get();

        if(!$friend->isEmpty()) {
            if ($user->id != $friend[0]->id) {
                $user->unfriend($friend[0]);

                return response()->json([
                    "status" => 200
                ]);
            }
        }

        return response()->json([
            "status" => 404
        ]);
    }

    public function accept(int $id) {}

    public function deny(int $id) {}
}
