import 'package:flutter/material.dart';

void main() {
  runApp(const ChatChatApp());
}

class ChatChatApp extends StatelessWidget {
  const ChatChatApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CHAT-CHAT',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF3F52FF)),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    const isStaff = true;
    return Scaffold(
      appBar: AppBar(
        title: const Text('CHAT-CHAT 홈'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const AlertsScreen()),
              );
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const LoginCard(),
          const SizedBox(height: 16),
          const SignupCard(),
          const SizedBox(height: 16),
          const ProfileCard(),
          const SizedBox(height: 16),
          const ChatPreviewCard(),
          const SizedBox(height: 16),
          const LikeCard(),
          const SizedBox(height: 16),
          const UserFeedCard(),
          const SizedBox(height: 16),
          if (isStaff) const AdminDashboardCard(),
          if (isStaff) const SizedBox(height: 16),
          if (isStaff) const AdminDetailCard(),
        ],
      ),
    );
  }
}

class LoginCard extends StatelessWidget {
  const LoginCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('로그인', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            const TextField(decoration: InputDecoration(labelText: '이메일')),
            const TextField(decoration: InputDecoration(labelText: '비밀번호')),
            const SizedBox(height: 12),
            ElevatedButton(onPressed: () {}, child: const Text('로그인')),
            const SizedBox(height: 8),
            const Text('회원가입 및 약관 설명란'),
          ],
        ),
      ),
    );
  }
}

class SignupCard extends StatelessWidget {
  const SignupCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('회원가입', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            const TextField(decoration: InputDecoration(labelText: '이메일')),
            const TextField(decoration: InputDecoration(labelText: '비밀번호 (4~16자)')),
            const TextField(decoration: InputDecoration(labelText: '이름')),
            const TextField(decoration: InputDecoration(labelText: 'username')),
            const SizedBox(height: 12),
            ElevatedButton(onPressed: () {}, child: const Text('가입하기')),
          ],
        ),
      ),
    );
  }
}

class ProfileCard extends StatelessWidget {
  const ProfileCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const CircleAvatar(child: Text('김')),
        title: const Text('김도건'),
        subtitle: const Text('상태메시지를 수정할 수 있습니다.'),
        trailing: TextButton(onPressed: () {}, child: const Text('편집')),
      ),
    );
  }
}

class ChatPreviewCard extends StatelessWidget {
  const ChatPreviewCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('채팅', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            const ListTile(
              leading: CircleAvatar(child: Text('김')),
              title: Text('김도건'),
              subtitle: Text('구라임'),
              trailing: Text('오전 8:13'),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.yellow.shade200,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Text('구라임'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class LikeCard extends StatelessWidget {
  const LikeCard({super.key});

  @override
  Widget build(BuildContext context) {
    const tags = ['스포츠', '독서', '영화시청', '산책', '여행', '주식', '재태크'];
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('좋아요 탭', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('10분에 5명까지 좋아요를 보낼 수 있어요. (잔여: 5명)'),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: tags
                  .map((tag) => Chip(
                        label: Text(tag),
                        backgroundColor: const Color(0xFFEFF1FF),
                      ))
                  .toList(),
            ),
            const SizedBox(height: 12),
            ElevatedButton(onPressed: () {}, child: const Text('좋아요 보내기')),
          ],
        ),
      ),
    );
  }
}

class UserFeedCard extends StatelessWidget {
  const UserFeedCard({super.key});

  @override
  Widget build(BuildContext context) {
    final users = [
      {'name': '김도건', 'message': '오늘은 산책하고 싶어요.'},
      {'name': '한지민', 'message': '책 읽는 시간 좋아요.'},
      {'name': '박준호', 'message': '주말엔 여행 계획 중.'},
    ];
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('메인 피드', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            ...users.map(
              (user) => ListTile(
                leading: CircleAvatar(child: Text(user['name']!.substring(0, 1))),
                title: Text(user['name']!),
                subtitle: Text(user['message']!),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class AdminDashboardCard extends StatelessWidget {
  const AdminDashboardCard({super.key});

  @override
  Widget build(BuildContext context) {
    final users = [
      {'username': 'admin', 'email': 'admin@admin.com'},
      {'username': 'dogeon', 'email': 'user1@example.com'},
      {'username': 'jimin', 'email': 'user2@example.com'},
    ];
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('관리자 대시보드', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Text('페이지 1 / 1'),
              ],
            ),
            const SizedBox(height: 12),
            ...users.map(
              (user) => ListTile(
                title: TextButton(
                  onPressed: () {},
                  child: Text(user['username']!),
                ),
                subtitle: Text(user['email']!),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class AdminDetailCard extends StatelessWidget {
  const AdminDetailCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('관리자 사용자 상세', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            const TextFormField(
              decoration: InputDecoration(labelText: 'Display Name'),
              initialValue: '김도건',
            ),
            const TextFormField(
              decoration: InputDecoration(labelText: 'Username'),
              initialValue: 'dogeon',
            ),
            const TextFormField(
              decoration: InputDecoration(labelText: 'Gender'),
              initialValue: 'male',
            ),
            const TextFormField(
              decoration: InputDecoration(labelText: 'Status Message'),
              initialValue: '오늘은 산책하고 싶어요.',
            ),
            const TextFormField(
              decoration: InputDecoration(labelText: 'Token'),
              initialValue: '3',
            ),
            const TextFormField(
              decoration: InputDecoration(labelText: 'Active'),
              initialValue: 'true',
            ),
            const SizedBox(height: 12),
            ElevatedButton(onPressed: () {}, child: const Text('저장')),
          ],
        ),
      ),
    );
  }
}

class AlertsScreen extends StatelessWidget {
  const AlertsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final alerts = [
      {'message': '김도건 님이 좋아요를 보냈어요.', 'time': '방금 전'},
      {'message': '대화 요청이 도착했어요.', 'time': '5분 전'},
    ];
    return Scaffold(
      appBar: AppBar(title: const Text('알림')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemBuilder: (context, index) {
          final alert = alerts[index];
          return ListTile(
            title: Text(alert['message']!),
            subtitle: Text(alert['time']!),
          );
        },
        separatorBuilder: (_, __) => const Divider(),
        itemCount: alerts.length,
      ),
    );
  }
}
