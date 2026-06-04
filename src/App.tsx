import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import type { Post, PostFormData } from './types'
import { logout } from './services/auth'
import { fetchPosts, createPost, updatePostStatus } from './services/posts'
import { getToken } from './services/api'
import AppShell from './components/layout/AppShell'
import AdminShell from './components/layout/AdminShell'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import SubmissionForm from './components/organisms/forms/SubmissionForm'
import BlogPreview from './components/organisms/blog/BlogPreview'
import SubmissionQueue from './components/organisms/admin/SubmissionQueue'
import ReviewPanel from './components/organisms/admin/ReviewPanel'

export default function App() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(() => !!getToken())
  const [posts, setPosts] = useState<Post[]>([])
  const [draft, setDraft] = useState<Post | null>(null)
  const [draftFormData, setDraftFormData] = useState<PostFormData | null>(null)
  const [adminPost, setAdminPost] = useState<Post | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')

  // Load posts whenever admin is authenticated
  useEffect(() => {
    if (!isAdmin) return
    fetchPosts()
      .then(setPosts)
      .catch(console.error)
  }, [isAdmin])

  function handleLogin() {
    setIsAdmin(true)
    navigate('/admin')
  }

  async function handleLogout() {
    await logout()
    setIsAdmin(false)
    setPosts([])
    navigate('/')
  }

  function handleFormSubmit(data: PostFormData) {
    const preview: Post = {
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      }),
      title:      data.title,
      content:    data.content,
      tags:       data.tags,
      template:   data.template,
      authorName: data.authorName,
    }
    setDraft(preview)
    setDraftFormData(data)
    setPublishError('')
    navigate('/preview')
  }

  async function handlePublish(post: Post) {
    if (!draftFormData) return
    setPublishing(true)
    setPublishError('')
    try {
      await createPost({ ...draftFormData, template: post.template })
      setDraft(null)
      setDraftFormData(null)
      navigate(isAdmin ? '/admin' : '/')
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : 'Failed to publish. Is the backend running?')
    } finally {
      setPublishing(false)
    }
  }

  async function handleApprove(id: string) {
    await updatePostStatus(id, 'approved').catch(console.error)
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p))
    setAdminPost(null)
    navigate('/admin')
  }

  async function handleReject(id: string) {
    await updatePostStatus(id, 'rejected').catch(console.error)
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p))
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
                publishing={publishing}
                error={publishError}
              />
            </AppShell>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

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

      {/* OAuth callback — provider redirects browser here with ?token= */}
      <Route
        path="/auth/callback"
        element={<OAuthCallbackPage onLogin={handleLogin} />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
