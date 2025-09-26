up:
	docker compose up

down:
	docker compose down

build:
	docker compose build

create_app:
	docker compose run --rm back python ./manage.py startapp ${i}

test_back:
	docker compose run --rm back pytest -vv --reuse-db --nomigrations

angular_scaffolder:
	docker compose run --rm angular_scaffolder ng new ${i}

django_scaffolder:
	docker compose run --rm django_scaffolder django-admin startproject core ./back

migrations:
	docker compose run --rm back python manage.py makemigrations
	docker compose run --rm back python manage.py migrate

migrate:
	docker compose run --rm back python manage.py migrate