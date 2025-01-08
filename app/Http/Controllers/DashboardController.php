<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->role === 'admin') {

            return Inertia::render('Dashboard', [
                'users' => User::all()->count(),
                'chirps' => Chirp::all()->count(),
                'reports' => Report::all()->count()
            ]);
        }
        return Inertia::render('Dashboard');
    }

    public function get_data(Request $request)
    {
        $filter = $request->query('filter');
        if ($filter == 'Day') {
            return Response::json(
                [
                    'users' => User::whereDate('created_at', Carbon::now())->get()->count(),
                    'chirps' => Chirp::whereDate('created_at', Carbon::now())->get()->count(),
                    'reports' => Report::whereDate('created_at', Carbon::now())->get()->count(),
                ]
            );
        }
        if ($filter == 'Week') {
            return Response::json(
                [
                    'users' => User::all()->where('created_at', '>', Carbon::now()->subDays(7))->count(),
                    'chirps' => Chirp::all()->where('created_at', '>', Carbon::now()->subDays(7))->count(),
                    'reports' => Report::all()->where('created_at', '>', Carbon::now()->subDays(7))->count(),
                ]
            );
        }
        if ($filter == 'Month') {
            return Response::json(
                [
                    'users' => User::all()->where('created_at', '>', Carbon::now()->subDays(30))->count(),
                    'chirps' => Chirp::all()->where('created_at', '>', Carbon::now()->subDays(30))->count(),
                    'reports' => Report::all()->where('created_at', '>', Carbon::now()->subDays(30))->count(),
                ]
            );
        }
        if ($filter) {
            $date = Carbon::parse($filter);
            return Response::json(
                [
                    'users' => User::whereDate('created_at', $date)->get()->count(),
                    'chirps' => Chirp::whereDate('created_at', $date)->get()->count(),
                    'reports' => Report::whereDate('created_at', $date)->get()->count(),
                ]
            );
        }
        return Response::json(
            [
                'users' => User::all()->count(),
                'chirps' => Chirp::all()->count(),
                'reports' => Report::all()->count(),
            ]
        );
    }
}
