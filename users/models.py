from django.db.models import CharField, Model

# Create your models here.
class UserModel(Model):
    _id = CharField(max_length=40, unique=True, primary_key=True)
    first_name = CharField(max_length=1_500)
    last_name = CharField(max_length=1_500)
    username = CharField(max_length=50, unique=True)
    email = CharField(max_length=100, unique=True)
    country = CharField(max_length=70)
    password = CharField(max_length=1_000)

    @classmethod
    def create(
        cls, 
        _id,
        first_name,
        last_name,
        username,
        email,
        country,
        password
    ):
        return cls(
            _id=_id,
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            country=country,
            password=password            
        )