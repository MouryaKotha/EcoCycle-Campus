# EcoCycle Campus

**Turn Your Tech Trash Into Lunch.**

EcoCycle Campus is a prototype for an IoT-inspired campus e-waste recycling and cafeteria rewards platform. Built entirely with static web technologies, it allows students to seamlessly deposit old electronics in smart campus kiosks, earn reward points, and redeem them for cafeteria discounts.

## Problem Statement
University campuses generate significant amounts of small electronic waste (cables, earphones, power banks) that often end up in general trash due to the inconvenience of proper disposal. There is a lack of localized infrastructure and immediate incentives for students to recycle responsibly.

## Solution Overview
EcoCycle Campus bridges the gap between sustainability and student life. By deploying "smart kiosks" around campus and pairing them with a gamified web application, students are instantly rewarded for responsible recycling behaviors. The points earned from e-waste deposits directly subsidize their cafeteria meals, creating a circular campus economy.

## Features
- **Smart Kiosk Discovery**: Real-time status and location of campus drop-off points.
- **Secure Deposit Workflow**: Simulated QR scanning and bin unlocking process.
- **Instant Rewards Engine**: Point allocation based on device type and weight estimates.
- **Cafeteria Voucher Redemption**: Convert earned points into digital meal vouchers.
- **Impact Tracking**: Personal and campus-wide milestones for e-waste diversion.
- **Transaction Ledger**: Complete history of deposits and redemptions with digital receipts.
- **Mobile-First Design**: Responsive UI that feels like a native app on mobile devices.

## Technology Stack
- **HTML5 & CSS3** (Vanilla, with CSS Variables for theme management)
- **Vanilla JavaScript** (ES6+)
- **localStorage API** (For client-side state persistence)
- **Inline SVG** (For icons and lightweight illustrations)
- *No frameworks, no build steps, no external dependencies.*

## Project Directory Structure
```text
.
├── assets/               # Local icons and images (if any)
├── css/
│   └── style.css         # Core styles, variables, utility classes, and layout
├── js/
│   ├── app.js            # Global state management (AppStore) and UI utilities
│   └── data.js           # Mock definitions for kiosks, devices, and vouchers
├── index.html            # Marketing landing page
├── dashboard.html        # Main student overview
├── kiosks.html           # Kiosk map and scanner entry point
├── deposit.html          # Guided multi-step deposit workflow
├── rewards.html          # Cafeteria rewards and redemption
├── history.html          # Transaction and receipt history
├── impact.html           # Environmental impact metrics
├── profile.html          # User settings and demo reset
└── README.md             # Project documentation
```

## How to Run Locally
1. Clone or download the repository.
2. Open `index.html` directly in any modern web browser.
3. No local server or build process is strictly required, though using a simple HTTP server (like VS Code Live Server or Python's `http.server`) is recommended for the best experience.

## Demo Workflow
1. Start at the Landing Page (`index.html`) and click **Start Recycling**.
2. From the Dashboard, click **Start Recycling** or go to **Kiosks & Deposit** (`kiosks.html`).
3. Select an online kiosk and click **Scan QR to Unlock**.
4. The app simulates a camera scan. Wait for the success redirect.
5. In the Deposit flow (`deposit.html`), select a device type (e.g., Mobile Phone) and click **Proceed to Verify**.
6. Wait for the simulated verification. A digital receipt will appear.
7. Return to the Dashboard to see your updated points balance.
8. Navigate to **Rewards** (`rewards.html`) and click **Redeem** on a voucher you can afford.
9. Check the **History** (`history.html`) tab to view the ledger of these transactions.
10. Navigate to **Profile** (`profile.html`) if you wish to reset the demo data and start over.

## Prototype Limitations
- **No Real Backend**: All state is stored in the browser's `localStorage`. Data will not sync across devices.
- **Mock IoT Integration**: The QR scanning, bin unlocking, and device verification are simulated via timeouts.
- **No Real Authentication**: The user is logged in automatically as "Demo Student".
- **Hardcoded Catalog**: Kiosks and reward definitions are hardcoded in `js/data.js`.

## GitHub Pages Deployment Steps
Since this is a static application, deployment is trivial:
1. Push the code to a public GitHub repository.
2. Navigate to the repository's **Settings** tab.
3. Select **Pages** from the left sidebar.
4. Under "Build and deployment", set the **Source** to `Deploy from a branch`.
5. Select your `main` or `master` branch and the `/ (root)` folder, then click **Save**.
6. Wait a few minutes. GitHub will provide a live URL (e.g., `https://username.github.io/ecocycle-campus`).
7. Because relative paths are used for all assets and links, the app will function perfectly on the sub-path.

## Future Improvements for Production
If this prototype were to be converted into a real-world product:
- **Backend & Database**: Implement Node.js/Express with MongoDB or PostgreSQL for secure user accounts, transaction verification, and centralized kiosk state management.
- **Hardware Integration**: Connect real kiosk microcontrollers (e.g., Raspberry Pi or ESP32) via MQTT or WebSockets to report real-time bin capacity and trigger physical locking mechanisms.
- **Authentication**: Integrate OAuth (e.g., Google or University SSO) for secure student login.
- **Transaction Verification**: Implement computer vision or weight sensors in the bin to cryptographically verify deposits before awarding points, preventing fraud.
- **Payment Gateway / POS Integration**: Integrate the voucher redemption system with the actual campus cafeteria point-of-sale (POS) systems via webhooks or API.
