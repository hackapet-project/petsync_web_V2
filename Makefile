up:
	docker compose up

down:
	docker compose down

build:
	docker compose build

#Angular commands
install_front: build
	rm -rf front/node_modules
# 	mkdir front/node_modules
	docker compose run --rm front npm install

generate_component:
	docker compose run --rm front npx ng generate component ${i}

generate_service:
	docker compose run --rm front npx ng generate service ${i}

#Django commands
create_app:
	docker compose run --rm back python ./manage.py startapp ${i}

test_back:
	docker compose run --rm back pytest -vv --reuse-db --nomigrations

migrations:
	docker compose run --rm back python manage.py makemigrations
	docker compose run --rm back python manage.py migrate

migrate:
	docker compose run --rm back python manage.py migrate

#Scaffolder commands
angular_scaffolder:
	docker compose run --rm angular_scaffolder ng new ${i}

django_scaffolder:
	docker compose run --rm django_scaffolder django-admin startproject core ./back
