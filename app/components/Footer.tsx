export function Footer() {
  return (
    <footer className="relative bg-black border-t border-zinc-800/50 overflow-hidden">
      {/* Efectos de luz de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[200px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[200px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Contenido central */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo/Marca */}
          <div className="flex items-center gap-3">
            <img
              src="/products/logosvg.svg"
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
            <h3 className="text-2xl font-black text-white">
              RAYNIX ENERGY
            </h3>
          </div>

          {/* Copyright */}
          <p className="text-zinc-500 text-sm text-center">
            © 2025 Raynix Energy. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Efecto de brillo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </footer>
  );
}