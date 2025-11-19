from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from .forms import PHQ9Form, GAD7Form
from .models import Assessment, AssessmentResponse
import json
from django.http import Http404
from django.urls import reverse

def assessment_entry(request, test):
    """Entry point for assessments: if user authenticated, redirect to the real test;
    otherwise show a friendly page asking to log in or top up."""
    test_map = {
        'phq9': 'phq9',
        'gad7': 'gad7'
    }
    if test not in test_map:
        raise Http404("Assessment not found")

    if request.user.is_authenticated:
        return redirect(test_map[test])

    # unauthenticated -> show auth required page
    display_name = test.upper() if test in ['phq9', 'gad7'] else test
    return render(request, 'assessment/auth_required.html', {
        'test': test,
        'display_name': display_name,
        'login_url': reverse('login'),
        'register_url': reverse('register'),
        'topup_url': reverse('resources')
    })


@login_required
def phq9_view(request):
    if request.method == 'POST':
        form = PHQ9Form(request.POST)
        if form.is_valid():
            responses = [int(form.cleaned_data[f'q{i}']) for i in range(1, 10)]
            total_score = sum(responses)
            assessment = Assessment.objects.create(user=request.user, assessment_type='PHQ9', total_score=total_score)
            for i, response in enumerate(responses, 1):
                AssessmentResponse.objects.create(assessment=assessment, question_number=i, response=response)
            return redirect('results', assessment_id=assessment.id)
    else:
        form = PHQ9Form()
    return render(request, 'assessment/phq9.html', {'form': form})

@login_required
def gad7_view(request):
    if request.method == 'POST':
        form = GAD7Form(request.POST)
        if form.is_valid():
            responses = [int(form.cleaned_data[f'q{i}']) for i in range(1, 8)]
            total_score = sum(responses)
            assessment = Assessment.objects.create(user=request.user, assessment_type='GAD7', total_score=total_score)
            for i, response in enumerate(responses, 1):
                AssessmentResponse.objects.create(assessment=assessment, question_number=i, response=response)
            return redirect('results', assessment_id=assessment.id)
    else:
        form = GAD7Form()
    return render(request, 'assessment/gad7.html', {'form': form})

@login_required
def results_view(request, assessment_id):
    assessment = Assessment.objects.select_related('user').get(id=assessment_id, user=request.user)
    responses = AssessmentResponse.objects.filter(assessment=assessment).order_by('question_number')
    severity = get_severity(assessment.assessment_type, assessment.total_score)
    resources = get_resources(assessment.total_score)
    suggestions = get_suggestions(assessment.assessment_type, severity)
    response_labels = {
        0: 'Not at all',
        1: 'Several days',
        2: 'More than half the days',
        3: 'Nearly every day'
    }
    for response in responses:
        response.label = response_labels.get(response.response, 'Unknown')
    return render(request, 'assessment/results.html', {
        'assessment': assessment,
        'responses': responses,
        'severity': severity,
        'resources': resources,
        'suggestions': suggestions
    })

@login_required
def result_dashboard_view(request):
    user = request.user
    # Get latest PHQ9 and GAD7 assessments with one query
    latest_assessments = Assessment.objects.filter(user=user).select_related('user').order_by('-created_at')[:2]
    latest_phq9 = next((a for a in latest_assessments if a.assessment_type == 'PHQ9'), None)
    latest_gad7 = next((a for a in latest_assessments if a.assessment_type == 'GAD7'), None)

    # Prepare data for display
    latest_data = {}
    chart_data = {'phq9': [], 'gad7': []}
    history = Assessment.objects.filter(user=user).order_by('-created_at')[:10]  # Recent 10 assessments

    if latest_phq9:
        latest_data['phq9'] = {
            'score': latest_phq9.total_score,
            'severity': get_severity('PHQ9', latest_phq9.total_score),
            'date': latest_phq9.created_at,
            'interpretation': f"Your PHQ-9 score indicates {get_severity('PHQ9', latest_phq9.total_score).lower()}. This assessment helps identify depression symptoms."
        }
        # Chart data for PHQ9 over time
        phq9_assessments = Assessment.objects.filter(user=user, assessment_type='PHQ9').order_by('created_at')
        chart_data['phq9'] = [{'date': a.created_at.strftime('%Y-%m-%d'), 'score': a.total_score} for a in phq9_assessments]

    if latest_gad7:
        latest_data['gad7'] = {
            'score': latest_gad7.total_score,
            'severity': get_severity('GAD7', latest_gad7.total_score),
            'date': latest_gad7.created_at,
            'interpretation': f"Your GAD-7 score indicates {get_severity('GAD7', latest_gad7.total_score).lower()}. This assessment evaluates anxiety levels."
        }
        # Chart data for GAD7 over time
        gad7_assessments = Assessment.objects.filter(user=user, assessment_type='GAD7').order_by('created_at')
        chart_data['gad7'] = [{'date': a.created_at.strftime('%Y-%m-%d'), 'score': a.total_score} for a in gad7_assessments]

    # Get resources based on latest scores
    resources = []
    if latest_phq9:
        resources.extend(get_resources(latest_phq9.total_score))
    if latest_gad7:
        resources.extend(get_resources(latest_gad7.total_score))
    resources = list(set(resources))  # Remove duplicates

    # Mascot reactions based on scores
    mascot_reaction = get_mascot_reaction(latest_phq9.total_score if latest_phq9 else 0, latest_gad7.total_score if latest_gad7 else 0)

    # Achievements based on assessment history (cached query)
    achievements = get_achievements(user)

    # Get history with one query
    history = Assessment.objects.filter(user=user).select_related('user').order_by('-created_at')[:10]

    # Available themes (cached in settings later)
    themes = [
        {'name': 'default', 'label': 'Default', 'colors': {'primary': '#667eea', 'secondary': '#764ba2'}},
        {'name': 'ocean', 'label': 'Ocean', 'colors': {'primary': '#2193b0', 'secondary': '#6dd5ed'}},
        {'name': 'sunset', 'label': 'Sunset', 'colors': {'primary': '#ff9a9e', 'secondary': '#fecfef'}},
        {'name': 'forest', 'label': 'Forest', 'colors': {'primary': '#134e5e', 'secondary': '#71b280'}},
        {'name': 'aurora', 'label': 'Aurora', 'colors': {'primary': '#667eea', 'secondary': '#764ba2'}},
    ]

    return render(request, 'assessment/result_dashboard.html', {
        'latest_data': latest_data,
        'chart_data': chart_data,
        'history': history,
        'resources': resources,
        'mascot_reaction': mascot_reaction,
        'achievements': achievements,
        'themes': themes
    })

@login_required
def download_pdf(request, assessment_id):
    assessment = Assessment.objects.get(id=assessment_id, user=request.user)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{assessment.assessment_type}_results.pdf"'
    p = canvas.Canvas(response, pagesize=letter)
    p.drawString(100, 750, f"{assessment.assessment_type} Assessment Results")
    p.drawString(100, 720, f"Total Score: {assessment.total_score}")
    p.drawString(100, 690, f"Severity: {get_severity(assessment.assessment_type, assessment.total_score)}")
    p.showPage()
    p.save()
    return response

def get_severity(assessment_type, score):
    if assessment_type == 'PHQ9':
        if score <= 4:
            return 'Minimal depression'
        elif score <= 9:
            return 'Mild depression'
        elif score <= 14:
            return 'Moderate depression'
        elif score <= 19:
            return 'Moderately severe depression'
        else:
            return 'Severe depression'
    elif assessment_type == 'GAD7':
        if score <= 4:
            return 'Minimal anxiety'
        elif score <= 9:
            return 'Mild anxiety'
        elif score <= 14:
            return 'Moderate anxiety'
        elif score <= 19:
            return 'Severe anxiety'
        else:
            return 'Severe anxiety'
    return 'Unknown'

def get_resources(score):
    from resources.models import Resource
    return Resource.objects.filter(severity_min__lte=score, severity_max__gte=score)

def get_suggestions(assessment_type, severity):
    suggestions = []
    if assessment_type == 'PHQ9':
        if severity == 'Minimal depression':
            suggestions = [
                "Your symptoms are minimal. Continue maintaining healthy habits.",
                "Regular exercise and good sleep can help maintain your well-being.",
                "Consider mindfulness or meditation practices for stress management."
            ]
        elif severity == 'Mild depression':
            suggestions = [
                "Consider lifestyle changes like regular exercise and balanced diet.",
                "Practice stress-reduction techniques such as deep breathing or yoga.",
                "Maintain social connections and engage in enjoyable activities.",
                "Consider speaking with a counselor or therapist for support."
            ]
        elif severity == 'Moderate depression':
            suggestions = [
                "Professional help is recommended. Consider therapy or counseling.",
                "Medication may be beneficial - consult with a healthcare provider.",
                "Build a support network of friends and family.",
                "Establish a daily routine with regular sleep and meal times."
            ]
        elif severity == 'Moderately severe depression':
            suggestions = [
                "Seek immediate professional help from a mental health specialist.",
                "Consider a combination of therapy and medication.",
                "Reach out to crisis hotlines if needed (988 Suicide & Crisis Lifeline).",
                "Avoid making major life decisions while experiencing these symptoms."
            ]
        else:  # Severe depression
            suggestions = [
                "Immediate professional intervention is crucial.",
                "Contact emergency services or go to the nearest emergency room.",
                "Do not attempt to manage severe depression alone.",
                "Reach out to trusted friends or family for immediate support."
            ]
    elif assessment_type == 'GAD7':
        if severity == 'Minimal anxiety':
            suggestions = [
                "Your anxiety levels are minimal. Continue healthy coping strategies.",
                "Practice relaxation techniques like deep breathing.",
                "Maintain regular exercise and healthy sleep habits."
            ]
        elif severity == 'Mild anxiety':
            suggestions = [
                "Try relaxation techniques such as progressive muscle relaxation.",
                "Consider mindfulness meditation or yoga.",
                "Limit caffeine and maintain a consistent sleep schedule.",
                "Talk to a trusted friend or counselor about your concerns."
            ]
        elif severity == 'Moderate anxiety':
            suggestions = [
                "Professional help is recommended. Consider cognitive behavioral therapy.",
                "Learn and practice anxiety management techniques.",
                "Avoid avoidance behaviors - face fears gradually.",
                "Consider medication consultation with a healthcare provider."
            ]
        elif severity == 'Severe anxiety':
            suggestions = [
                "Seek immediate professional help from a mental health specialist.",
                "Consider intensive therapy approaches.",
                "Medication may be necessary - consult a psychiatrist.",
                "Build a strong support system and avoid isolation."
            ]
        else:  # Severe anxiety
            suggestions = [
                "Immediate professional intervention is essential.",
                "Contact emergency services if experiencing panic attacks.",
                "Do not attempt to manage severe anxiety alone.",
                "Reach out to crisis support services immediately."
            ]
    return suggestions

def get_mascot_reaction(phq9_score, gad7_score):
    """Determine mascot reaction based on assessment scores"""
    avg_score = (phq9_score + gad7_score) / 2

    if avg_score <= 3:
        return {
            'emotion': 'happy',
            'message': "You're doing great! Keep up the positive momentum.",
            'lottie_file': 'happy_mascot.json',
            'color': '#10B981'
        }
    elif avg_score <= 7:
        return {
            'emotion': 'neutral',
            'message': "Things are stable. Remember to take care of yourself.",
            'lottie_file': 'neutral_mascot.json',
            'color': '#F59E0B'
        }
    elif avg_score <= 12:
        return {
            'emotion': 'concerned',
            'message': "It might be a good time to reach out for support.",
            'lottie_file': 'concerned_mascot.json',
            'color': '#F97316'
        }
    else:
        return {
            'emotion': 'supportive',
            'message': "You're not alone. Professional help can make a difference.",
            'lottie_file': 'supportive_mascot.json',
            'color': '#EF4444'
        }

def get_achievements(user):
    """Generate achievements based on user's assessment history"""
    assessments = Assessment.objects.filter(user=user)
    total_assessments = assessments.count()
    phq9_count = assessments.filter(assessment_type='PHQ9').count()
    gad7_count = assessments.filter(assessment_type='GAD7').count()

    achievements = []

    # First assessment achievement
    if total_assessments >= 1:
        achievements.append({
            'title': 'First Step',
            'description': 'Completed your first mental health assessment',
            'icon': 'fas fa-star',
            'unlocked': True,
            'progress': 100
        })

    # Regular check-ins
    if total_assessments >= 5:
        achievements.append({
            'title': 'Consistent Tracker',
            'description': 'Completed 5 assessments',
            'icon': 'fas fa-calendar-check',
            'unlocked': True,
            'progress': 100
        })
    else:
        achievements.append({
            'title': 'Consistent Tracker',
            'description': 'Completed 5 assessments',
            'icon': 'fas fa-calendar-check',
            'unlocked': False,
            'progress': (total_assessments / 5) * 100
        })

    # Balanced assessment
    if phq9_count >= 3 and gad7_count >= 3:
        achievements.append({
            'title': 'Well-Rounded',
            'description': 'Completed both PHQ-9 and GAD-7 assessments multiple times',
            'icon': 'fas fa-balance-scale',
            'unlocked': True,
            'progress': 100
        })

    # Improvement tracker
    recent_scores = assessments.order_by('-created_at')[:3]
    if len(recent_scores) >= 3:
        avg_recent = sum([a.total_score for a in recent_scores]) / 3
        older_scores = assessments.order_by('-created_at')[3:6]
        if older_scores:
            avg_older = sum([a.total_score for a in older_scores]) / len(older_scores)
            if avg_recent < avg_older:
                achievements.append({
                    'title': 'Making Progress',
                    'description': 'Showing improvement in recent assessments',
                    'icon': 'fas fa-chart-line',
                    'unlocked': True,
                    'progress': 100
                })

    return achievements
