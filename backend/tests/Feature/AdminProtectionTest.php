<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminProtectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_admin_routes()
    {
        // Test API routes
        $this->getJson('/api/admin/stats')->assertStatus(401);
        $this->getJson('/api/admin/recent-messages')->assertStatus(401);
        $this->getJson('/api/admin/recent-news')->assertStatus(401);
        $this->getJson('/api/admin/contacts')->assertStatus(401);
        
        // Test news management routes
        $this->postJson('/api/news', [])->assertStatus(401);
        $this->putJson('/api/news/1', [])->assertStatus(401);
        $this->deleteJson('/api/news/1')->assertStatus(401);
    }

    public function test_authenticated_user_can_access_admin_routes()
    {
        $user = User::factory()->create();
        
        // Test with authentication
        $this->actingAs($user, 'sanctum')
             ->getJson('/api/admin/stats')
             ->assertStatus(200);
             
        $this->actingAs($user, 'sanctum')
             ->getJson('/api/admin/recent-messages')
             ->assertStatus(200);
             
        $this->actingAs($user, 'sanctum')
             ->getJson('/api/admin/recent-news')
             ->assertStatus(200);
    }

    public function test_public_routes_are_accessible()
    {
        // Test public routes that should be accessible without authentication
        $this->postJson('/api/contact', [
            'fullname' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'message' => 'Test message'
        ])->assertStatus(201);
        
        $this->getJson('/api/news')->assertStatus(200);
    }
}