from django.urls import path
from . import views

urlpatterns = [
    path('start/<slug:test>/', views.assessment_entry, name='assessment_entry'),
    path('phq9/', views.phq9_view, name='phq9'),
    path('gad7/', views.gad7_view, name='gad7'),
    path('results/<int:assessment_id>/', views.results_view, name='results'),
    path('dashboard/', views.result_dashboard_view, name='result_dashboard'),
    path('download/<int:assessment_id>/', views.download_pdf, name='download_pdf'),
]
