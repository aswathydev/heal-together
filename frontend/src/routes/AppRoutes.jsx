import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../pages/admin/AdminLayout';

// Protection Guards
import RequireAdmin from '../pages/admin/RequireAdmin';
import RequireProvider from '../pages/provider/RequireProvider';

// Public/User Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProvidersPage from '../pages/ProvidersPage';
import ProfilePage from '../pages/ProfilePage';

// Admin Pages
import DashboardHome from '../pages/admin/DashboardHome';
import ModerationPage from '../pages/admin/ModerationPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';

// Provider Pages
import ProviderRegisterPage from '../pages/provider/ProviderRegisterPage';
import ProviderDashboardPage from '../pages/provider/ProviderDashboardPage';
import ForgotPasswordPage from '../pages/ForgotPassword';
import GamesPage from '../pages/GamesPage';
import MoodPage from '../pages/MoodPage';
import EmergencySupportPage from '../pages/EmergencySupport';
import Contact from '../pages/ContactUs';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC & USER ROUTES ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />


        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/mood-history" element={<MoodPage />} />
          <Route path='/emergency' element={<EmergencySupportPage />} />
          <Route path='/contactus' element={<Contact />} />

         

          {/* Add your other public/user routes here */}
        </Route>

        {/* ================= PROVIDER ROUTES ================= */}
        <Route path="/provider/register" element={<ProviderRegisterPage />} />
        
        {/* Protected Provider Dashboard */}
        <Route element={<RequireProvider />}>
          <Route element={<MainLayout />}> {/* Or a dedicated ProviderLayout */}
            <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
          </Route>
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Dashboard with different layout */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="moderation" element={<ModerationPage />} />
            {/* Add other nested admin sub-routes here */}
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}