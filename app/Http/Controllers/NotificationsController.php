<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class NotificationsController extends Controller
{
    public function index () {
        $response = [];

        $user = auth()->user();
        $notifications = DB::table("friendships")
            ->where("recipient_id", $user->id)
            // ->where("read_at", null)
            ->get();
        $users = DB::table("users")->orderBy("id")->get(["id", "name", "email", "email_verified_at", "status", "created_at"]);

        foreach ($notifications as $notification) {
            array_push($response, [
                "id" => $notification->id,
                "sender" => $users[$notification->sender_id - 1],
                "recipient" => $users[$notification->recipient_id - 1],
                "status" => $notification->status,
                "created_at" => $notification->created_at,
                "read_at"=> $notification->read_at
            ]);
        }

        return response()->json($response);
    }

    public function clear () {
        $user = auth()->user();

        $notifications = DB::table("friendships")
            ->where("recipient_id", $user->id)
            ->update(["read_at" => Carbon::now()]);

        $isCleared = $notifications ? true : false;

        return response()->json($isCleared);
    }
}
