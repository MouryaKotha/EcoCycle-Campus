const MOCK_KIOSKS = [
  {
    id: 'K-A101',
    name: 'Hostel Block A Lobby',
    status: 'online',
    fillLevel: 45,
    supportedCategories: ['cable', 'earphones', 'small_acc', 'powerbank', 'mobile']
  },
  {
    id: 'K-B205',
    name: 'Hostel Block B Lobby',
    status: 'online',
    fillLevel: 82,
    supportedCategories: ['cable', 'earphones', 'small_acc', 'powerbank', 'mobile']
  },
  {
    id: 'K-L001',
    name: 'Central Library Entrance',
    status: 'maintenance',
    fillLevel: 100,
    supportedCategories: ['cable', 'earphones']
  }
];

const DEVICE_CATEGORIES = [
  { id: 'cable', name: 'Charging Cable', points: 10, estimatedWeightGrams: 50 },
  { id: 'earphones', name: 'Earphones', points: 15, estimatedWeightGrams: 30 },
  { id: 'small_acc', name: 'Small Electronic Accessory', points: 20, estimatedWeightGrams: 100 },
  { id: 'powerbank', name: 'Power Bank', points: 30, estimatedWeightGrams: 200 },
  { id: 'mobile', name: 'Mobile Phone', points: 50, estimatedWeightGrams: 180 }
];

const REWARD_VOUCHERS = [
  { id: 'V-10', name: '₹10 Snack Discount', pointsCost: 50, color: 'var(--amber)' },
  { id: 'V-20', name: '₹20 Cafeteria Discount', pointsCost: 100, color: 'var(--mint-green)' },
  { id: 'V-30', name: '₹30 Meal Discount', pointsCost: 150, color: 'var(--forest-green)' },
  { id: 'V-50', name: '₹50 Meal Discount', pointsCost: 250, color: 'var(--dark-charcoal)' }
];

const DEFAULT_PROFILE = {
  name: 'Demo Student',
  email: 'student@campus.edu',
  hostel: 'Block A, Room 402',
  joined: new Date().toISOString(),
  notifications: true
};
