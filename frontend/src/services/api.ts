const API_BASE_URL = import.meta.env.VITE_API_URL || 'mpgroupbackend.collectivitesanoussiiyerouokinassala.org/api'

export interface ContactFormData {
  nom: string
  prenom: string
  email: string
  telephone: string
  entreprise?: string
  sujet: string
  message: string
}

export interface QuoteFormData {
  nom: string
  prenom: string
  email: string
  telephone: string
  entreprise?: string
  type_evenement: string
  date_evenement: string
  lieu_evenement: string
  nombre_participants: number
  description: string
  services_souhaites?: string[]
  budget_estime?: number
  discovery?: string
}

export interface Quote {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  entreprise?: string
  type_evenement: string
  date_evenement: string
  lieu_evenement: string
  nombre_participants: number
  description: string
  services_souhaites?: string[]
  budget_estime?: number
  statut: 'nouveau' | 'en_cours' | 'traite' | 'refuse'
  created_at: string
  updated_at: string
}

export interface QuotesResponse {
  data: Quote[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface Contact {
  id: number
  fullname: string
  organization?: string
  email: string
  phone: string
  message: string
  contactStatus: 'nouveau' | 'lu'
  contactCreatedAt: string
  created_at: string
  updated_at: string
}

export interface ContactsResponse {
  data: Contact[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface Article {
  id: number
  title: string
  content: string
  image_url?: string
  tags: string[]
  actualiteStatus: 'published' | 'draft'
  actualiteCreatedAt: string
  nbrViews: number
  created_at: string
  updated_at: string
}

export interface ArticlesResponse {
  data: Article[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateArticleData {
  title: string
  content: string
  image_url?: string
  tags?: string[]
  actualiteStatus: 'published' | 'draft'
}

export interface LoginResponse {
  user: User
  token: string
}

export interface ApiResponse<T = any> {
  message: string
  contact?: T
}

class ApiService {
  private token: string | null = null

  constructor() {
    // Récupérer le token du localStorage au démarrage
    this.token = localStorage.getItem('auth_token')
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        // Si c'est une erreur de validation Laravel (422)
        if (response.status === 422 && errorData.errors) {
          // Prendre le premier message d'erreur disponible
          const firstError = Object.values(errorData.errors)[0] as string[]
          throw new Error(firstError[0] || errorData.message || `HTTP error! status: ${response.status}`)
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      // Si la réponse est vide (204 No Content), retourner null
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null as T
      }

      const text = await response.text()
      return text ? JSON.parse(text) : null as T
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Méthodes d'authentification
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    // Stocker le token
    this.token = response.token
    localStorage.setItem('auth_token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    
    return response
  }

  async logout(): Promise<void> {
    if (this.token) {
      try {
        await this.request('/auth/logout', { method: 'POST' })
      } catch {
        // Ignorer les erreurs réseau/auth lors du logout
      }
    }
    this.clearAuth()
  }

  clearAuth(): void {
    this.token = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/user')
  }

  // Méthodes utilitaires
  isAuthenticated(): boolean {
    return !!this.token
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  // Méthodes de gestion des contacts (Admin)
  async getContacts(page: number = 1): Promise<ContactsResponse> {
    return this.request<ContactsResponse>(`/admin/contacts?page=${page}`)
  }

  async getContact(id: number): Promise<Contact> {
    return this.request<Contact>(`/admin/contacts/${id}`)
  }

  async updateContactStatus(id: number, status: 'nouveau' | 'lu'): Promise<{ message: string; contact: Contact }> {
    return this.request<{ message: string; contact: Contact }>(`/admin/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ contactStatus: status }),
    })
  }

  async deleteContact(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/contacts/${id}`, {
      method: 'DELETE',
    })
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(data: { token: string; email: string; password: string; password_confirmation: string }): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Méthode contact existante
  async submitContact(data: ContactFormData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Méthodes de gestion des devis (Admin)
  async getQuotes(page: number = 1): Promise<Quote[]> {
    return this.request<Quote[]>(`/admin/quotes?page=${page}`)
  }

  async getQuote(id: number): Promise<Quote> {
    return this.request<Quote>(`/admin/quotes/${id}`)
  }

  async updateQuoteStatus(id: number, status: Quote['statut']): Promise<{ message: string; quote: Quote }> {
    return this.request<{ message: string; quote: Quote }>(`/admin/quotes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ statut: status }),
    })
  }

  async deleteQuote(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/quotes/${id}`, {
      method: 'DELETE',
    })
  }

  // Méthode pour soumettre une demande de devis
  async submitQuote(data: QuoteFormData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Méthodes de gestion des actualités
  // Routes publiques
  async getArticles(page: number = 1, status?: 'published' | 'draft'): Promise<ArticlesResponse> {
    const params = new URLSearchParams({ page: page.toString() })
    if (status) params.append('status', status)
    return this.request<ArticlesResponse>(`/news?${params.toString()}`)
  }

  async getPopularArticles(limit: number = 5): Promise<Article[]> {
    return this.request<Article[]>(`/news/popular?limit=${limit}`)
  }

  async getArticle(id: number): Promise<Article> {
    return this.request<Article>(`/news/${id}`)
  }

  // Routes admin protégées
  async createArticle(data: CreateArticleData): Promise<Article> {
    return this.request<Article>('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateArticle(id: number, data: Partial<CreateArticleData>): Promise<Article> {
    return this.request<Article>(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteArticle(id: number): Promise<void> {
    await this.request<void>(`/news/${id}`, {
      method: 'DELETE',
    })
  }

  async uploadArticleImage(file: File): Promise<{ image_url: string }> {
    const formData = new FormData()
    formData.append('image', file)
    
    const url = `${API_BASE_URL}/news/upload`
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      },
      body: formData,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }
}

export const apiService = new ApiService()