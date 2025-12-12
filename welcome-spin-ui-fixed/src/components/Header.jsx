import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins, Sparkles } from 'lucide-react';
import { useBalance } from '@/contexts/BalanceContext';
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const { balance, resetBalance } = useBalance();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-8 h-8 text-primary animate-glow-pulse" />
            <h1 className="text-2xl font-display font-bold text-gradient">
              Royal Casino
            </h1>
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Inicio
            </Link>

            <Link
              to="/roulette"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/roulette') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Ruleta
            </Link>

            <Link
              to="/slots"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/slots') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Tragaperras
            </Link>
          </nav>

          {/* Derecha del header */}
          <div className="flex items-center gap-4">

            {/* LOGIN / USER */}
            {!user ? (
              /* Si NO hay usuario → botón LOGIN */
              <Link to="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
            ) : (
              /* Si hay usuario → mostrar nombre + logout */
              <>
                <span className="font-semibold text-primary">
                  Hola, {user.username}
                </span>

                <Button variant="outline" onClick={logout}>
                  Cerrar sesión
                </Button>
              </>
            )}

            {/* SALDO */}
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg glow-gold">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold text-primary">
                €{balance.toFixed(2)}
              </span>
            </div>

            {/* REINICIAR */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetBalance}
              className="hidden md:flex"
            >
              Reiniciar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
