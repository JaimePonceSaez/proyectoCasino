import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CircleDot, Cherry, Sparkles, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';

// Importar AuthContext
import { useAuth } from "@/contexts/AuthContext";

// Importar WalletManager
import WalletManager from "@/components/WalletManager";

const Index = () => {
  
  const { user } = useAuth(); // Saber si hay usuario logueado

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-16 h-16 text-primary animate-glow-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-gradient">
              Bienvenido a Royal Casino
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Experimenta la emoción de un casino de clase mundial desde la comodidad de tu hogar
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-8">
              <Link to="/roulette">
                <Button size="lg" className="gradient-gold text-background font-semibold text-lg px-8 py-6 glow-gold-strong hover:scale-105 transition-transform">
                  Jugar Ruleta
                </Button>
              </Link>
              <Link to="/slots">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background text-lg px-8 py-6 transition-all">
                  Jugar Tragaperras
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------- AGREGAMOS EL MANEJADOR DE SALDO ----------- */}
      <section className="px-4 py-10 flex justify-center">
        {user ? (
          <WalletManager username={user.username} />
        ) : (
          <p className="text-center text-lg text-muted-foreground">
            🔐 Inicia sesión para gestionar tu dinero.
          </p>
        )}
      </section>
      {/* ------------------------------------------------------- */}

      {/* Games Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-12 text-gradient">
            Nuestros Juegos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Roulette Card */}
            <Card className="p-8 bg-card border-border hover:border-primary transition-all group hover:glow-gold cursor-pointer">
              <Link to="/roulette">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <CircleDot className="w-16 h-16 text-primary group-hover:animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-center text-foreground">
                    Ruleta Europea
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Apuesta en números, colores o secciones. Gira la ruleta y espera tu suerte.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">Hasta 35x tu apuesta</span>
                  </div>
                </div>
              </Link>
            </Card>

            {/* Slots Card */}
            <Card className="p-8 bg-card border-border hover:border-accent transition-all group hover:glow-gold cursor-pointer">
              <Link to="/slots">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Cherry className="w-16 h-16 text-accent group-hover:animate-glow-pulse" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-center text-foreground">
                    Tragaperras
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Gira los rodillos y consigue combinaciones ganadoras con símbolos de la suerte.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-accent">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">Premios masivos</span>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Juego Justo</h3>
              <p className="text-muted-foreground">
                Resultados 100% aleatorios y transparentes
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Saldo Inicial</h3>
              <p className="text-muted-foreground">
                Comienza con €1000 para disfrutar
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sin Límites</h3>
              <p className="text-muted-foreground">
                Juega cuando quieras, cuanto quieras
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
