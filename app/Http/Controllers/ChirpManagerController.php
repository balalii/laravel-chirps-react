<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ChirpManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Dashboard", ['chirps' => Chirp::with('user')->get()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Chirp $chirp)
    {
        Gate::authorize('update', $chirp);
        $chirp->delete();

        return redirect(route('dashboard.chirps.index'));
    }
}
