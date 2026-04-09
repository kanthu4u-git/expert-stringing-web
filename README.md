# Expert Stringing Web Dashboard

**Expert Stringing** is a professional business administration and workflow tool designed specifically for racket stringers (Tennis and Badminton). This application mirrors the core features of the advanced Android mobile app within a premium, offline-capable React Web interface.

## 🚀 Features

*   **Advanced Business Dashboard**: Get immediately actionable insights with real-time tiles tracking Pending Jobs, Ready Orders, Unpaid Invoices, and Average Stringing Time.
*   **Smart Job Creation**: Log multiple records spanning Customer name, Racket details, and sport specifications (Mains/Crosses Tension) instantly into the local database. 
*   **Customer Direct Links**: Seamless global searchable tables logging user history. Deep-integration featuring 1-click WhatsApp messaging.
*   **Pro Inventory Tracker**: Monitor remaining meters for each reel in real-time. Smart visual alerts trigger deep-red badges when strings drop below 1-racket requirement thresholds (< 12 meters).
*   **Instant PDF Invoices**: Generate completely customized A4 PDF receipts highlighting strings, tensions, dynamic pricing logic (`Base + Add-ons`), securely downloading straight to the host machine.
*   **Interactive Analytics**: Data visualization implemented via `Recharts` providing beautiful break downs of Tennis against Badminton business splits and daily speed tracking.

---

## 🛠️ Technology Stack

*   **Framework**: Vite + React
*   **Design & Theme**: Vanilla CSS (Custom Glassmorphism, Deep Dark Mode, Google Fonts - Inter)
*   **Database**: `Dexie.js` (Robust IndexedDB wrapper allowing an offline-first experience matching the Android Room database) 
*   **Icons & Assets**: `lucide-react`
*   **Data Parsing/Analysis**: `jspdf`, `recharts`

---

## 💻 Getting Started (Local Development)

To run the Expert Stringing Web application on your local machine, ensure you have **Node.js** installed, and then follow these commands:

### 1. Install Dependencies
Open your terminal inside the `expert-stringing-web` folder and run:

```bash
npm install
```

### 2. Start the Development Server
Run the Vite development server to launch the app:

```bash
npm run dev
```

### 3. Open in Browser
Once the server boots, visit your dashboard here:
*   [http://localhost:5173](http://localhost:5173)

---

## 🎨 Design Philosophy
The entire application was handcrafted without generic library templates to adhere strictly to premium design paradigms (Subtle gradient overlays, dynamic button micro-animations, fast route mounting) catering specifically to high-end business administration.
