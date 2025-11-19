from django import forms
from .models import Assessment, AssessmentResponse

class PHQ9Form(forms.Form):
    q1 = forms.ChoiceField(label="Little interest or pleasure in doing things", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q2 = forms.ChoiceField(label="Feeling down, depressed or hopeless", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q3 = forms.ChoiceField(label="Trouble falling asleep, staying asleep, or sleeping too much", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q4 = forms.ChoiceField(label="Feeling tired or having little energy", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q5 = forms.ChoiceField(label="Poor appetite or overeating", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q6 = forms.ChoiceField(label="Feeling bad about yourself - or that you're a failure or have let yourself or your family down", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q7 = forms.ChoiceField(label="Trouble concentrating on things, such as reading the newspaper or watching television", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q8 = forms.ChoiceField(label="Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q9 = forms.ChoiceField(label="Thoughts that you would be better off dead or of hurting yourself in some way", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)

class GAD7Form(forms.Form):
    q1 = forms.ChoiceField(label="Feeling nervous, anxious, or on edge", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q2 = forms.ChoiceField(label="Not being able to stop or control worrying", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q3 = forms.ChoiceField(label="Worrying too much about different things", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q4 = forms.ChoiceField(label="Trouble relaxing", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q5 = forms.ChoiceField(label="Being so restless that it's hard to sit still", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q6 = forms.ChoiceField(label="Becoming easily annoyed or irritable", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
    q7 = forms.ChoiceField(label="Feeling afraid as if something awful might happen", choices=[(0, 'Not at all'), (1, 'Several days'), (2, 'More than half the days'), (3, 'Nearly every day')], widget=forms.RadioSelect)
