import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBalance } from '@/contexts/BalanceContext';
import Header from '@/components/Header';
import { toast } from 'sonner';

const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '⭐', '7️⃣'];

const payouts = {
  '🍒': 2,
  '🍋': 3,
  '🍊': 4,
  '🍇': 5,
  '💎': 10,
  '⭐': 15,
  '7️⃣': 20,
};

const Slots = () => {
  const { balance, addWinnings, deductBet } = useBalance();
  const [betAmount, setBetAmount] = useState('10');
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [spinning, setSpinning] = useState(false);

  const spin = async () => {
    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0) {
      toast.error('Ingresa una cantidad válida');
      return;
    }

    if (!deductBet(bet)) return;

    setSpinning(true);

    // Animate reels
    const animationFrames = 20;
    for (let i = 0; i < animationFrames; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }

    // Final result
    const finalReels = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
    setReels(finalReels);
    setSpinning(false);

    checkWin(finalReels, bet);
  };

  const checkWin = (finalReels, bet) => {
    // Check for three matching symbols
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const symbol = finalReels[0];
      const multiplier = payouts[symbol];
      const winnings = bet * multiplier;
      addWinnings(winnings);
    } 
    // Check for two matching symbols
    else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
      const winnings = bet * 0.5;
      addWinnings(winnings);
      toast.success(`¡Dos símbolos! +€${winnings.toFixed(2)}`);
    } 
    else {
      toast.error(`Perdiste €${bet.toFixed(2)}`, {
        description: 'Inténtalo de nuevo',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-center mb-8 text-gradient">
            Tragaperras Royal
          </h1>

          <Card className="p-8 bg-card mb-8">
            {/* Slot Machine */}
            <div className="bg-gradient-to-b from-muted to-card rounded-xl p-8 border-4 border-primary/30 glow-gold mb-8">
              <div className="flex justify-center gap-4 mb-8">
                {reels.map((symbol, index) => (
                  <div
                    key={index}
                    className={`w-32 h-32 bg-background border-4 border-primary rounded-xl flex items-center justify-center text-6xl transition-all ${
                      spinning ? 'animate-glow-pulse' : ''
                    }`}
                  >
                    {symbol}
                  </div>
                ))}
              </div>

              {/* Payline */}
              <div className="h-1 bg-primary/50 mb-6" />

              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Cantidad de Apuesta
                  </label>
                  <Input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Cantidad"
                    min="1"
                    disabled={spinning}
                    className="text-lg"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full gradient-gold text-background font-bold text-xl py-6 glow-gold-strong"
                  onClick={spin}
                  disabled={spinning}
                >
                  {spinning ? '🎰 Girando...' : '🎰 Girar'}
                </Button>
              </div>
            </div>

            {/* Paytable */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Tabla de Pagos</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(payouts).map(([symbol, multiplier]) => (
                  <div key={symbol} className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">{symbol}</div>
                    <div className="text-sm text-muted-foreground">3x símbolos</div>
                    <div className="text-lg font-bold text-primary">x{multiplier}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>💡 2 símbolos iguales = 0.5x tu apuesta</p>
                <p>🎯 3 símbolos iguales = Multiplicador completo</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Slots;
