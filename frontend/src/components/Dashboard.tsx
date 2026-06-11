import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Card, Table, Typography, Button, Descriptions, Spin, Space, FloatButton, message, Modal, Alert } from 'antd';
import { LogoutOutlined, EyeInvisibleOutlined, ExperimentOutlined, SmileOutlined } from '@ant-design/icons';
import api from '../api/axios';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface User {
  id: string;
  email: string;
  username: string; 
}

const DEV_QUOTES = [
  "Your code compiles on the first try. (Just kidding, but wouldn't that be nice?)",
  "You write cleaner code than the person who left this repo template.",
  "Your commits are a work of art. Well, a work of abstract art, anyway.",
  "At least 70% of your Stack Overflow copy-pastes work perfectly.",
  "You haven't pushed a broken migration to production today. Keep the streak alive!",
  "There are 2 types of login endpoints here, and both are judging your password choice."
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Funny Add-on States
  const [funQuote] = useState(() => DEV_QUOTES[Math.floor(Math.random() * DEV_QUOTES.length)]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const meRes = await api.get('/accounts/me');
        setCurrentUser(meRes.data);

        const usersRes = await api.get('/accounts');
        setAllUsers(usersRes.data);
      } catch (error) {
        localStorage.removeItem('jwt_token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  // Safe helper to extract username regardless of backend casing variants (username / userName / Username)
  const getUsernameString = (userObj: any) => {
    return userObj?.username || userObj?.userName || userObj?.Username || 'N/A';
  };

  const tableColumns = [
    { 
      title: 'ID', 
      dataIndex: 'id', 
      key: 'id',
      render: (text: string) => <Text type="secondary" style={{ fontSize: '0.85rem' }}>{text}</Text>
    },
    { 
      title: 'Username', 
      key: 'userName',
      render: (_: any, record: any) => <Text strong>{getUsernameString(record)}</Text>
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email' 
    },
  ];

  if (loading || !currentUser) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: '#fff', 
        padding: '0 24px',
        boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
        zIndex: 1
      }}>
        <Title level={4} style={{ margin: 0 }}>Overview</Title>
        <Space size="large">
          <Text>Welcome back, <strong>{getUsernameString(currentUser)}</strong></Text>
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} danger>
            Log out
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          
          {/* Add-on */}
          <Alert
            message={<Text strong style={{ color: '#b78103' }}><SmileOutlined /> Daily Developer Affirmation</Text>}
            description={<Text italic>"{funQuote}"</Text>}
            type="warning"
            style={{ background: '#fffbe6', borderColor: '#ffe58f', borderRadius: 8 }}
          />

          {/* Profile Details Card containing requested Username Field */}
          <Card title="Profile Details" bordered={false} style={{ borderRadius: 8 }}>
            <Descriptions column={1}>
              <Descriptions.Item label="Username">
                <strong>{getUsernameString(currentUser)}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
              <Descriptions.Item label="Account ID">
                <Text copyable>{currentUser.id}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* System Users Table */}
          <Card title="System Users" bordered={false} style={{ borderRadius: 8 }}>
            <Table 
              dataSource={allUsers} 
              columns={tableColumns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }} 
              size="middle"
            />
          </Card>

        </Space>
      </Content>

    </Layout>
  );
}