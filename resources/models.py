from django.db import models

class Resource(models.Model):
    RESOURCE_TYPES = [
        ('HELPLINE', 'Helpline'),
        ('TIP', 'Self-Help Tip'),
        ('PROFESSIONAL', 'Professional Service'),
        ('CRISIS', 'Crisis Support'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    url = models.URLField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    severity_min = models.IntegerField(default=0)  # Minimum score to show this resource
    severity_max = models.IntegerField(default=27)  # Maximum score to show this resource

    def __str__(self):
        return self.title
