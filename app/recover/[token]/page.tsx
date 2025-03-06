'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-hot-toast';

// Form schema for password reset
const passwordResetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

export default function RecoverPage({ params }: { params: { token: string } }) {
  const { token } = params;
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Verify token is valid
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Here you would call your API to verify the token
        const response = await fetch(`/api/auth/verify-reset-token?token=${token}`);
        if (!response.ok) {
          setIsValidToken(false);
        }
      } catch (error) {
        setIsValidToken(false);
      }
    };

    verifyToken();
  }, [token]);

  // Form submission handler
  async function onSubmit(values: PasswordResetFormValues) {
    try {
      setIsLoading(true);
      // Here you would call your API to reset the password
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: values.password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      toast.success('Password reset successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  }

  if (!isValidToken) {
    return (
      <div className="container max-w-md mx-auto py-10">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Invalid or Expired Token</h1>
          <p>The password reset link is invalid or has expired.</p>
          <Button onClick={() => router.push('/forgot-password')}>Request New Link</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-10">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
