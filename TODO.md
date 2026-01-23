# TODO: Fix Django Deployment Issues

## Issues Identified
- Static files not being collected in production (Railway), causing 404 for /static/ URLs like lottie animations and favicon.
- Favicon.ico missing, resulting in 404 errors.
- Website may not display properly on mobile due to static file failures.

## Plan
1. Update Procfile to include collectstatic command for Railway deployment.
2. Create a favicon to replace missing favicon.ico.
3. Ensure mobile responsiveness (CSS already has media queries, but verify).
4. Test deployment after changes.

## Steps
- [x] Modify Procfile to add release: python manage.py collectstatic --noinput
- [x] Update base.html to use favicon.svg instead of favicon.ico.
- [x] Create a simple favicon.svg in static/ directory.
- [ ] Commit and push changes to GitHub.
- [ ] Redeploy on Railway to test fixes.
