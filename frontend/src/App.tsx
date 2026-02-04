import { useEffect, useMemo, useState } from 'react';
import './styles/app.css';
import {
  AdminUser,
  AdminUserDetail,
  AlertItem,
  ChatPreview,
  LikeStatus,
  Tag,
  UserDetail,
  UserProfile
} from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

type TabKey = 'home' | 'likes' | 'chats' | 'alerts' | 'profile' | 'admin';

type LoginResponse = { token: string; isStaff: boolean };

async function fetchJson<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || '요청에 실패했습니다.');
  }
  return response.json() as Promise<T>;
}

export default function App(): JSX.Element {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  const [isStaff, setIsStaff] = useState(() => localStorage.getItem('isStaff') === 'true');
  const [displayName, setDisplayName] = useState(() => localStorage.getItem('displayName') ?? '');
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [likeTags, setLikeTags] = useState<Tag[]>([]);
  const [likeStatus, setLikeStatus] = useState<LikeStatus | null>(null);
  const [chatPreview, setChatPreview] = useState<ChatPreview[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminDetail, setAdminDetail] = useState<AdminUserDetail | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupMessage, setSignupMessage] = useState<string | null>(null);

  const alertCount = alerts.length;

  useEffect(() => {
    if (!token) {
      return;
    }
    const loadData = async () => {
      try {
        const [profileResponse, tagResponse, likeResponse, chatResponse, alertResponse, meResponse] =
          await Promise.all([
            fetchJson<UserProfile[]>('/users/profiles'),
            fetchJson<{ key: string; label: string }[]>('/users/tags'),
            fetchJson<LikeStatus>('/likes/status'),
            fetchJson<ChatPreview[]>('/chats/preview'),
            fetchJson<{ id: number; message: string; createdAt: string }[]>('/alerts'),
            fetchJson<UserDetail>('/users/me', {}, token)
          ]);
        setProfiles(profileResponse);
        setSelectedProfileId(profileResponse[0]?.id ?? null);
        setLikeTags(tagResponse.map((tag) => tag.label as Tag));
        setLikeStatus(likeResponse);
        setChatPreview(chatResponse);
        setAlerts(
          alertResponse.map((alert) => ({
            id: alert.id,
            content: alert.message,
            time: alert.createdAt
          }))
        );
        setUserDetail(meResponse);
        setDisplayName(meResponse.displayName);
        setIsStaff(meResponse.isStaff);
        localStorage.setItem('displayName', meResponse.displayName);
        localStorage.setItem('isStaff', String(meResponse.isStaff));
        if (meResponse.isStaff) {
          const adminResponse = await fetchJson<{ users: AdminUser[] }>('/admin/users?page=1', {}, token);
          setAdminUsers(adminResponse.users);
        } else {
          setAdminUsers([]);
          setAdminDetail(null);
        }
      } catch (error) {
        console.error(error);
        setStatusMessage('데이터를 불러오지 못했습니다.');
      }
    };
    void loadData();
  }, [token]);

  const tabs = useMemo(() => {
    const baseTabs: { key: TabKey; label: string }[] = [
      { key: 'home', label: '홈' },
      { key: 'likes', label: '좋아요 탭' },
      { key: 'chats', label: '채팅' },
      { key: 'alerts', label: '알림' },
      { key: 'profile', label: '프로필' }
    ];
    if (isStaff) {
      baseTabs.push({ key: 'admin', label: '관리자' });
    }
    return baseTabs;
  }, [isStaff]);

  const handleLogin = async () => {
    setLoginError(null);
    setStatusMessage(null);
    try {
      const response = await fetchJson<LoginResponse>('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('isStaff', String(response.isStaff));
      setToken(response.token);
      setIsStaff(response.isStaff);
      setActiveTab('home');
    } catch (error) {
      setLoginError('로그인 정보를 확인해주세요.');
    }
  };

  const handleSignup = async () => {
    setSignupMessage(null);
    try {
      await fetchJson<{ id: number }>('/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          displayName: signupName,
          username: signupUsername
        })
      });
      setSignupMessage('회원가입이 완료되었습니다. 로그인해주세요.');
      setAuthMode('login');
    } catch (error) {
      setSignupMessage('회원가입에 실패했습니다. 입력을 확인해주세요.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isStaff');
    localStorage.removeItem('displayName');
    setToken(null);
    setIsStaff(false);
    setDisplayName('');
    setActiveTab('home');
  };

  const handleSendLike = async () => {
    if (!selectedProfileId) {
      setStatusMessage('좋아요를 보낼 대상을 선택해주세요.');
      return;
    }
    try {
      await fetchJson('/likes/send', {
        method: 'POST',
        body: JSON.stringify({ userId: selectedProfileId })
      });
      const updated = await fetchJson<LikeStatus>('/likes/status');
      setLikeStatus(updated);
      setStatusMessage('좋아요를 보냈습니다.');
    } catch (error) {
      setStatusMessage('좋아요 전송에 실패했습니다.');
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) {
      return;
    }
    try {
      await fetchJson('/chats/send', {
        method: 'POST',
        body: JSON.stringify({ chatId: chatPreview[0]?.id ?? 1, message: messageInput })
      });
      setMessageInput('');
      setStatusMessage('메시지가 전송되었습니다.');
    } catch (error) {
      setStatusMessage('메시지 전송에 실패했습니다.');
    }
  };

  const handleSelectAdminUser = async (userId: number) => {
    if (!token) {
      return;
    }
    try {
      const detail = await fetchJson<AdminUserDetail>(`/admin/users/${userId}`, {}, token);
      setAdminDetail(detail);
    } catch (error) {
      setStatusMessage('관리자 정보를 불러오지 못했습니다.');
    }
  };

  const handleUpdateAdminUser = async () => {
    if (!token || !adminDetail) {
      return;
    }
    try {
      const detail = await fetchJson<AdminUserDetail>(`/admin/users/${adminDetail.id}`, {
        method: 'PATCH',
        body: JSON.stringify(adminDetail)
      }, token);
      setAdminDetail(detail);
      setStatusMessage('관리자 사용자 정보를 저장했습니다.');
    } catch (error) {
      setStatusMessage('관리자 정보 저장에 실패했습니다.');
    }
  };

  if (!token) {
    return (
      <div className="auth-shell">
        <section className="card auth-layout">
          <div className="toolbar">
            <h3>{authMode === 'login' ? '로그인' : '회원가입'}</h3>
            <button
              className="secondary"
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            >
              {authMode === 'login' ? '회원가입으로 이동' : '로그인으로 이동'}
            </button>
          </div>
          {authMode === 'login' ? (
            <>
              <input
                className="input"
                placeholder="이메일"
                type="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
              />
              <input
                className="input"
                placeholder="비밀번호"
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
              />
              {loginError ? <p className="helper-text error">{loginError}</p> : null}
              <button className="primary" type="button" onClick={handleLogin}>
                로그인
              </button>
              <p className="helper-text">관리자는 admin@admin.com / admin1234로 로그인하세요.</p>
            </>
          ) : (
            <>
              <input
                className="input"
                placeholder="이메일"
                type="email"
                value={signupEmail}
                onChange={(event) => setSignupEmail(event.target.value)}
              />
              <input
                className="input"
                placeholder="비밀번호 (4~16자)"
                type="password"
                value={signupPassword}
                onChange={(event) => setSignupPassword(event.target.value)}
              />
              <input
                className="input"
                placeholder="이름"
                type="text"
                value={signupName}
                onChange={(event) => setSignupName(event.target.value)}
              />
              <input
                className="input"
                placeholder="username"
                type="text"
                value={signupUsername}
                onChange={(event) => setSignupUsername(event.target.value)}
              />
              {signupMessage ? <p className="helper-text">{signupMessage}</p> : null}
              <button className="primary" type="button" onClick={handleSignup}>
                가입하기
              </button>
            </>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>CHAT-CHAT</h2>
        {displayName ? <p className="helper-text">{displayName} 님</p> : null}
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            type="button"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
        <button className="secondary" type="button" onClick={handleLogout}>
          로그아웃
        </button>
      </aside>
      <main className="main">
        {statusMessage ? <p className="helper-text">{statusMessage}</p> : null}
        {activeTab === 'home' ? (
          <section className="card">
            <div className="toolbar">
              <h3>홈</h3>
              <button className="secondary" type="button" onClick={() => setActiveTab('alerts')}>
                알림 <span className="badge">{alertCount}</span>
              </button>
            </div>
            <div className="list">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  className={`profile-row profile-button${
                    selectedProfileId === profile.id ? ' selected' : ''
                  }`}
                  type="button"
                  onClick={() => setSelectedProfileId(profile.id)}
                >
                  <div className="avatar">{profile.name.slice(0, 1)}</div>
                  <div>
                    <strong>{profile.name}</strong>
                    <p>{profile.statusMessage}</p>
                    <div className="tags">
                      {profile.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === 'likes' ? (
          <section className="card">
            <h3>좋아요 탭</h3>
            <p>
              {likeStatus
                ? `${likeStatus.windowMinutes}분에 ${likeStatus.remaining}명까지 좋아요를 보낼 수 있어요.`
                : '좋아요 정보를 불러오는 중입니다.'}
            </p>
            <div className="tags">
              {likeTags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <button className="primary" type="button" onClick={handleSendLike}>
              좋아요 보내기
            </button>
          </section>
        ) : null}

        {activeTab === 'chats' ? (
          <section className="card">
            <h3>채팅</h3>
            <div className="list">
              {chatPreview.map((chat) => (
                <div key={chat.id} className="profile-row">
                  <div className="avatar">{chat.name.slice(0, 1)}</div>
                  <div>
                    <strong>{chat.name}</strong>
                    <p>{chat.lastMessage}</p>
                  </div>
                  <span>{chat.time}</span>
                </div>
              ))}
            </div>
            <div className="chat-area">
              <div className="profile-row">
                <div className="avatar">나</div>
                <div className="chat-bubble chat-right">{messageInput || '메시지를 입력해 주세요.'}</div>
              </div>
            </div>
            <div className="chat-controls">
              <input
                className="input"
                placeholder="메시지 입력"
                type="text"
                value={messageInput}
                onChange={(event) => setMessageInput(event.target.value)}
              />
              <button className="primary" type="button" onClick={handleSendMessage}>
                전송
              </button>
            </div>
          </section>
        ) : null}

        {activeTab === 'alerts' ? (
          <section className="card">
            <h3>알림</h3>
            <div className="list">
              {alerts.map((alert) => (
                <div key={alert.id} className="profile-row">
                  <div>
                    <strong>{alert.content}</strong>
                    <p>{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === 'profile' ? (
          <section className="card">
            <h3>프로필</h3>
            {userDetail ? (
              <div className="profile-row">
                <div className="avatar">{userDetail.displayName.slice(0, 1)}</div>
                <div>
                  <strong>{userDetail.displayName}</strong>
                  <p>{userDetail.statusMessage}</p>
                  <p className="helper-text">{userDetail.email}</p>
                </div>
              </div>
            ) : (
              <p>프로필 정보를 불러오는 중입니다.</p>
            )}
          </section>
        ) : null}

        {activeTab === 'admin' ? (
          <section className="card">
            <div className="toolbar">
              <h3>관리자 대시보드</h3>
              <div>페이지 1</div>
            </div>
            {adminUsers.length === 0 ? (
              <p>관리자 권한이 필요합니다.</p>
            ) : (
              <div className="list">
                {adminUsers.map((user) => (
                  <div key={user.id} className="profile-row">
                    <div>
                      <button
                        className="secondary"
                        type="button"
                        onClick={() => handleSelectAdminUser(user.id)}
                      >
                        {user.username}
                      </button>
                      <p>{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : null}

        {activeTab === 'admin' && adminDetail ? (
          <section className="card">
            <h3>관리자 사용자 상세</h3>
            <div className="list">
              <label>
                Display Name
                <input
                  className="input"
                  value={adminDetail.displayName}
                  onChange={(event) =>
                    setAdminDetail({
                      ...adminDetail,
                      displayName: event.target.value
                    })
                  }
                />
              </label>
              <label>
                Username
                <input
                  className="input"
                  value={adminDetail.username}
                  onChange={(event) =>
                    setAdminDetail({
                      ...adminDetail,
                      username: event.target.value
                    })
                  }
                />
              </label>
              <label>
                Gender
                <input
                  className="input"
                  value={adminDetail.gender ?? ''}
                  onChange={(event) =>
                    setAdminDetail({
                      ...adminDetail,
                      gender: event.target.value || null
                    })
                  }
                />
              </label>
              <label>
                Status Message
                <input
                  className="input"
                  value={adminDetail.statusMessage}
                  onChange={(event) =>
                    setAdminDetail({
                      ...adminDetail,
                      statusMessage: event.target.value
                    })
                  }
                />
              </label>
              <label>
                Token
                <input
                  className="input"
                  type="number"
                  value={adminDetail.token}
                  onChange={(event) =>
                    setAdminDetail({
                      ...adminDetail,
                      token: Number(event.target.value)
                    })
                  }
                />
              </label>
              <label>
                Active
                <input
                  className="input"
                  value={adminDetail.isActive ? 'true' : 'false'}
                  onChange={(event) =>
                    setAdminDetail({
                      ...adminDetail,
                      isActive: event.target.value === 'true'
                    })
                  }
                />
              </label>
              <button className="primary" type="button" onClick={handleUpdateAdminUser}>
                저장
              </button>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
