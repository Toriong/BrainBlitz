from brainblitzapp.settings import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_PROJECT_ID


class GoogleAuthCredentials:
    client_id: str
    project_id: str
    client_secret: str
    
    def __init__(self) -> None:
        self.client_id = GOOGLE_CLIENT_ID
        self.client_secret = GOOGLE_CLIENT_SECRET
        self.project_id = GOOGLE_PROJECT_ID
        