from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Assessment(models.Model):
    ASSESSMENT_TYPES = [
        ('PHQ9', 'PHQ-9 Depression'),
        ('GAD7', 'GAD-7 Anxiety'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    assessment_type = models.CharField(max_length=10, choices=ASSESSMENT_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    total_score = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.assessment_type} - {self.total_score}"

class AssessmentResponse(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    question_number = models.IntegerField()
    response = models.IntegerField()  # 0-3 for PHQ9, 0-3 for GAD7

    def __str__(self):
        return f"Q{self.question_number}: {self.response}"
