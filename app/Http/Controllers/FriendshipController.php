<?php

namespace App\Http\Controllers;

use App\Http\Repository\NotificationRepository;
use App\Models\User;


class FriendshipController extends Controller
{
    /**
     * @var NotificationRepository $notificationRepository;
     */
    private $notificationRepository;
    public function __construct(NotificationRepository $notificationRepository) {
        $this->notificationRepository = $notificationRepository;
    }

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
                // Add friend logic
                $user->befriend($friend[0]);

                // Send notification logic
                $notif = $this->notificationRepository->sendNotification($user->id, $friend[0]->id, "friend_request");

                if ($notif) {
                    return response()->json([
                        "status" => 200
                    ]);
                }

                return response()->json([
                    "status" => 500,
                    "content" => "Something went wrong with."
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

    public function accept(int $id) {
        $user = User::find(auth()->user()->id);
        $friend = User::where("id", $id)->get();

        if (!$friend->isEmpty()) {
            if ($user->id != $friend[0]->id) {
                $user->acceptFriendRequest($friend[0]);

                $this->notificationRepository->sendNotification($user->id, $friend[0]->id, "accept_friend_request");

                return response()->json([
                    "status" => 200
                ]);
            }
        }

        return response()->json([
            "status" => 500
        ]);
    }

    public function deny(int $id) {
        $user = User::find(auth()->user()->id);
        $friend = User::where("id", $id)->get();

        if (!$friend->isEmpty()) {
            if ($user->id != $friend[0]->id) {
                $user->denyFriendRequest($friend[0]);

                $this->notificationRepository->sendNotification($user->id, $friend[0]->id, "deny_friend_request");

                return response()->json([
                    "status" => 200
                ]);
            }
        }

        return response()->json([
            "status" => 500
        ]);
    }
}
