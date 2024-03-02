<?php

namespace App\Http\Controllers;

use App\Http\Repository\NotificationRepository;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    /**
     * @var NotificationRepository
     */
    private $notificationRepository;
    public function __construct(NotificationRepository $notificationRepository) {
        $this->notificationRepository = $notificationRepository;
    }

    public function index (int $id) {
        $messages = [];

        if ($id === auth()->user()->id) {
            return to_route("error", ["status" => 401]);
        }

        $user = User::find($id);

        $users = DB::table("users")
            ->select("id", "name", "email", "email_verified_at", "created_at", "status")
            ->get();

        $request_messages = DB::table("conversations")
            ->whereRaw("(sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)", [$user->id, auth()->user()->id, auth()->user()->id, $user->id])
            ->get();

        foreach ($request_messages as $message) {
            array_push($messages, [
                "id" => $message->id,
                "sender" => $users[$message->sender_id - 1],
                "recipient" => $users[$message->recipient_id - 1],
                "content" => $message->content,
                "created_at" => $message->created_at,
                "updated_at" => $message->updated_at
            ]);
        }

        return Inertia::render("Conversations/Index", [
            "user" => $user,
            "messages" => $messages
        ]);
    }

    public function send (int $id, Request $request) {
        $user = User::find($id);

        $newMessage = DB::table("conversations")->insert([
            "sender_id" => auth()->user()->id,
            "recipient_id" => $user->id,
            "content" => $request->input("messageInput"),
            "created_at" => Carbon::now(),
            "updated_at" => null
        ]);

        if ($newMessage) {
            $this->notificationRepository->sendNotification(auth()->user()->id, $user->id, "unread_message");

            return $this->index($id);
        }

        return to_route("error", ["status" => 403]);
    }
}
