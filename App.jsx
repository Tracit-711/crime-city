import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Newspaper, 
  Gamepad2, 
  Users, 
  MessageCircle, 
  ExternalLink,
  Zap,
  Crown,
  Shield,
  Star,
  Calendar,
  Download,
  Settings,
  Bell,
  Check,
  X,
  Clock
} from 'lucide-react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [gameRequests, setGameRequests] = useState([]);
  const [showGameRequestForm, setShowGameRequestForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load game requests from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('gameRequests');
    if (savedRequests) {
      setGameRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save game requests to localStorage
  const saveGameRequests = (requests) => {
    localStorage.setItem('gameRequests', JSON.stringify(requests));
    setGameRequests(requests);
  };

  // Admin login function
  const handleAdminLogin = () => {
    if (adminPassword === 'crimecity2025') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('كلمة مرور خاطئة');
    }
  };

  // Submit game request
  const submitGameRequest = (requestData) => {
    const newRequest = {
      id: Date.now(),
      ...requestData,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    const updatedRequests = [...gameRequests, newRequest];
    saveGameRequests(updatedRequests);
    setShowGameRequestForm(false);
  };

  // Update request status
  const updateRequestStatus = (id, status) => {
    const updatedRequests = gameRequests.map(req => 
      req.id === id ? { ...req, status } : req
    );
    saveGameRequests(updatedRequests);
  };

  const navigation = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'news', label: 'الأخبار', icon: Newspaper },
    { id: 'games', label: 'الألعاب', icon: Gamepad2 },
    { id: 'server', label: 'السيرفر', icon: Users },
  ];

  const newsItems = [
    {
      id: 1,
      title: 'تحديث جديد في السيرفر',
      content: 'تم إضافة قنوات جديدة وميزات حصرية لأعضاء Crime City',
      date: '2025-01-11',
      type: 'حصري'
    },
    {
      id: 2,
      title: 'مسابقة الألعاب الشهرية',
      content: 'انضم إلى مسابقة هذا الشهر واربح جوائز قيمة',
      date: '2025-01-10',
      type: 'مسابقة'
    },
    {
      id: 3,
      title: 'إعلان مهم للأعضاء',
      content: 'قوانين جديدة وتحديثات مهمة في السيرفر',
      date: '2025-01-09',
      type: 'إعلان'
    }
  ];

  const games = [
    {
      id: 1,
      name: 'GTA V',
      description: 'لعبة العالم المفتوح الشهيرة',
      downloadLink: '#',
      image: '🎮',
      category: 'أكشن'
    },
    {
      id: 2,
      name: 'Minecraft',
      description: 'لعبة البناء والإبداع',
      downloadLink: '#',
      image: '⛏️',
      category: 'بناء'
    },
    {
      id: 3,
      name: 'Among Us',
      description: 'لعبة الغموض والتعاون',
      downloadLink: '#',
      image: '🚀',
      category: 'متعددة اللاعبين'
    },
    {
      id: 4,
      name: 'Valorant',
      description: 'لعبة إطلاق النار التكتيكية',
      downloadLink: '#',
      image: '🎯',
      category: 'FPS'
    }
  ];

  const [serverStats, setServerStats] = useState({
    members: '254',
    online: '67',
    channels: '25',
    roles: '15'
  });

  // Fetch Discord server stats
  useEffect(() => {
    const fetchDiscordStats = async () => {
      try {
        const response = await fetch('https://kkh7ikcgg7l7.manus.space/api/discord/stats');
        const data = await response.json();
        if (data.success) {
          setServerStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching Discord stats:', error);
        // Keep default values if API fails
      }
    };

    fetchDiscordStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchDiscordStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="text-center py-16 relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl font-bold neon-text mb-4">
            CRIME CITY
          </h1>
          <div className="absolute inset-0 neon-glow opacity-30 blur-xl"></div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          مرحباً بك في عالم الجريمة الرقمي
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="neon-button flex items-center gap-2" onClick={() => window.open("https://discord.gg/nEZPePbQgB", "_blank")}>
            <MessageCircle size={20} />
            انضم للديسكورد
            <ExternalLink size={16} />
          </button>
          <div className="text-sm text-gray-400">
            الوقت الحالي: {currentTime.toLocaleTimeString('ar-SA')}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'الأعضاء', value: serverStats.members, icon: Users },
          { label: 'متصل الآن', value: serverStats.online, icon: Zap },
          { label: 'القنوات', value: serverStats.channels, icon: MessageCircle },
          { label: 'الأدوار', value: serverStats.roles, icon: Crown }
        ].map((stat, index) => (
          <div key={index} className="crime-card p-6 text-center hover-glow">
            <stat.icon className="mx-auto mb-2 text-neon" size={32} />
            <div className="text-2xl font-bold text-neon">{stat.value}</div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Latest News Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="crime-card p-6"
      >
        <h2 className="text-2xl font-bold text-neon mb-4 flex items-center gap-2">
          <Newspaper size={24} />
          آخر الأخبار
        </h2>
        <div className="space-y-4">
          {newsItems.slice(0, 2).map((item) => (
            <div key={item.id} className="border-l-4 border-neon pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-neon text-black px-2 py-1 rounded text-xs font-bold">
                  {item.type}
                </span>
                <span className="text-gray-400 text-sm">{item.date}</span>
              </div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.content}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setActiveSection('news')}
          className="mt-4 text-neon hover:underline flex items-center gap-1"
        >
          عرض جميع الأخبار <ExternalLink size={16} />
        </button>
      </motion.div>
    </motion.div>
  );

  const renderNews = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-neon mb-8 flex items-center gap-3">
        <Newspaper size={36} />
        أخبار وحصريات Crime City
      </h1>
      
      <div className="space-y-6">
        {newsItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="crime-card p-6 hover-glow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-neon text-black px-3 py-1 rounded-full text-sm font-bold">
                {item.type}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar size={16} />
                {item.date}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
            <p className="text-gray-300">{item.content}</p>
            <div className="mt-4 flex items-center gap-2">
              <Star className="text-neon" size={16} />
              <span className="text-sm text-gray-400">حصري لأعضاء Crime City</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderGames = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-neon mb-8 flex items-center gap-3">
        <Gamepad2 size={36} />
        مكتبة الألعاب
      </h1>
      
      <div className="crime-card p-6 text-center">
        <h3 className="text-xl font-bold text-neon mb-2">هل تريد لعبة معينة؟</h3>
        <p className="text-gray-300 mb-4">اطلب أي لعبة تريدها وسنوفرها لك</p>
        <button className="neon-button" onClick={() => setShowGameRequestForm(true)}>
          طلب لعبة جديدة
        </button>
      </div>
    </motion.div>
  );

  const renderServer = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-neon mb-8 flex items-center gap-3">
        <Users size={36} />
        معلومات السيرفر
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="crime-card p-6">
          <h2 className="text-2xl font-bold text-neon mb-4">إحصائيات السيرفر</h2>
          <div className="space-y-4">
            {[
              { label: 'إجمالي الأعضاء', value: serverStats.members, icon: Users },
              { label: 'الأعضاء المتصلين', value: serverStats.online, icon: Zap },
              { label: 'عدد القنوات', value: serverStats.channels, icon: MessageCircle },
              { label: 'الأدوار المتاحة', value: serverStats.roles, icon: Crown }
            ].map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded">
                <div className="flex items-center gap-3">
                  <stat.icon className="text-neon" size={20} />
                  <span className="text-white">{stat.label}</span>
                </div>
                <span className="text-neon font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="crime-card p-6">
          <h2 className="text-2xl font-bold text-neon mb-4">قوانين السيرفر</h2>
          <div className="space-y-3">
            {[
              'احترام جميع الأعضاء',
              'عدم استخدام لغة غير لائقة',
              'عدم الإزعاج أو السبام',
              'اتباع تعليمات المشرفين',
              'عدم مشاركة محتوى غير مناسب'
            ].map((rule, index) => (
              <div key={index} className="flex items-center gap-3">
                <Shield className="text-neon" size={16} />
                <span className="text-gray-300">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="crime-card p-6 text-center">
        <h2 className="text-2xl font-bold text-neon mb-4">انضم إلى Crime City</h2>
        <p className="text-gray-300 mb-6">
          كن جزءاً من أكبر مجتمع gaming في المنطقة
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="neon-button flex items-center gap-2" onClick={() => window.open("https://discord.gg/nEZPePbQgB", "_blank")}>
            <MessageCircle size={20} />
            رابط الديسكورد
            <ExternalLink size={16} />
          </button>
          <button className="neon-button flex items-center gap-2">
            <Users size={20} />
            دعوة الأصدقاء
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home': return renderHome();
      case 'news': return renderNews();
      case 'games': return renderGames();
      case 'server': return renderServer();
      case 'admin': return isAdmin ? renderAdmin() : renderHome();
      default: return renderHome();
    }
  };

  // Game Request Form Component
  const GameRequestForm = () => {
    const [formData, setFormData] = useState({
      gameName: '',
      platform: '',
      description: '',
      requesterName: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.gameName && formData.requesterName) {
        submitGameRequest(formData);
        setFormData({ gameName: '', platform: '', description: '', requesterName: '' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="crime-card p-6 max-w-md w-full mx-4"
        >
          <h3 className="text-xl font-bold text-neon mb-4">طلب لعبة جديدة</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">اسم اللعبة *</label>
              <input
                type="text"
                value={formData.gameName}
                onChange={(e) => setFormData({...formData, gameName: e.target.value})}
                className="w-full p-3 bg-secondary border border-gray-600 rounded text-white"
                placeholder="مثال: GTA VI"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">المنصة</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({...formData, platform: e.target.value})}
                className="w-full p-3 bg-secondary border border-gray-600 rounded text-white"
              >
                <option value="">اختر المنصة</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">اسمك *</label>
              <input
                type="text"
                value={formData.requesterName}
                onChange={(e) => setFormData({...formData, requesterName: e.target.value})}
                className="w-full p-3 bg-secondary border border-gray-600 rounded text-white"
                placeholder="اسمك في الديسكورد"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">ملاحظات إضافية</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 bg-secondary border border-gray-600 rounded text-white h-20"
                placeholder="أي تفاصيل إضافية..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="neon-button flex-1">
                إرسال الطلب
              </button>
              <button 
                type="button" 
                onClick={() => setShowGameRequestForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                إلغاء
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // Admin Login Component
  const AdminLogin = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="crime-card p-6 max-w-sm w-full mx-4"
      >
        <h3 className="text-xl font-bold text-neon mb-4">تسجيل دخول الإدارة</h3>
        <div className="space-y-4">
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full p-3 bg-secondary border border-gray-600 rounded text-white"
            placeholder="كلمة المرور"
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
          />
          <div className="flex gap-3">
            <button onClick={handleAdminLogin} className="neon-button flex-1">
              دخول
            </button>
            <button 
              onClick={() => setShowAdminLogin(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              إلغاء
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Admin Panel Component
  const renderAdmin = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-neon flex items-center gap-3">
          <Settings size={36} />
          لوحة الإدارة
        </h1>
        <button 
          onClick={() => {setIsAdmin(false); setActiveSection('home');}}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
        >
          تسجيل خروج
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="crime-card p-4 text-center">
          <Bell className="mx-auto mb-2 text-yellow-500" size={24} />
          <div className="text-xl font-bold text-yellow-500">
            {gameRequests.filter(req => req.status === 'pending').length}
          </div>
          <div className="text-gray-400">طلبات معلقة</div>
        </div>
        <div className="crime-card p-4 text-center">
          <Check className="mx-auto mb-2 text-green-500" size={24} />
          <div className="text-xl font-bold text-green-500">
            {gameRequests.filter(req => req.status === 'approved').length}
          </div>
          <div className="text-gray-400">طلبات مقبولة</div>
        </div>
        <div className="crime-card p-4 text-center">
          <X className="mx-auto mb-2 text-red-500" size={24} />
          <div className="text-xl font-bold text-red-500">
            {gameRequests.filter(req => req.status === 'rejected').length}
          </div>
          <div className="text-gray-400">طلبات مرفوضة</div>
        </div>
      </div>

      {/* Game Requests */}
      <div className="crime-card p-6">
        <h2 className="text-2xl font-bold text-neon mb-4">طلبات الألعاب</h2>
        {gameRequests.length === 0 ? (
          <p className="text-gray-400 text-center py-8">لا توجد طلبات حالياً</p>
        ) : (
          <div className="space-y-4">
            {gameRequests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((request) => (
              <div key={request.id} className="bg-secondary p-4 rounded border-l-4 border-neon">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">{request.gameName}</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={16} />
                    <span className="text-gray-400 text-sm">
                      {new Date(request.timestamp).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <p className="text-gray-300"><strong>الطالب:</strong> {request.requesterName}</p>
                  <p className="text-gray-300"><strong>المنصة:</strong> {request.platform || 'غير محدد'}</p>
                </div>
                {request.description && (
                  <p className="text-gray-300 mb-3"><strong>الوصف:</strong> {request.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded text-sm font-bold ${
                    request.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                    request.status === 'approved' ? 'bg-green-600 text-green-100' :
                    'bg-red-600 text-red-100'
                  }`}>
                    {request.status === 'pending' ? 'معلق' :
                     request.status === 'approved' ? 'مقبول' : 'مرفوض'}
                  </span>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateRequestStatus(request.id, 'approved')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 flex items-center gap-1"
                      >
                        <Check size={16} /> قبول
                      </button>
                      <button 
                        onClick={() => updateRequestStatus(request.id, 'rejected')}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 flex items-center gap-1"
                      >
                        <X size={16} /> رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-crime-dark animated-bg">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Zap className="text-neon" size={24} />
              <span className="text-xl font-bold text-neon">Crime City</span>
            </motion.div>
            
            <div className="flex items-center gap-1">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground neon-glow'
                      : 'text-gray-300 hover:text-neon hover:bg-secondary'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </motion.button>
              ))}
              
              {/* Admin Button */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => isAdmin ? setActiveSection('admin') : setShowAdminLogin(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:text-neon hover:bg-secondary relative"
              >
                <Settings size={18} />
                {gameRequests.filter(req => req.status === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {gameRequests.filter(req => req.status === 'pending').length}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Modals */}
      {showGameRequestForm && <GameRequestForm />}
      {showAdminLogin && <AdminLogin />}

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-lg mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="text-neon" size={20} />
              <span className="text-lg font-bold text-neon">Crime City</span>
            </div>
            <p className="text-gray-400 mb-4">
              أفضل مجتمع gaming في المنطقة - انضم إلينا الآن
            </p>
            <div className="flex justify-center gap-4">
              <button className="text-gray-400 hover:text-neon transition-colors">
                Discord
              </button>
              <button className="text-gray-400 hover:text-neon transition-colors">
                تواصل معنا
              </button>
              <button className="text-gray-400 hover:text-neon transition-colors">
                الشروط والأحكام
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              © 2025 Crime City. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

