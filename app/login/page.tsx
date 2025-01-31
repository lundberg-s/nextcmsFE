'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/user-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      });
      router.push('/admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
