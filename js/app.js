// App State Management & Utilities

class AppStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem('ecocycle_profile')) {
      localStorage.setItem('ecocycle_profile', JSON.stringify(DEFAULT_PROFILE));
    }
    if (!localStorage.getItem('ecocycle_transactions')) {
      localStorage.setItem('ecocycle_transactions', JSON.stringify([]));
    }
    if (!localStorage.getItem('ecocycle_vouchers')) {
      localStorage.setItem('ecocycle_vouchers', JSON.stringify([]));
    }
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('ecocycle_profile'));
  }

  updateProfile(data) {
    const current = this.getProfile();
    localStorage.setItem('ecocycle_profile', JSON.stringify({ ...current, ...data }));
  }

  getTransactions() {
    return JSON.parse(localStorage.getItem('ecocycle_transactions'));
  }

  getVouchers() {
    return JSON.parse(localStorage.getItem('ecocycle_vouchers'));
  }

  getBalance() {
    const txs = this.getTransactions();
    const earned = txs.reduce((sum, tx) => sum + tx.points, 0);
    
    const vouchers = this.getVouchers();
    const spent = vouchers.reduce((sum, v) => sum + v.cost, 0);
    
    return earned - spent;
  }

  getImpactStats() {
    const txs = this.getTransactions();
    let weight = 0;
    txs.forEach(tx => {
      const cat = DEVICE_CATEGORIES.find(c => c.id === tx.categoryId);
      if (cat) weight += cat.estimatedWeightGrams;
    });
    
    return {
      totalDeposits: txs.length,
      estimatedWeightKg: (weight / 1000).toFixed(2),
      pointsEarned: txs.reduce((sum, tx) => sum + tx.points, 0),
      pointsRedeemed: this.getVouchers().reduce((sum, v) => sum + v.cost, 0)
    };
  }

  addDepositTransaction(categoryId, kioskId, points) {
    const txs = this.getTransactions();
    const newTx = {
      id: 'TX-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      type: 'deposit',
      categoryId,
      kioskId,
      points,
      timestamp: new Date().toISOString(),
      status: 'verified'
    };
    txs.unshift(newTx);
    localStorage.setItem('ecocycle_transactions', JSON.stringify(txs));
    return newTx;
  }

  redeemVoucher(voucherId) {
    const voucherDef = REWARD_VOUCHERS.find(v => v.id === voucherId);
    if (!voucherDef) return { success: false, message: 'Invalid voucher' };

    const balance = this.getBalance();
    if (balance < voucherDef.pointsCost) {
      return { success: false, message: 'Insufficient points' };
    }

    const vouchers = this.getVouchers();
    const newVoucher = {
      id: 'VOUCHER-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      defId: voucherId,
      name: voucherDef.name,
      cost: voucherDef.pointsCost,
      timestamp: new Date().toISOString(),
      status: 'active'
    };
    vouchers.unshift(newVoucher);
    localStorage.setItem('ecocycle_vouchers', JSON.stringify(vouchers));
    return { success: true, voucher: newVoucher };
  }

  resetData() {
    localStorage.removeItem('ecocycle_profile');
    localStorage.removeItem('ecocycle_transactions');
    localStorage.removeItem('ecocycle_vouchers');
    localStorage.removeItem('ecocycle_kiosk_flow'); // any temp flow state
    this.init();
  }
}

const store = new AppStore();

// UI Utilities
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  // Icon based on type
  const icon = type === 'success' 
    ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DDF4E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FEF2F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  
  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateGlobalUI() {
  // Update all elements with class 'user-balance'
  const balanceElements = document.querySelectorAll('.user-balance');
  const balance = store.getBalance();
  balanceElements.forEach(el => {
    el.textContent = balance;
  });

  // Highlight active nav items
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const navItems = document.querySelectorAll(`.nav-item[data-target="${currentPage}"], .bottom-nav-item[data-target="${currentPage}"]`);
    navItems.forEach(el => el.classList.add('active'));
  }
}

// Sidebar/App shell setup (if on app pages)
document.addEventListener('DOMContentLoaded', () => {
  updateGlobalUI();
});
