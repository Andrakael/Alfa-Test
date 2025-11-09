import React from 'react';
import { Package, Users, History, Tag, ShoppingCart, Settings, Home, Menu, X, LogOut, User as UserIcon, Shield } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const username = localStorage.getItem('nexus_user') || 'Usuário';
  const userRole = localStorage.getItem('nexus_role') || 'usuario';

  const baseTabs = [
    { id: 'home', label: 'Home', icon: Home, color: 'from-blue-500 to-blue-600' },
    { id: 'produtos', label: 'Produtos', icon: Package, color: 'from-green-500 to-green-600' },
    { id: 'categorias', label: 'Categorias', icon: Tag, color: 'from-purple-500 to-purple-600' },
    { id: 'clientes', label: 'Clientes', icon: Users, color: 'from-orange-500 to-orange-600' },
    { id: 'vendas', label: 'Vendas', icon: ShoppingCart, color: 'from-red-500 to-red-600' },
    { id: 'transacoes', label: 'Histórico', icon: History, color: 'from-indigo-500 to-indigo-600' },
    { id: 'configuracoes', label: 'Configurações', icon: Settings, color: 'from-gray-500 to-gray-600' },
  ];

  // Adicionar aba secreta só para admin
  const tabs = userRole === 'admin' 
    ? [...baseTabs, { id: 'gerenciar-usuarios', label: '🔐 Admin', icon: Shield, color: 'from-red-600 to-pink-600' }]
    : baseTabs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                  <Package className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    NEXUS
                  </span>
                  <div className="text-sm text-gray-300 font-medium">
                    Gestão de Estoque IA
                  </div>
                </div>
              </div>
            </div>
            
            {/* User info and logout */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <UserIcon className="h-5 w-5 text-cyan-400" />
                <span className="text-white font-medium capitalize">{username}</span>
              </div>
              
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="hidden md:flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-lg transition-all"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sair</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {sidebarOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-4 md:pr-80">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Desktop */}
        <aside className="hidden md:block fixed right-0 top-18 h-[calc(100vh-4.5rem)] w-80 bg-gradient-to-b from-slate-50 to-white shadow-2xl border-l border-purple-200/50 overflow-y-auto backdrop-blur-sm">
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Central de Comando
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <nav className="space-y-3">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-br ' + tab.color + ' text-white shadow-2xl shadow-purple-500/25 border border-white/20'
                        : 'bg-white/80 hover:bg-white hover:shadow-xl text-gray-700 hover:text-gray-900 border border-gray-200/50 hover:border-purple-300/50'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isActive 
                          ? 'bg-white/20' 
                          : 'bg-gradient-to-r ' + tab.color + ' text-white'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{tab.label}</div>
                        <div className={`text-sm ${
                          isActive ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {tab.id === 'home' && 'Dashboard principal'}
                          {tab.id === 'produtos' && 'Gerenciar produtos'}
                          {tab.id === 'categorias' && 'Organizar categorias'}
                          {tab.id === 'clientes' && 'Base de clientes'}
                          {tab.id === 'vendas' && 'Processar vendas'}
                          {tab.id === 'transacoes' && 'Histórico completo'}
                          {tab.id === 'configuracoes' && 'Ajustes do sistema'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Active indicator & Effects */}
                    {isActive && (
                      <>
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-white rounded-r-full shadow-lg"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-2 right-4 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
                      </>
                    )}
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="space-y-3">
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          onTabChange(tab.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isActive 
                              ? 'bg-white/20' 
                              : 'bg-gradient-to-r ' + tab.color + ' text-white'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{tab.label}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};