class User():
    def __init__(self, name, email, password):
        self.id = 1
        self.name = name
        self.email = email
        self.password = password

class UserRepository():
    def __init__(self):
        self.users = [
            User(name='Diego', email='test@test.com', password='123')
        ]

    def get_all(self):

        return list(self.users)

    def get_by_email(self, email: str):
        return next((u for u in self.users if u.email == email), None)

    def add_user(self, user: User):
        self.users.append(user)

    def authenticate(self, email: str, password: str):
        user = self.get_by_email(email)
        if user and user.password == password:
            return user
        return None