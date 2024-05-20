from fastapi.testclient import TestClient
# some_file.py
import sys
# caution: path[0] is reserved for script path (or '' in REPL)
sys.path.insert('../src')
import main

client = TestClient(main.app)

def test_home_route():
    response = client.get("/")
    assert response.status_code == 200

def test_recommend():
    response = client.get("/recommend")
    assert response.status_code == 200