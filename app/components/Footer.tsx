export function Footer() {
  return (
    <footer className="relative bg-black border-t border-zinc-800/50 overflow-hidden">
      {/* Efectos de luz de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Columna 1 - Marca */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-black">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                  ENERGY
                </span>
              </h3>
              <p className="text-zinc-400 text-sm mt-2">
                Potencia tu día con energía premium
              </p>
            </div>
            
            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-purple-500/30 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-pink-500/30 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2 - Productos */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Productos
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Bebidas Energéticas
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Ediciones Especiales
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Packs y Combos
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Merchandising
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Compañía */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Compañía
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-zinc-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Prensa
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-zinc-400 hover:text-pink-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-pink-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-pink-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-pink-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Envíos y Devoluciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador con gradiente */}
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            © 2025 Energy Drinks. Todos los derechos reservados.
          </p>
          
          {/* Métodos de pago */}
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Aceptamos</span>
            <div className="flex gap-2">
              <div className="w-10 h-7 rounded bg-white/5 border border-zinc-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.273 8.182h-3.091v7.636h3.091V8.182zm-4.364 0H8.182l2.727 7.636h2.727l-2.727-7.636z"/>
                </svg>
              </div>
              <div className="w-10 h-7 rounded bg-white/5 border border-zinc-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </div>
              <div className="w-10 h-7 rounded bg-white/5 border border-zinc-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de brillo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50" />
    </footer>
  );
}