<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function profile() {
        $relations = [];

        $users = DB::table("users")
            ->select("id", "name", "email", "email_verified_at", "created_at", "status")
            ->get();

        $request_relation = DB::table("friendships")
            ->select("id", "sender_id", "recipient_id", "status", "created_at")
            ->get();

        foreach ($request_relation as $relation) {
            array_push($relations, [
                "id" => $relation->id,
                "sender" => $users[$relation->sender_id - 1],
                "recipient" => $users[$relation->recipient_id - 1],
                "status" => $relation->status,
                "created_at" => $relation->created_at
            ]);
        }

        return response()->json([$users, $relations]);
    }
}
