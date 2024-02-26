<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function index (int $id) {
        $user = User::find($id);

        $messages = DB::table("conversations")
            ->whereRaw("recipient_id = ? OR sender_id = ?", [$user->id, auth()->user()->id])
            ->get();

        if ($id === auth()->user()->id) {
            return Inertia::render("ErrorPage", ["status" => 401]);
        }

        return Inertia::render("Conversations/Index", [
            "user" => $user,
            "messages" => $messages
        ]);
    }

    public function new () {
        $users = DB::table("users")
            ->where("id", "!=", auth()->user()->id)
            ->get();

        return Inertia::render("Conversations/New", [
            "users" => $users
        ]);
    }

    public function send (int $id, Request $request) {

    }
}
