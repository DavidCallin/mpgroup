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
            ['email' => 'mpgroupcompany1@gmail.com'],
            [
                'name' => 'Admin MP Group',
                'password' => Hash::make('_@dm1n@MPGr0up_G58$J0Gty&'),
                'email_verified_at' => now(),
            ]
        );
    }
}