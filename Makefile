up:
	docker compose up

down:
	docker compose down

build:
	docker compose build

angular_scaffolder:
	docker compose run --rm angular_scaffolder ng new ${i}

django_scaffolder:
	docker compose run --rm django_scaffolder django-admin startproject core ./back