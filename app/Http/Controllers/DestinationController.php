<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index()
    {
        return Destination::orderBy('order')->get();
    }

    public function store(Request $request): JsonResponse
    {
        $destination = Destination::create($request->all());
        return response()->json($destination, 201);
    }

    public function update(Request $request, Destination $destination): JsonResponse
    {
        $destination->update($request->all());
        return response()->json($destination, 200);
    }

    public function destroy(Destination $destination): JsonResponse
    {
        $destination->delete();
        return response()->json(null, 204);
    }
}
