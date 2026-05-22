import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import type { Post, PostFormData } from './types'
import AppShell from './components/layout/AppShell'
import AdminShell from './components/layout/AdminShell'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SubmissionForm from './components/organisms/forms/SubmissionForm'
import BlogPreview from './components/organisms/blog/BlogPreview'
import SubmissionQueue from './components/organisms/admin/SubmissionQueue'
import ReviewPanel from './components/organisms/admin/ReviewPanel'

export default function App() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [draft, setDraft] = useState<Post | null>(null)
  const [adminPost, setAdminPost] = useState<Post | null>(null)

  function handleLogin() {
    setIsAdmin(true)
    navigate('/admin')
  }

  function handleLogout() {
    setIsAdmin(false)
    navigate('/')
  }

  function handleFormSubmit(data: PostFormData) {
    const post: Post = {
      id: crypto.randomUUID(),
      status: 'draft',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      title: data.title,
      content: data.content,
      tags: data.tags,
      template: data.template,
      authorName: data.authorName,
    }
    setDraft(post)
    navigate('/preview')
  }

  function handlePublish(post: Post) {
    setPosts((prev) => [{ ...post, status: 'pending' }, ...prev])
    setDraft(null)
    navigate(isAdmin ? '/admin' : '/')
  }

  function handleApprove(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p)))
    setAdminPost(null)
    navigate('/admin')
  }

  function handleReject(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p)))
    setAdminPost(null)
    navigate('/admin')
  }

  function handleReview(post: Post) {
    setAdminPost(post)
    navigate('/admin/review')
  }

  const shell = { isAdmin, onLogout: handleLogout }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell {...shell}>
            <HomePage onGetStarted={() => navigate('/create')} />
          </AppShell>
        }
      />

      <Route
        path="/create"
        element={
          <AppShell {...shell}>
            <SubmissionForm onSubmit={handleFormSubmit} onCancel={() => navigate('/')} />
          </AppShell>
        }
      />

      <Route
        path="/preview"
        element={
          draft ? (
            <AppShell {...shell}>
              <BlogPreview
                post={draft}
                onBack={() => navigate('/create')}
                onPublish={handlePublish}
              />
            </AppShell>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Hidden admin login — no link points here from the UI */}
      <Route
        path="/admin/login"
        element={
          isAdmin ? (
            <Navigate to="/admin" replace />
          ) : (
            <AppShell {...shell}>
              <LoginPage onLogin={handleLogin} />
            </AppShell>
          )
        }
      />

      <Route
        path="/admin"
        element={
          !isAdmin ? (
            <Navigate to="/admin/login" replace />
          ) : (
            <AdminShell onLogout={handleLogout}>
              <SubmissionQueue posts={posts} onReview={handleReview} />
            </AdminShell>
          )
        }
      />

      <Route
        path="/admin/review"
        element={
          !isAdmin ? (
            <Navigate to="/admin/login" replace />
          ) : !adminPost ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminShell onLogout={handleLogout}>
              <ReviewPanel
                post={adminPost}
                onApprove={handleApprove}
                onReject={handleReject}
                onBack={() => navigate('/admin')}
              />
            </AdminShell>
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
