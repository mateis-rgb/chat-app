<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index (int $id) {
        $user = User::find($id);
        $messages = [];

        return Inertia::render("Conversation", [
            "user" => $user,
            "messages" => $messages
        ]);
    }

    public function send (int $id, Request $request) {

    }
}
