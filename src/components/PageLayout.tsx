import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function PageLayout({ children, title, subtitle, icon }: PageLayoutProps) {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'} transition-colors duration-300`}>
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-slate-800 to-slate-900' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} p-6 text-white shadow-lg transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 mb-4 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center space-x-4">
            {icon && (
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {subtitle && <p className={`${isDarkMode ? 'text-slate-300' : 'text-blue-100'} text-sm`}>{subtitle}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
}
