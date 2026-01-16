# Welcome to a space where your mental wellbeing comes first! Our platform empowers you to quickly self-assess your emotional health using trusted and validated questionnaires. Get clear explanations of your results and explore tailored recommendations—from self-care tips to connections for professional help—all with complete privacy and understanding. Start your journey to better mental health today!

**Note: This codebase is implemented in Django/Python for better scalability and maintainability, while maintaining the same functionality as described in the PHP-based project statement above.**

## Features

- **User Registration and Authentication**: Secure user accounts with profile management
- **Validated Mental Health Assessments**:
  - PHQ-9 (Patient Health Questionnaire-9) for depression screening
  - GAD-7 (Generalized Anxiety Disorder-7) for anxiety screening
- **Interactive Assessment Forms**: Card-based questions with smooth transitions
- **Results Dashboard**: Color-coded severity interpretation with animated charts
- **Personalized Guidance**: Database-driven recommendations based on assessment scores
- **PDF Report Generation**: Downloadable assessment results
- **Responsive Design**: Modern UI with glassmorphism effects, animations, and mobile support
- **Resource Library**: Helplines, self-help tips, and professional resources

## Technology Stack

- **Backend**: Django 5.2.4, Python 3.10+
- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **Database**: SQLite (development), PostgreSQL (production)
- **Charts**: Chart.js
- **PDF Generation**: ReportLab
- **Icons**: Font Awesome
- **Animations**: Lottie, CSS animations

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mental_health_php
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```

7. Access the application at `http://127.0.0.1:8000/`

## Deployment

The easiest way to host this Django application is using **Railway** (free tier available).

### Steps to Deploy on Railway:

1. **Push your code to GitHub**:
   - Create a new repository on GitHub.
   - Commit and push your code to the repository.

2. **Sign up for Railway**:
   - Go to [railway.app](https://railway.app) and create an account.

3. **Connect your GitHub repository**:
   - In Railway dashboard, click "New Project" > "Deploy from GitHub repo".
   - Select your repository.

4. **Automatic Deployment**:
   - Railway will automatically detect it's a Django app and set up the environment.
   - It will install dependencies from `requirements.txt` and run migrations.

5. **Set Environment Variables**:
   - In Railway project settings, add the following variables:
     - `SECRET_KEY`: A random secret key (generate one or use a secure string).
     - `DEBUG`: `False`
     - `ALLOWED_HOSTS`: Your Railway domain (e.g., `yourapp.railway.app`)
     - `OPENAI_API_KEY`: Your OpenAI API key (if using AI features).
   - Railway provides `DATABASE_URL` automatically for PostgreSQL.

6. **Access your app**:
   - Once deployed, Railway will provide a URL to access your application.

### Alternative: Heroku Deployment

If you prefer Heroku:

1. Install Heroku CLI.
2. `heroku create your-app-name`
3. `git push heroku main`
4. Set config vars: `heroku config:set SECRET_KEY=yourkey DEBUG=False ALLOWED_HOSTS=yourapp.herokuapp.com OPENAI_API_KEY=yourkey`
5. Run migrations: `heroku run python manage.py migrate`

## Usage

1. **Register/Login**: Create an account or log in to access assessments
2. **Take Assessments**: Complete PHQ-9 or GAD-7 questionnaires
3. **View Results**: See your scores with severity interpretation and recommendations
4. **Access Resources**: Browse available mental health resources and helplines
5. **Download Reports**: Generate PDF reports of your assessment results

## Project Structure

```
mental_health_php/
├── mental_health_php/         # Project configuration
├── assessment/                # PHQ-9/GAD-7 assessments
├── users/                     # User management
├── resources/                 # Help resources
├── templates/                 # HTML templates
├── static/                    # CSS, JS, images
└── manage.py
```

## Contributing

This project aims to provide accessible mental health screening tools. Contributions are welcome to improve the user experience, add more assessment tools, or enhance the resource database.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
