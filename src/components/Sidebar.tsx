import { NavLink } from 'react-router-dom';
import {
  Brain,
  Target,
  ChevronLeft,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Evidence Engine', icon: Target },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-bloomberg-850 border-r border-bloomberg-700 z-40 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-bloomberg-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-accent-orange" />
              <span className="font-semibold text-lg text-bloomberg-100">MacroMind</span>
            </div>
          )}
          {collapsed && <Brain className="w-8 h-8 text-accent-orange mx-auto" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded hover:bg-bloomberg-700 transition-colors text-bloomberg-400 hover:text-bloomberg-200"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive ? 'nav-item-active' : 'nav-item'} ${collapsed ? 'justify-center px-2' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={20} className={collapsed ? 'mx-auto' : ''} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-bloomberg-700">
          {!collapsed && (
            <div className="text-xs text-bloomberg-400">
              <p className="font-medium text-bloomberg-300 mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-data-positive animate-pulse"></span>
                <span>API Ready</span>
              </div>
            </div>
          )}
          {collapsed && (
            <span className="w-2 h-2 rounded-full bg-data-positive animate-pulse block mx-auto"></span>
          )}
        </div>
      </div>
    </aside>
  );
}
