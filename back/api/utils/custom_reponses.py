from rest_framework.response import Response #type:ignore
from rest_framework import status #type:ignore

OK = 200
NO_CONTENT = 204
CREATED = 201
BAD_REQUEST = 400
UNAUTHORIZED = 401
FORBIDDEN = 403
NOT_FOUND = 404
SERVER_ERROR = 500

def get_responses():

    return {
        OK: lambda message=None: Response(message, status=status.HTTP_200_OK),
        NO_CONTENT: lambda _=None: Response(status=status.HTTP_204_NO_CONTENT),
        CREATED: lambda message=None: Response(message, status=status.HTTP_201_CREATED),
        BAD_REQUEST: lambda message=None: Response(message, status=status.HTTP_400_BAD_REQUEST),
        UNAUTHORIZED: lambda message=None: Response(message, status=status.HTTP_401_UNAUTHORIZED),
        FORBIDDEN: lambda message=None: Response(message, status=status.HTTP_403_FORBIDDEN),
        NOT_FOUND: lambda message=None: Response(message, status=status.HTTP_404_NOT_FOUND),
        SERVER_ERROR: lambda message=None: Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR),
    }