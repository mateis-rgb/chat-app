<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationsController extends Controller
{
    public function index () {
        $user = auth()->user();
        $notifications = DB::table("friendships")
            ->where("recipient_id", $user->id)
            ->where("read_at", null)
            ->get();

        return response()->json($notifications);
    }

    public function clear () {

    }
}
