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
