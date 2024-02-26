<?php

namespace App\Http\Controllers;

use App\Http\Repository\NotificationRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class NotificationsController extends Controller
{
    /**
     * @var NotificationRepository $repo;
     */
    private $repo;
    public function __construct (NotificationRepository $repo) {
        $this->repo = $repo;
    }

    public function index () {
        $user = auth()->user();

        return $this->repo->getNotifications($user->id);
    }

    public function clear () {
        $user = auth()->user();

        $notifications = DB::table("notifications")
            ->where("to_id", $user->id)
            ->update(["updated_at" => Carbon::now()]);

        $isCleared = $notifications ? true : false;

        return response()->json($isCleared);
    }
}
