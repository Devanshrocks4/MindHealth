# Mental Health Assessment Platform - Test & Dashboard Guide

## WHAT TESTS ARE PERFORMED?

### TEST 1: PHQ-9 (Depression Assessment)
**What it measures:** How depressed you might be feeling

**9 Questions about:**
1. Loss of interest in activities
2. Feeling sad or hopeless
3. Sleep problems (too much/too little)
4. Tiredness and low energy
5. Appetite changes
6. Feeling worthless or guilty
7. Concentration problems
8. Being slow/lazy or restless
9. Thoughts of self-harm

**Scoring:** Each question = 0 to 3 points → Total: 0-27 points
- 0-4 = Minimal depression (you're fine)
- 5-9 = Mild depression (some issues)
- 10-14 = Moderate depression (need help)
- 15-19 = Moderately severe depression (serious help needed)
- 20+ = Severe depression (urgent help needed)

---

### TEST 2: GAD-7 (Anxiety Assessment)
**What it measures:** How anxious you might be feeling

**7 Questions about:**
1. Feeling nervous or on edge
2. Can't stop worrying
3. Worrying about many things
4. Can't relax
5. Too restless to sit still
6. Getting annoyed easily
7. Feeling something bad will happen

**Scoring:** Each question = 0 to 3 points → Total: 0-21 points
- 0-4 = Minimal anxiety (you're fine)
- 5-9 = Mild anxiety (some issues)
- 10-14 = Moderate anxiety (need help)
- 15+ = Severe anxiety (urgent help needed)


---

## HOW USER TAKES THE TEST

1. User clicks "Try PHQ-9" or "Try GAD-7" button on home page
2. If NOT logged in → Redirect to login/register page (with option to top-up)
3. If logged in → Show test form with all questions
4. User selects answer for each question (0 to 3 scale)
5. User clicks "Submit"
6. System calculates total score
7. User sees results page immediately

---

## WHAT USER SEES ON RESULTS PAGE

After submitting a test, user sees:

### 1. **Score Card**
```
Your PHQ-9 Score: 14/27
Status: Moderate Depression ⚠️
```
Large display of the final score with severity label

### 2. **What This Score Means**
Explanation based on severity:
- **Minimal (0-4):** "You're managing well. Keep taking care of yourself."
- **Mild (5-9):** "You may be experiencing some symptoms. Consider self-care strategies."
- **Moderate (10-14):** "Professional support would be helpful. Consider talking to a therapist."
- **Severe (15-19):** "You should seek professional help soon. Don't wait."
- **Very Severe (20+):** "Please reach out to a mental health professional immediately."

### 3. **Your Answers Breakdown**
Shows each question with user's answer:
```
Q1: Little interest in doing things?        → Several days ✓
Q2: Feeling down or hopeless?               → More than half the days ✓
Q3: Sleep problems?                         → Nearly every day ✓
... (all 9 or 7 questions)
```

### 4. **What You Should Do (Suggestions)**
Based on severity, suggests:
- For Mild: "Try meditation", "Exercise regularly", "Sleep better"
- For Moderate: "See a therapist", "Talk to doctor", "Join support group"
- For Severe: "Call crisis hotline 988", "Go to emergency room", "Seek professional help immediately"

### 5. **Helpful Resources**
Links to:
- Mental health articles
- Therapist finder
- Crisis hotlines
- Self-help books
- Support groups

### 6. **Download Option**
Button to download results as PDF

### 7. **Next Steps**
- Return to dashboard
- Take another test
- View your progress over time

---

## WHAT IS THE DASHBOARD?

The **Dashboard** is like a personal health control center where user can see:

### 1. **Your Latest Scores**
Shows the most recent PHQ-9 and GAD-7 tests:
```
PHQ-9 (Depression)      GAD-7 (Anxiety)
Score: 14/27            Score: 11/21
Status: Moderate        Status: Mild
Date: Nov 15, 2025      Date: Nov 15, 2025
[Radial Chart showing]  [Radial Chart showing]
14 filled out of 27     11 filled out of 21
```

### 2. **Progress Over Time (Charts)**
Shows how your scores have changed:
```
PHQ-9 Trend:              GAD-7 Trend:
Nov 1  → Nov 8  → Nov 15  Nov 1  → Nov 8  → Nov 15
16       12        14      14       13        11
(Getting better!)         (Improving!)
```

### 3. **Your Emotional Status (Mascot)**
Animated character that reacts to your scores:
```
😊 If average score ≤ 3:  "You're doing great! Keep it up."
😐 If average score 3-7:   "Things are stable. Take care of yourself."

🤝 If average score 12+:   "You're not alone. Get professional help."
```

### 4. **Your Assessment History (Table)**
List of all past tests you took:
```
Date         | Test Type | Score | Status              | Action
Nov 15, 2025 | PHQ-9     | 14    | Moderate Depression | View / Download PDF
Nov 08, 2025 | GAD-7     | 11    | Mild Anxiety        | View / Download PDF
Nov 01, 2025 | PHQ-9     | 16    | Moderately Severe   | View / Download PDF
Oct 25, 2025 | GAD-7     | 9     | Mild Anxiety        | View / Download PDF
... (all past tests)
```

### 5. **Your Achievements (Badges)**
Shows unlocked milestones:
```
✅ First Step              - Completed 1st test
✅ Consistent Tracker      - Completed 5+ tests  
⏳ Well-Rounded (67%)      - Need 3 PHQ9 + 3 GAD7 (You have 2 of each)
✅ Making Progress         - Recent scores improving!
```

### 6. **Helpful Resources**
Links to mental health resources based on your scores:
- Therapist finder websites
- Crisis hotlines
- Mental health articles
- Self-help strategies
- Support groups in your area

---

## QUICK SUMMARY TABLE

| Component | What It Shows | Purpose |
|-----------|---------------|---------|
| **Test Form** | 9 or 7 questions to answer | Measure your mental health |
| **Results Page** | Your score, severity, suggestions | Immediate feedback after test |
| **Dashboard** | All your past tests & trends | Track progress over time |
| **Latest Cards** | Your most recent scores | Quick overview of current status |
| **Progress Chart** | Scores over time | See if you're improving |
| **Mascot** | Emotional reaction to your scores | Supportive feedback |
| **Achievements** | Unlocked badges/milestones | Motivation to keep testing |
| **History Table** | List of all past tests | Review your journey |
| **Resources** | Mental health links | Get help and support |

---

## HOW TO INTERPRET YOUR SCORES

### PHQ-9 Score (Depression)
- **0-4:** You're doing well, no significant depression
- **5-9:** Some symptoms present, try self-help
- **10-14:** You should talk to a mental health professional
- **15-19:** Serious symptoms, seek professional help soon
- **20+:** Severe depression, get help immediately

### GAD-7 Score (Anxiety)
- **0-4:** You're doing well, no significant anxiety
- **5-9:** Some symptoms present, try relaxation techniques
- **10-14:** You should talk to a mental health professional
- **15+:** Serious anxiety symptoms, seek professional help soon

---

## DATA SAVED IN DATABASE

After each test, system saves:

```
Test Information:
- Which test was taken (PHQ-9 or GAD-7)
- When it was taken (date & time)
- Your total score
- Your answers to each question
- Your severity level (Minimal, Mild, Moderate, Severe)

User Profile:
- Your username
- Your email
- How many tests you've taken
- Progress over time
```
