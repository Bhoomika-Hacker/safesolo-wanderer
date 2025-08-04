import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, Mail, Lock, User, Phone, Car, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone: string;
  role: 'passenger' | 'female_driver';
  date_of_birth?: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

interface DriverProfileData {
  license_number: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_color: string;
  vehicle_plate: string;
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const { signUp, signIn, signInWithGoogle, user, profile, createDriverProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  const signUpForm = useForm<SignUpFormData>();
  const signInForm = useForm<SignInFormData>();
  const driverForm = useForm<DriverProfileData>();

  useEffect(() => {
    if (user && profile) {
      if (profile.role === 'female_driver' && !showDriverForm) {
        // Check if driver profile exists, if not show driver form
        setShowDriverForm(true);
      } else {
        navigate('/');
      }
    }
  }, [user, profile, navigate, showDriverForm]);

  const handleSignUp = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      signUpForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    const { error } = await signUp(data.email, data.password, {
      full_name: data.full_name,
      phone: data.phone,
      role: data.role,
    });

    if (!error) {
      signUpForm.reset();
    }
  };

  const handleSignIn = async (data: SignInFormData) => {
    const { error } = await signIn(data.email, data.password);
    
    if (!error) {
      signInForm.reset();
    }
  };

  const handleDriverProfile = async (data: DriverProfileData) => {
    const { error } = await createDriverProfile(data);
    
    if (!error) {
      setShowDriverForm(false);
      navigate('/');
    }
  };

  if (showDriverForm && user && profile?.role === 'female_driver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-trust">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Car className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Driver Registration</CardTitle>
            <CardDescription>
              Complete your driver profile to start accepting rides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={driverForm.handleSubmit(handleDriverProfile)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="license_number">License Number</Label>
                <Input
                  id="license_number"
                  placeholder="Enter your license number"
                  {...driverForm.register('license_number', { required: 'License number is required' })}
                />
                {driverForm.formState.errors.license_number && (
                  <p className="text-sm text-destructive">{driverForm.formState.errors.license_number.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle_make">Vehicle Make</Label>
                  <Input
                    id="vehicle_make"
                    placeholder="Toyota, Honda, etc."
                    {...driverForm.register('vehicle_make', { required: 'Vehicle make is required' })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle_model">Vehicle Model</Label>
                  <Input
                    id="vehicle_model"
                    placeholder="Camry, Civic, etc."
                    {...driverForm.register('vehicle_model', { required: 'Vehicle model is required' })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle_year">Vehicle Year</Label>
                  <Input
                    id="vehicle_year"
                    type="number"
                    placeholder="2020"
                    {...driverForm.register('vehicle_year', { 
                      required: 'Vehicle year is required',
                      valueAsNumber: true,
                      min: { value: 2010, message: 'Vehicle must be 2010 or newer' }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle_color">Vehicle Color</Label>
                  <Input
                    id="vehicle_color"
                    placeholder="Red, Blue, etc."
                    {...driverForm.register('vehicle_color', { required: 'Vehicle color is required' })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle_plate">License Plate</Label>
                <Input
                  id="vehicle_plate"
                  placeholder="ABC-1234"
                  {...driverForm.register('vehicle_plate', { required: 'License plate is required' })}
                />
              </div>

              <Button type="submit" className="w-full" variant="hero" disabled={loading}>
                {loading ? 'Creating Profile...' : 'Complete Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-trust">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to SafeSolo</CardTitle>
          <CardDescription>
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isSignUp ? 'signup' : 'signin'} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" onClick={() => setIsSignUp(false)}>
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" onClick={() => setIsSignUp(true)}>
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={signInWithGoogle}
                disabled={loading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    {...signInForm.register('email', { required: 'Email is required' })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    {...signInForm.register('password', { required: 'Password is required' })}
                  />
                </div>
                <Button type="submit" className="w-full" variant="hero" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={signInWithGoogle}
                disabled={loading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign up with email
                  </span>
                </div>
              </div>

              <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">I want to</Label>
                  <RadioGroup 
                    defaultValue="passenger" 
                    onValueChange={(value) => signUpForm.setValue('role', value as 'passenger' | 'female_driver')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passenger" id="passenger" />
                      <Label htmlFor="passenger">Book rides as a passenger</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female_driver" id="female_driver" />
                      <Label htmlFor="female_driver">Drive for SafeSolo (Female drivers only)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      placeholder="Enter your full name"
                      {...signUpForm.register('full_name', { required: 'Full name is required' })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone"
                      {...signUpForm.register('phone', { required: 'Phone is required' })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...signUpForm.register('email', { required: 'Email is required' })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    {...signUpForm.register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    {...signUpForm.register('confirmPassword', { required: 'Please confirm your password' })}
                  />
                  {signUpForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{signUpForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" variant="hero" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;