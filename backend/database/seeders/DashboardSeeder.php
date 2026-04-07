<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\Actualites;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DashboardSeeder extends Seeder
{
    public function run(): void
    {
        // Sample Contacts (messages)
// Sample Contacts (messages) - null = new
        Contact::create([
            'fullname' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '123456789',
            'message' => 'Test message',
        ]);
        Contact::create([
            'fullname' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone' => '987654321',
            'message' => 'Another test',
            'contactStatus' => 'processed',
        ]);
        Contact::create([
            'fullname' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '111222333',
            'message' => 'New message',
        ]);

        // Sample Actualites (news) - assume fields exist
        Actualites::create([
            'title' => 'News 1',
            'content' => 'Content 1',
            'actualiteStatus' => 'draft',
        ]);
        Actualites::create([
            'title' => 'Published News',
            'content' => 'Content pub',
            'actualiteStatus' => 'published',
            'nbrViews' => 500,
        ]);
        Actualites::create([
            'title' => 'Another Published',
            'content' => 'Content 2',
            'actualiteStatus' => 'published',
            'nbrViews' => 1200,
        ]);
    }
}
