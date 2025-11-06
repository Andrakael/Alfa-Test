import React from 'react';
import { Package, Users, History, Tag, ShoppingCart, Settings, Home, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, color: 'from-blue-500 to-blue-600' },
    { id: 'produtos', label: 'Produtos', icon: Package, color: 'from-green-500 to-green-600' },
    { id: 'categorias', label: 'Categorias', icon: Tag, color: 'from-purple-500 to-purple-600' },
    { id: 'clientes', label: 'Clientes', icon: Users, color: 'from-orange-500 to-orange-600' },
    { id: 'vendas', label: 'Vendas', icon: ShoppingCart, color: 'from-red-500 to-red-600' },
    { id: 'transacoes', label: 'Histórico', icon: History, color: 'from-indigo-500 to-indigo-600' },
    { id: 'configuracoes', label: 'Configurações', icon: Settings, color: 'from-gray-500 to-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Sistema de Gestão
                </span>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-4 md:pr-80">
          <div className="max-w-6xl">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Desktop */}
        <aside className="hidden md:block fixed right-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white shadow-2xl border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Menu de Navegação</h2>
            <nav className="space-y-3">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900'
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
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                    )}
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