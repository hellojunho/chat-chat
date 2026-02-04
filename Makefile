update:
	docker-compose down
	git pull origin main
	docker-compose up

restart-backend:
	docker-compose restart backend

restart-frontend:
	docker-compose restart frontend

make-restart-frontend:
	docker-compose restart frontend

restart-mobile:
	docker-compose restart mobile
