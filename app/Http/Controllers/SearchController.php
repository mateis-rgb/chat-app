<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function profile() {
        $users = DB::table("users")
            ->select("id", "name", "email", "email_verified_at", "created_at")
            ->where("id", "!=", auth()->user()->id)
            ->get();

        $relations = DB::table("friendships")
            ->select("id", "sender_id", "recipient_id", "status", "created_at")
            ->get();

        return response()->json([$users, $relations]);
    }
}
