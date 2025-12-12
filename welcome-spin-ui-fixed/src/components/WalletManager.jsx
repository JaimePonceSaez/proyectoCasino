import { useState } from "react";

export default function WalletManager({ username }) {
  const [amount, setAmount] = useState(0);

  const doAction = async (action) => {
    const res = await fetch(`http://localhost:4000/api/wallet/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount })
    });

    const data = await res.json();
    console.log(data);
    alert("Acción realizada");
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Gestionar dinero</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 w-full mb-3"
      />

      <button onClick={() => doAction("add")} className="btn">Añadir</button>
      <button onClick={() => doAction("remove")} className="btn">Restar</button>
      <button onClick={() => doAction("reset")} className="btn">Resetear</button>
    </div>
  );
}
