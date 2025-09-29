from datetime import timedelta
import os

JWT_SETTINGS = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    # "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    # "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    # "ROTATE_REFRESH_TOKENS": False,
    # "BLACKLIST_AFTER_ROTATION": True,
    # "UPDATE_LAST_LOGIN": False,

    # "ALGORITHM": "HS256",
    # "SIGNING_KEY": os.environ.get('DJANGO_SECRET'),
    # # "VERIFYING_KEY": "",
    # # "AUDIENCE": None,
    # # "ISSUER": None,
    # # "JSON_ENCODER": None,
    # # "JWK_URL": None,
    # # "LEEWAY": 0,

    # 'AUTH_COOKIE': 'access_token',  # Cookie name
    # 'AUTH_COOKIE_REFRESH': 'refresh_token',  # Refresh token cookie name
    # 'AUTH_COOKIE_DOMAIN': None,  # Domain name for the cookie
    # 'AUTH_COOKIE_SECURE': True,  # Only transfer over HTTPS
    # 'AUTH_COOKIE_HTTP_ONLY': True,  # Prevent JavaScript access
    # 'AUTH_COOKIE_PATH': '/',  # Cookie path
    # 'AUTH_COOKIE_SAMESITE': 'None',

    # "AUTH_HEADER_TYPES": ("Bearer",),
    # "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    # "USER_ID_FIELD": "user_id",
    # "USER_ID_CLAIM": "user_id",
    # "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    # "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    # "TOKEN_TYPE_CLAIM": "token_type",
    # "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    # "JTI_CLAIM": "jti",

    # # "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    # # "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    # # "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

    # "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    # "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    # # "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    # # "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    # # "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    # # "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}