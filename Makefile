.SHELL := cmd.exe
.PHONY: run-frontend run-backend run-all

run-frontend:
	cmd /c start "" cmd /k "cd frontend\\my-vite-app && npm run dev"

run-backend:
	cmd /c start "" cmd /k "cd backend && myenv\\Scripts\\activate && uvicorn society.main:app --reload"

run-all:
	$(MAKE) run-frontend
	$(MAKE) run-backend
