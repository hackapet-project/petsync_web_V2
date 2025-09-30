# Local development with port mappings
up:
	docker compose -f docker-compose.yml -f docker-compose.local.yml up

down:
	docker compose -f docker-compose.yml -f docker-compose.local.yml down

build:
	docker compose -f docker-compose.yml -f docker-compose.local.yml build

# Production deployment (no port mappings)
up-prod:
	docker compose up

down-prod:
	docker compose down

build-prod:
	docker compose build

create_app:
	docker compose run --rm back python ./manage.py startapp ${i}

test_back:
	docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm back pytest -vv --reuse-db --nomigrations

install_front: build
	rm -rf front/node_modules
	docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm front npm install

angular_scaffolder:
	docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm angular_scaffolder ng new ${i}

django_scaffolder:
	docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm django_scaffolder django-admin startproject core ./back

migrations:
	docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm back python manage.py makemigrations
	docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm back python manage.py migrate

migrate:
	docker compose -f docker-compose.yml -f docker-compose.local.yml run --rm back python manage.py migrate
