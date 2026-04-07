<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    public function test(): JsonResponse
    {
        return response()->json([
            'message' => 'API is working',
            'timestamp' => now(),
            'status' => 'success'
        ]);
    }
}