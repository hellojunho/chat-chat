# chat-chat

실시간 채팅 앱을 위한 멀티 플랫폼 구조입니다.

## 구조
- `backend/`: NestJS + TypeScript (엔티티/모듈 스캐폴드 포함)
- `frontend/`: React + TypeScript (미니멀 UI)
- `mobile/`: Flutter (미니멀 UI)

## 빠른 실행
각 폴더별로 의존성을 설치 후 실행하세요.

### Docker
```bash
docker-compose up
```

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Mobile
```bash
cd mobile
flutter pub get
flutter run
```
