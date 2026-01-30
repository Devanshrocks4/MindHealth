<div align="center">
  <h1>🧠 MindHealth</h1>
  <p><em>Your Personal Gateway to Mental Wellness</em></p>
  <p>Take control of your mental health with scientifically validated assessments, personalized insights, and compassionate guidance—all in one beautiful, user-friendly platform.</p>
  <br>
  <a href="https://mentalhealth.up.railway.app"><strong>🚀 Live Demo</strong></a> |
  <a href="#features">✨ Features</a> |
  <a href="#installation">⚡ Quick Start</a> |
  <a href="#deployment">🌐 Deployment</a>
  <br><br>
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" alt="Railway">
</div>

---

## 🌟 About MindHealth

Welcome to **MindHealth** – a compassionate digital companion for mental wellness! 🌈

In today's fast-paced world, taking care of your mental health shouldn't be complicated. Our platform offers:

- **Quick Self-Assessments**: Evidence-based questionnaires (PHQ-9 & GAD-7) in just minutes
- **Instant Insights**: Clear, color-coded results with severity interpretations
- **Personalized Recommendations**: Tailored self-care tips and professional resources
- **Complete Privacy**: Your data stays secure and confidential
- **Beautiful Experience**: Modern, responsive design with smooth animations

Whether you're checking in on yourself or supporting loved ones, MindHealth provides the tools and knowledge to foster better mental health practices.

> **Note**: This Django-powered application maintains all functionality of mental health screening tools while offering superior scalability and maintainability.

---

## ✨ Features

### 🏥 Mental Health Assessments
- **PHQ-9 Questionnaire**: Comprehensive depression screening with 9 clinically validated questions
- **GAD-7 Questionnaire**: Anxiety assessment covering the past two weeks
- **Interactive UI**: Card-based questions with smooth transitions and progress tracking
- **Real-time Scoring**: Instant calculation of severity levels

### 📊 Results & Insights
- **Visual Dashboard**: Color-coded severity charts and animated progress indicators
- **Detailed Interpretations**: Clear explanations of what your scores mean
- **Personalized Recommendations**: Database-driven suggestions based on your results
- **PDF Reports**: Downloadable assessment summaries for your records

### 👤 User Experience
- **Secure Authentication**: User registration, login, and profile management
- **Responsive Design**: Beautiful glassmorphism UI that works on all devices
- **Accessibility**: WCAG-compliant design for inclusive user experience
- **Resource Library**: Curated collection of helplines, self-help tips, and professional resources

### 🔧 Technical Excellence
- **Modern Tech Stack**: Django 5.2.4 with Python 3.10+
- **Performance Optimized**: Caching, compression, and efficient database queries
- **Production Ready**: Configured for Railway deployment with PostgreSQL
- **Open Source**: MIT licensed for community contributions

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | Django 5.2.4 | Web framework & API |
| **Language** | Python 3.10+ | Core programming |
| **Frontend** | HTML5, Tailwind CSS | UI & styling |
| **Database** | PostgreSQL (prod) / SQLite (dev) | Data storage |
| **Charts** | Chart.js | Data visualization |
| **PDF** | ReportLab | Report generation |
| **Icons** | Font Awesome | UI elements |
| **Animations** | Lottie, CSS | Interactive effects |
| **Deployment** | Railway | Hosting platform |

---

## 🚀 Quick Start

Get MindHealth running locally in minutes! 💨

### Prerequisites
- Python 3.10 or higher
- Git
- Virtual environment (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devanshrocks4/MindHealth.git
   cd MindHealth
   ```

2. **Set up virtual environment**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create admin user**
   ```bash
   python manage.py createsuperuser
   ```

6. **Launch the application**
   ```bash
   python manage.py runserver
   ```

7. **Open your browser**
   ```
   http://127.0.0.1:8000
   ```

🎉 **You're all set!** Start your mental wellness journey today.

---

## 🌐 Deployment

### Railway (Recommended - Free Tier Available)

MindHealth is optimized for **Railway** deployment with automatic scaling and PostgreSQL.

#### One-Click Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/Devanshrocks4/MindHealth)

#### Manual Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Railway**
   - Visit [railway.app](https://railway.app)
   - Create account → New Project → Deploy from GitHub
   - Select your `MindHealth` repository

3. **Configure Environment**
   Railway automatically detects Django apps. Set these variables in project settings:
   ```
   SECRET_KEY=your-super-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=yourapp.railway.app
   OPENAI_API_KEY=your-openai-key-optional
   ```

4. **Access Your App**
  Railway provides your live URL (e.g., `https://mentalhealth.up.railway.app`)

### Alternative: Heroku

```bash
# Install Heroku CLI
heroku create your-mindhealth-app
git push heroku main
heroku config:set SECRET_KEY=yourkey DEBUG=False ALLOWED_HOSTS=yourapp.herokuapp.com
heroku run python manage.py migrate
```

---

## 🔧 Troubleshooting

### DNS Resolution Issues
If your deployed website shows "DNS PROBE FINISHED NXDOMAIN" on some devices (e.g., mobile) but works on others (e.g., laptop):

- **Wait for Propagation**: DNS changes can take up to 48 hours to propagate globally. The issue often resolves itself over time.
- **Change DNS Resolver**: On mobile devices, try switching to a public DNS like Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1) in your network settings.
- **Check Railway Dashboard**: Ensure your Railway app is running and the domain is correctly assigned.
- **Clear DNS Cache**: On your device, clear the DNS cache or restart your router/modem.

If issues persist, check Railway's status page or contact their support.

---

## 📖 Usage Guide

### For Users

1. **🏠 Home**: Learn about MindHealth and start your assessment journey
2. **📝 Register/Login**: Create your secure account
3. **🧠 Take Assessment**: Choose PHQ-9 or GAD-7 and answer thoughtfully
4. **📊 View Results**: See your personalized dashboard with insights
5. **📚 Explore Resources**: Access helpful tips and professional contacts
6. **⬇️ Download Reports**: Save PDF summaries for your records

### For Developers

- **Admin Panel**: `/admin/` - Manage users, assessments, and resources
- **API Endpoints**: RESTful APIs for assessments and user data
- **Customization**: Easily add new questionnaires or modify recommendations

---

## 📁 Project Structure

```
MindHealth/
├── 📁 mental_health_php/     # Django project settings
│   ├── settings.py          # Configuration & environment vars
│   ├── urls.py             # Main URL routing
│   └── wsgi.py             # WSGI application
├── 📁 assessment/           # Mental health questionnaires
│   ├── models.py           # Assessment data models
│   ├── views.py            # Assessment logic
│   └── templates/          # Assessment HTML templates
├── 📁 users/                # User authentication & profiles
│   ├── models.py           # Custom user model
│   ├── views.py            # Auth views & profile management
│   └── templates/          # Login/register/profile templates
├── 📁 resources/            # Help resources & recommendations
│   ├── models.py           # Resource database models
│   └── views.py            # Resource display logic
├── 📁 templates/            # Global HTML templates
├── 📁 static/               # CSS, JS, images, fonts
│   ├── css/                # Tailwind styles
│   ├── js/                 # Interactive JavaScript
│   └── images/             # App assets
├── 📄 requirements.txt      # Python dependencies
├── 📄 Procfile             # Railway deployment config
└── 📄 README.md            # This file! 📖
```

---

## 🤝 Contributing

We welcome contributions to make MindHealth even better! 🌟

### Ways to Contribute
- 🐛 **Bug Reports**: Found an issue? [Open an issue](https://github.com/Devanshrocks4/MindHealth/issues)
- 💡 **Feature Requests**: Have ideas? Share them!
- 🔧 **Code Contributions**: Fork, improve, and submit PRs
- 📚 **Documentation**: Help improve guides and docs
- 🌍 **Translations**: Expand language support

### Development Setup
```bash
git clone https://github.com/Devanshrocks4/MindHealth.git
cd MindHealth
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Guidelines
- Follow Django best practices
- Write clear, documented code
- Test your changes thoroughly
- Update documentation as needed

---

## 📞 Support & Community

- **📧 Issues**: [GitHub Issues](https://github.com/Devanshrocks4/MindHealth/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/Devanshrocks4/MindHealth/discussions)
- **📧 Email**: For sensitive matters, reach out privately

### Mental Health Resources
While MindHealth provides screening tools, we're not a substitute for professional care. If you're in crisis:

- **Emergency**: Call 911 or your local emergency number
- **Crisis Hotline**: National Suicide Prevention Lifeline (US): 988
- **International**: Find local resources at [befrienders.org](https://www.befrienders.org)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use, modify, and distribute
with attribution. Perfect for open-source mental health initiatives.
```

---

## ⚠️ Important Disclaimer

**MindHealth is not a diagnostic tool or substitute for professional medical advice.**

- Results are screening indicators, not clinical diagnoses
- Always consult qualified healthcare professionals
- In case of mental health emergencies, seek immediate help
- This tool promotes awareness but doesn't replace therapy

**By using MindHealth, you acknowledge these limitations and use the platform responsibly.**

---

<div align="center">
  <p><em>Made with ❤️ for mental wellness worldwide</em></p>
  <p><strong>MindHealth</strong> - Because your mental health matters.</p>
  <br>
  <a href="#top">⬆️ Back to Top</a>
</div>
