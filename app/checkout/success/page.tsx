import Link from "next/link";

type Props = {
  searchParams: {
    orderId?: string;
  };
};

export default function CheckoutSuccess({ searchParams }: Props) {
  const orderId = searchParams.orderId;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white px-6">
      <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-emerald-400">
          ¡Compra realizada!
        </h1>

        <p className="text-zinc-300">
          Tu orden fue creada correctamente.
        </p>

        {orderId && (
          <p className="text-sm text-zinc-400">
            ID de orden:
            <br />
            <span className="font-mono text-white">
              {orderId}
            </span>
          </p>
        )}

        <Link
          href="/"
          className="inline-block mt-6 bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-xl"
        >
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
