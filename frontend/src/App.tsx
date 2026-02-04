import './styles/app.css';
import { AlertItem, ChatPreview, Tag, UserProfile } from './types';

const mockProfiles: UserProfile[] = [
  {
    id: 1,
    name: '김도건',
    statusMessage: '오늘은 산책하고 싶어요.',
    tags: ['산책', '영화시청']
  },
  {
    id: 2,
    name: '한지민',
    statusMessage: '책 읽는 시간 좋아요.',
    tags: ['독서', '재태크']
  },
  {
    id: 3,
    name: '박준호',
    statusMessage: '주말엔 여행 계획 중.',
    tags: ['여행', '스포츠']
  }
];

const mockChatPreview: ChatPreview[] = [
  { id: 1, name: '김도건', lastMessage: '구라임', time: '오전 8:13' }
];

const mockAlerts: AlertItem[] = [
  { id: 1, content: '김도건 님이 좋아요를 보냈어요.', time: '방금 전' },
  { id: 2, content: '대화 요청이 도착했어요.', time: '5분 전' }
];

const likeTags: Tag[] = ['스포츠', '독서', '영화시청', '산책', '여행', '주식', '재태크'];

interface AdminUser {
  id: number;
  email: string;
  displayName: string;
  username: string;
  isStaff: boolean;
}

interface AdminUserDetail extends AdminUser {
  gender: string;
  statusMessage: string;
  token: number;
  isActive: boolean;
}

const adminUsers: AdminUser[] = [
  {
    id: 1,
    email: 'admin@admin.com',
    displayName: '관리자',
    username: 'admin',
    isStaff: true
  },
  {
    id: 2,
    email: 'user1@example.com',
    displayName: '김도건',
    username: 'dogeon',
    isStaff: false
  },
  {
    id: 3,
    email: 'user2@example.com',
    displayName: '한지민',
    username: 'jimin',
    isStaff: false
  }
];

const adminUserDetail: AdminUserDetail = {
  id: 2,
  email: 'user1@example.com',
  displayName: '김도건',
  username: 'dogeon',
  isStaff: false,
  gender: 'male',
  statusMessage: '오늘은 산책하고 싶어요.',
  token: 3,
  isActive: true
};

export default function App(): JSX.Element {
  const isStaff = true;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>CHAT-CHAT</h2>
        <button type="button">홈</button>
        <button type="button">좋아요 탭</button>
        <button type="button">채팅</button>
        <button type="button">알림</button>
        <button type="button">프로필</button>
        {isStaff ? <button type="button">관리자</button> : null}
      </aside>
      <main className="main">
        <section className="card">
          <div className="toolbar">
            <h3>홈</h3>
            <button className="secondary" type="button">
              알림 <span className="badge">2</span>
            </button>
          </div>
          <div className="list">
            {mockProfiles.map((profile) => (
              <div key={profile.id} className="profile-row">
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
              </div>
            ))}
          </div>
        </section>

        <section className="card auth-layout">
          <h3>로그인</h3>
          <input className="input" placeholder="이메일" type="email" />
          <input className="input" placeholder="비밀번호" type="password" />
          <button className="primary" type="button">
            로그인
          </button>
          <div>
            <p>회원가입 및 약관 설명란</p>
            <button className="secondary" type="button">
              회원가입
            </button>
          </div>
        </section>

        <section className="card auth-layout">
          <h3>회원가입</h3>
          <input className="input" placeholder="이메일" type="email" />
          <input className="input" placeholder="비밀번호 (4~16자)" type="password" />
          <input className="input" placeholder="이름" type="text" />
          <input className="input" placeholder="username" type="text" />
          <button className="primary" type="button">
            가입하기
          </button>
        </section>

        <section className="card">
          <h3>프로필</h3>
          <div className="profile-row">
            <div className="avatar">김</div>
            <div>
              <strong>김도건</strong>
              <p>상태메시지를 수정할 수 있습니다.</p>
              <button className="secondary" type="button">
                프로필 사진 관리
              </button>
            </div>
          </div>
        </section>

        <section className="card">
          <h3>채팅</h3>
          <div className="list">
            {mockChatPreview.map((chat) => (
              <div key={chat.id} className="profile-row">
                <div className="avatar">김</div>
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
              <div className="avatar">김</div>
              <div className="chat-bubble chat-left">준호</div>
            </div>
            <div className="chat-bubble chat-right">구라임</div>
            <div className="profile-row">
              <div className="avatar">김</div>
              <div className="chat-bubble chat-left">ㅋㅋ</div>
            </div>
          </div>
          <input className="input" placeholder="메시지 입력" type="text" />
        </section>

        <section className="card">
          <h3>좋아요 탭</h3>
          <p>10분에 5명까지 좋아요를 보낼 수 있어요. (잔여: 5명)</p>
          <div className="tags">
            {likeTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <button className="primary" type="button">
            좋아요 보내기
          </button>
        </section>

        <section className="card">
          <h3>알림</h3>
          <div className="list">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="profile-row">
                <div>
                  <strong>{alert.content}</strong>
                  <p>{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {isStaff ? (
          <section className="card">
            <div className="toolbar">
              <h3>관리자 대시보드</h3>
              <div>페이지 1 / 1</div>
            </div>
            <div className="list">
              {adminUsers.map((user) => (
                <div key={user.id} className="profile-row">
                  <div>
                    <button className="secondary" type="button">
                      {user.username}
                    </button>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="toolbar">
              <button className="secondary" type="button">
                이전
              </button>
              <span>1 / 1</span>
              <button className="secondary" type="button">
                다음
              </button>
            </div>
          </section>
        ) : null}

        {isStaff ? (
          <section className="card">
            <h3>관리자 사용자 상세</h3>
            <div className="list">
              <label>
                Display Name
                <input className="input" defaultValue={adminUserDetail.displayName} />
              </label>
              <label>
                Username
                <input className="input" defaultValue={adminUserDetail.username} />
              </label>
              <label>
                Gender
                <input className="input" defaultValue={adminUserDetail.gender} />
              </label>
              <label>
                Status Message
                <input className="input" defaultValue={adminUserDetail.statusMessage} />
              </label>
              <label>
                Token
                <input className="input" type="number" defaultValue={adminUserDetail.token} />
              </label>
              <label>
                Active
                <input className="input" defaultValue={adminUserDetail.isActive ? 'true' : 'false'} />
              </label>
              <button className="primary" type="button">
                저장
              </button>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
