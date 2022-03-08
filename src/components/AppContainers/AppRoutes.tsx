import React from 'react';
import OnlyAuthRoute from 'services/Utils/Router/OnlyAuthRoute';
import OnlyCreatorRoute from 'services/Utils/Router/OnlyCreatorRoute';
import {
  HomeRootRouting,
  HomeUserRouting,
  HomeCreatorRouting,
} from 'services/Utils/Router/HomeRouting';
import { Routes, Route } from 'react-router-dom';

import HomePage from 'pages/HomePages/HomePage';
import UserHomePage from 'pages/HomePages/UserHomePage';
import UserSettingPage from 'pages/UserPages/UserSettingPage';
import BecomeCreatorPage from 'pages/SelfCreatorPages/BecomeCreatorPage';

import CreatorHomePage from 'pages/HomePages/CreatorHomePage';
import NewPostPage from 'pages/SelfCreatorPages/NewPostPage';
import EditPostPage from 'pages/SelfCreatorPages/EditPostPages/EditPostPage';
import PublishedPostsPage from 'pages/SelfCreatorPages/PublishedPostsPage';
import YourCommunityPage from 'pages/SelfCreatorPages/YourCommunityPages/YourCommunityPage';
import SettingsPage from 'pages/SelfCreatorPages/SettingPages/SettingsPage';

import CreatorPage from 'pages/CreatorPages/CreatorPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import NotFoundPage from 'pages/CommonPages/NotFoundPage';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      {/* This route will redirect if Auth */}
      <Route
        path="/"
        element={
          <HomeRootRouting
            element={<HomePage />}
            userRoute="home"
            creatorRoute="creator-home"
          />
        }
      />
      <Route
        path="/home"
        element={<HomeUserRouting element={<UserHomePage />} />}
      />

      {/* Auth Pages */}
      <Route
        path="/user-settings"
        element={
          <OnlyAuthRoute element={<UserSettingPage />} route="user-settings" />
        }
      />
      <Route
        path="/become-creator"
        element={
          <OnlyAuthRoute
            element={<BecomeCreatorPage />}
            route="become-creator"
          />
        }
      />

      {/* Public Pages */}
      <Route path="/c/:creator" element={<CreatorPage />} />
      <Route path="/c/:creator/:postId" element={<CreatorPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Creator Pages */}
      <Route
        path="/creator-home"
        element={
          <HomeCreatorRouting element={<CreatorHomePage />} userRoute="home" />
        }
      />

      <Route
        path="/new-post"
        element={<OnlyCreatorRoute element={<NewPostPage />} />}
      />
      <Route
        path="/edit/:postType/:postId"
        element={<OnlyCreatorRoute element={<EditPostPage />} />}
      />
      <Route
        path="/edit/:postType"
        element={<OnlyCreatorRoute element={<EditPostPage />} />}
      />
      <Route
        path="/published"
        element={<OnlyCreatorRoute element={<PublishedPostsPage />} />}
      />
      <Route
        path="/community"
        element={<OnlyCreatorRoute element={<YourCommunityPage />} />}
      />
      <Route
        path="/settings"
        element={<OnlyCreatorRoute element={<SettingsPage />} />}
      />
    </Routes>
  );
}
