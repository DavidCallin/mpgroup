<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'fresneljeanclaudecossou64@gmail.com'],
            [
                'name' => 'Admin MP Group',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );
    }
}