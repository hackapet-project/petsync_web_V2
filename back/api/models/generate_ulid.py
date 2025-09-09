import ulid #type: ignore

def generate_ulid():
    return str(ulid.ULID())