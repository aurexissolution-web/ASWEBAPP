import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import aurexisLogoWebp from '../src/assets/aurexis-logo.webp';
import aurexisLogoPng from '../src/assets/aurexis-logo.png';
import { useAuth } from '../context/AuthContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const run = async () => {
      try {
        await logout();
      } catch (error) {
        console.warn('Unable to sign out user', error);
      } finally {
        timer = setTimeout(() => navigate('/', { replace: true }), 1800);
      }
    };

    run();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#040918] via-[#071331] to-[#0b1e45] text-white flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-[0_25px_80px_rgba(15,23,42,0.45)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_60%)]" />
          <div className="absolute inset-2 rounded-full border border-white/30" />
          <picture className="relative z-10 w-16 h-16">
            <source srcSet={aurexisLogoWebp} type="image/webp" />
            <img
              src={aurexisLogoPng}
              alt="Aurexis Solution logo"
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-blue-200/80">Logged Out</p>
          <h1 className="text-3xl sm:text-4xl font-semibold">Aurexis Solution</h1>
          <p className="text-base text-blue-100/80">See you again!</p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 text-blue-200 animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default Logout;
