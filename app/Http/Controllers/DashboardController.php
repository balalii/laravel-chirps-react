<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->role == 'user') {
            // F-04
            return Inertia::render('Dashboard', ['users' => User::all()->all(), 'chirps' => Chirp::all()->all()]);
        }
        return Inertia::render('Dashboard');
    }
}
