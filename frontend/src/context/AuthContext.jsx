import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import api from '../api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
 const [user,setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('yt_user')); } catch { return null; } });
 const [loading,setLoading] = useState(Boolean(localStorage.getItem('yt_token')));
 useEffect(() => { if (!localStorage.getItem('yt_token')) { setLoading(false); return; } api.get('/auth/me').then(r=>{setUser(r.data.user);localStorage.setItem('yt_user',JSON.stringify(r.data.user));}).catch(()=>{localStorage.removeItem('yt_token');localStorage.removeItem('yt_user');setUser(null);}).finally(()=>setLoading(false)); },[]);
 const login = data => { localStorage.setItem('yt_token',data.token); localStorage.setItem('yt_user',JSON.stringify(data.user)); setUser(data.user); };
 const logout = () => { localStorage.removeItem('yt_token'); localStorage.removeItem('yt_user'); setUser(null); };
 return <AuthContext.Provider value={{user,login,logout,loading}}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
