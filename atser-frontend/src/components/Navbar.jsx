import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { LogOut, LayoutDashboard, History } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-lg"
        >
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard size={18} />
          </div>
          ATSER
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* ✅ ALWAYS VISIBLE */}
          <ThemeToggle />

          {user && (
            <>
              <Link to="/history">
                <Button 
                  variant={location.pathname === "/history" ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-2"
                >
                  <History size={16} />
                  History
                </Button>
              </Link>

              <Separator orientation="vertical" className="h-6" />

              <Avatar className="h-9 w-9 border">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}