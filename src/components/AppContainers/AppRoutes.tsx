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
import NewPostPage from 'pages/SelfCreatorPages/NewPostPages/NewPostPage';
import DraftPostPage from 'pages/SelfCreatorPages/DraftPostPages/DraftPostPage';
import PublishedPostsPage from 'pages/SelfCreatorPages/PublishedPostPages/PublishedPostsPage';
import YourCommunityPage from 'pages/SelfCreatorPages/YourCommunityPages/YourCommunityPage';
import SettingsPage from 'pages/SelfCreatorPages/SettingPages/SettingsPage';

import CreatorPage from 'pages/CreatorPages/CreatorPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import SearchPage from 'pages/CommonPages/SearchPages/SearchPage';
import HelpCenterPage from 'pages/CommonPages/HelpCenterPage/HelpCenterPage';
import NotFoundPage from 'pages/CommonPages/NotFoundPage';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
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
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/search" element={<SearchPage />} />
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
        path="/drafts"
        element={<OnlyCreatorRoute element={<DraftPostPage />} />}
      />
      <Route
        path="/drafts/:postType/:postId"
        element={<OnlyCreatorRoute element={<DraftPostPage />} />}
      />
      <Route
        path="/drafts/:postType"
        element={<OnlyCreatorRoute element={<DraftPostPage />} />}
      />
      <Route
        path="/published"
        element={<OnlyCreatorRoute element={<PublishedPostsPage />} />}
      />
      <Route
        path="/sponsors"
        element={<OnlyCreatorRoute element={<YourCommunityPage />} />}
      />
      <Route
        path="/settings"
        element={<OnlyCreatorRoute element={<SettingsPage />} />}
      />
    </Routes>
  );
}
