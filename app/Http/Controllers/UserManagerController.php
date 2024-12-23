<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Dashboard", [
            'users' => User::with('chirps')
                ->get()
                ->filter(function ($user) {
                    return $user->role !== 'admin';
                })
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        Gate::authorize('update', $request->user());
        $attributes = $request->validate(
            [
                'role' => [Rule::in(['moderator', 'user'])],
                'status' => [Rule::in(['banned', 'active'])],
            ]
        );
        $user->update($attributes);
        return redirect(route('dashboard.users.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        Gate::authorize('update', $request->user());
        $user->delete();
        return redirect(route('dashboard.users.index'));
    }
}
