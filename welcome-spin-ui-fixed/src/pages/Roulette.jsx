import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBalance } from '@/contexts/BalanceContext';
import Header from '@/components/Header';
import { toast } from 'sonner';

const numbers = [
  { num: 0, color: 'green' },
  { num: 32, color: 'red' }, { num: 15, color: 'black' }, { num: 19, color: 'red' },
  { num: 4, color: 'black' }, { num: 21, color: 'red' }, { num: 2, color: 'black' },
  { num: 25, color: 'red' }, { num: 17, color: 'black' }, { num: 34, color: 'red' },
  { num: 6, color: 'black' }, { num: 27, color: 'red' }, { num: 13, color: 'black' },
  { num: 36, color: 'red' }, { num: 11, color: 'black' }, { num: 30, color: 'red' },
  { num: 8, color: 'black' }, { num: 23, color: 'red' }, { num: 10, color: 'black' },
  { num: 5, color: 'red' }, { num: 24, color: 'black' }, { num: 16, color: 'red' },
  { num: 33, color: 'black' }, { num: 1, color: 'red' }, { num: 20, color: 'black' },
  { num: 14, color: 'red' }, { num: 31, color: 'black' }, { num: 9, color: 'red' },
  { num: 22, color: 'black' }, { num: 18, color: 'red' }, { num: 29, color: 'black' },
  { num: 7, color: 'red' }, { num: 28, color: 'black' }, { num: 12, color: 'red' },
  { num: 35, color: 'black' }, { num: 3, color: 'red' }, { num: 26, color: 'black' },
];

const Roulette = () => {
  const { balance, addWinnings, deductBet } = useBalance();
  const [betAmount, setBetAmount] = useState('10');
  const [selectedBet, setSelectedBet] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (!selectedBet) {
      toast.error('Selecciona una apuesta primero');
      return;
    }

    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0) {
      toast.error('Ingresa una cantidad válida');
      return;
    }

    if (!deductBet(bet)) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const winningNumber = numbers[randomIndex];
    
    // Calculate rotation (10 full spins + position)
    const baseRotation = 360 * 10;
    const segmentAngle = 360 / numbers.length;
    const targetRotation = baseRotation + (randomIndex * segmentAngle);
    setRotation(targetRotation);

    setTimeout(() => {
      setResult(winningNumber);
      setSpinning(false);
      checkWin(winningNumber, bet);
    }, 4000);
  };

  const checkWin = (winningNumber, bet) => {
    let won = false;
    let multiplier = 0;

    if (selectedBet?.type === 'number' && selectedBet.value === winningNumber.num) {
      won = true;
      multiplier = 35;
    } else if (selectedBet?.type === 'red' && winningNumber.color === 'red') {
      won = true;
      multiplier = 1;
    } else if (selectedBet?.type === 'black' && winningNumber.color === 'black') {
      won = true;
      multiplier = 1;
    } else if (selectedBet?.type === 'even' && winningNumber.num % 2 === 0 && winningNumber.num !== 0) {
      won = true;
      multiplier = 1;
    } else if (selectedBet?.type === 'odd' && winningNumber.num % 2 === 1) {
      won = true;
      multiplier = 1;
    }

    if (won) {
      const winnings = bet * multiplier + bet;
      addWinnings(winnings);
    } else {
      toast.error(`Perdiste €${bet.toFixed(2)}`, {
        description: `Salió: ${winningNumber.num} ${winningNumber.color === 'green' ? '🟢' : winningNumber.color === 'red' ? '🔴' : '⚫'}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-center mb-8 text-gradient">
            Ruleta Europea
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Wheel */}
            <Card className="p-8 bg-card">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted to-card border-8 border-primary/30 glow-gold">
                  <div 
                    className="w-full h-full rounded-full transition-transform duration-[4000ms] ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {numbers.map((n, i) => {
                      const angle = (i * 360) / numbers.length;
                      return (
                        <div
                          key={i}
                          className="absolute w-full h-full"
                          style={{ transform: `rotate(${angle}deg)` }}
                        >
                          <div
                            className={`absolute top-2 left-1/2 -translate-x-1/2 w-8 h-12 flex items-start justify-center text-xs font-bold ${
                              n.color === 'red' ? 'text-accent' : n.color === 'black' ? 'text-foreground' : 'text-secondary'
                            }`}
                          >
                            {n.num}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary glow-gold-strong" />
                  </div>
                </div>
              </div>

              {result && !spinning && (
                <div className="mt-6 text-center animate-fade-in">
                  <p className="text-lg text-muted-foreground mb-2">Resultado:</p>
                  <div className={`text-5xl font-bold ${
                    result.color === 'red' ? 'text-accent' : result.color === 'black' ? 'text-foreground' : 'text-secondary'
                  }`}>
                    {result.num}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {result.color === 'green' ? '🟢 Verde' : result.color === 'red' ? '🔴 Rojo' : '⚫ Negro'}
                  </p>
                </div>
              )}
            </Card>

            {/* Betting Area */}
            <div className="space-y-6">
              <Card className="p-6 bg-card">
                <h3 className="text-xl font-semibold mb-4">Cantidad de Apuesta</h3>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Cantidad"
                  min="1"
                  className="mb-4"
                  disabled={spinning}
                />

                <h3 className="text-xl font-semibold mb-4">Tipo de Apuesta</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={selectedBet?.type === 'red' ? 'default' : 'outline'}
                    className={selectedBet?.type === 'red' ? 'bg-accent hover:bg-accent/90' : 'border-accent text-accent hover:bg-accent/10'}
                    onClick={() => setSelectedBet({ type: 'red' })}
                    disabled={spinning}
                  >
                    🔴 Rojo (x2)
                  </Button>
                  <Button
                    variant={selectedBet?.type === 'black' ? 'default' : 'outline'}
                    onClick={() => setSelectedBet({ type: 'black' })}
                    disabled={spinning}
                  >
                    ⚫ Negro (x2)
                  </Button>
                  <Button
                    variant={selectedBet?.type === 'even' ? 'default' : 'outline'}
                    onClick={() => setSelectedBet({ type: 'even' })}
                    disabled={spinning}
                  >
                    Par (x2)
                  </Button>
                  <Button
                    variant={selectedBet?.type === 'odd' ? 'default' : 'outline'}
                    onClick={() => setSelectedBet({ type: 'odd' })}
                    disabled={spinning}
                  >
                    Impar (x2)
                  </Button>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-muted-foreground mb-3">Número Específico (x36)</h4>
                  <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
                    {numbers.slice(1).map((n) => (
                      <Button
                        key={n.num}
                        variant={selectedBet?.type === 'number' && selectedBet.value === n.num ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedBet({ type: 'number', value: n.num })}
                        disabled={spinning}
                        className={`${
                          n.color === 'red' 
                            ? 'border-accent hover:bg-accent/10' 
                            : 'border-foreground/30 hover:bg-foreground/10'
                        }`}
                      >
                        {n.num}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              <Button
                size="lg"
                className="w-full gradient-gold text-background font-bold text-xl py-6 glow-gold-strong"
                onClick={spin}
                disabled={spinning || !selectedBet}
              >
                {spinning ? '🎰 Girando...' : '🎰 Girar Ruleta'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
