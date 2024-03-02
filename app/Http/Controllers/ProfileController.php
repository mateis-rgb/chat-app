<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    public function index (int $id) {
        if ($id === auth()->user()->id) {
            return to_route("error", ["status" => 401]);
        }

        $relations = [];

        $user = User::find($id);
        $users = DB::table("users")
            ->select("id", "name", "email", "email_verified_at", "created_at", "status")
            ->get();

        $request_relations = DB::table("friendships")
            ->select("id", "sender_id", "recipient_id", "status", "created_at")
            ->whereRaw("recipient_id = ? OR sender_id = ?", [$user->id, $user->id])
            ->where("status", "accepted")
            ->get();

        foreach ($request_relations as $relation) {
            array_push($relations, [
                "id" => $relation->id,
                "sender" => $users[$relation->sender_id - 1],
                "recipient" => $users[$relation->recipient_id - 1],
                "status" => $relation->status,
                "created_at" => $relation->created_at
            ]);
        }

        return Inertia::render("Profile/Index", [
            "user" => $user,
            "relations" => $relations
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function updatePreferences(Request $request) {
        DB::table("users")
            ->where("id", auth()->user()->id)
            ->update(["share_profiles" => $request->share_profiles]);

        return Redirect::route("profile.edit");
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
