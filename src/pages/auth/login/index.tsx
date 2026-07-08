import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema, LoginType } from '@/validations/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputErrorWrapper from '@/components/custom/input-error-wrapper';

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 100));
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-page">
      {/* Decorative blur background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-light/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-primary-light/70 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-bg-surface p-8 shadow-md sm:p-10">
          <div className="flex flex-col items-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-lg font-semibold text-white">
              T
            </div>
            <h1 className="mt-5 text-2xl font-semibold text-text-default">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-text-neutral">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <InputErrorWrapper error={errors.email?.message}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-text-default"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  {...register('email')}
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-bg-default px-4 py-3 text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </InputErrorWrapper>

            <InputErrorWrapper error={errors.password?.message}>
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-medium text-text-default"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={show ? 'text' : 'password'}
                    required
                    {...register('password')}
                    placeholder="Enter your password"
                    className="w-full rounded-xl bg-bg-default px-4 py-3 pr-11 text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute inset-y-0 right-3 flex items-center text-text-neutral hover:text-text-default"
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </InputErrorWrapper>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <div className="text-center">
              <Link
                to="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="border-t border-border pt-5">
              <p className="text-center text-xs text-text-disabled">
                Don't have an account?
              </p>
              <button
                type="button"
                className="mt-3 w-full rounded-xl border border-border bg-bg-surface py-3 text-sm font-medium text-text-default transition-colors hover:bg-bg-default"
              >
                Create a Trove account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
