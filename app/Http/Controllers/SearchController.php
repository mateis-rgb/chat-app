<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;


class SearchController extends Controller
{
    public function profile(string $name) {
        $users = DB::table("users")
            ->where("name", "like", "%$name%")
            ->get();

        return response()->json([$users]);
    }
}
