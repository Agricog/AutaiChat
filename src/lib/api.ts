const API_BASE = import.meta.env.VITE_API_URL || 'https://api.autoreplychat.com';

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('arc_token');
  }

  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  async post(endpoint: string, body: Record<string, unknown>, includeAuth = true) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(includeAuth),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  async get(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  async delete(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }
}

export const api = new ApiClient();
export { API_BASE };
