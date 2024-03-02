<?php

namespace App\Http\Repository;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class NotificationRepository {
    public function getNotifications(int $to_id) {
        $notifications = [];

        $users = DB::table("users")->get();

        $req_notifications = DB::table("notifications")
            ->where("to_id", $to_id)
            ->where("updated_at", null)
            ->orderBy("created_at", "desc")
            ->get();

        foreach ($req_notifications as $notification) {
            array_push($notifications, [
                "id" => $notification->id,
                "from" => $users[$notification->from_id - 1],
                "to" => $users[$notification->to_id - 1],
                "type" => $notification->type,
                "content" => $notification->content,
                "created_at" => $notification->created_at,
                "updated_at" => $notification->updated_at
            ]);
        }

        return $notifications;
    }

    public function sendNotification (int $from_id, int $to_id, string $type) {
        switch ($type) {
            case ("friend_request"):
                $content = "vous a ajouté a ces amis.";
                break;

            case ("unread_message"):
                $content = "vous a envoyé un message.";
                break;

            case ("accept_friend_request"):
                $content = "a accepté votre demande d'ami.";
                break;

            case ("deny_friend_request"):
                $content = "n'a pas accepté votre demande d'ami.";
                break;

            default:
                $content = "vous a envoyé quelque chose.";
        }

        $request = DB::table("notifications")->insert([
            "from_id" => $from_id,
            "to_id" => $to_id,
            "type" => $type,
            "content" => $content,
            "created_at" => Carbon::now(),
            "updated_at" => null
        ]);

        return $request;
    }
}
