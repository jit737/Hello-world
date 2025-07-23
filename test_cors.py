#!/usr/bin/env python3
"""
Test CORS headers specifically
"""

import requests

BACKEND_URL = "https://20adebbd-6069-4f3b-83bd-a3842316f01e.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def test_cors_headers():
    """Test CORS headers on a GET request"""
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print("Response Headers:")
        for header, value in response.headers.items():
            if 'access-control' in header.lower():
                print(f"  {header}: {value}")
        
        # Check specific CORS headers
        cors_origin = response.headers.get('Access-Control-Allow-Origin')
        cors_methods = response.headers.get('Access-Control-Allow-Methods')
        cors_headers = response.headers.get('Access-Control-Allow-Headers')
        
        print(f"\nCORS Analysis:")
        print(f"  Allow-Origin: {cors_origin}")
        print(f"  Allow-Methods: {cors_methods}")
        print(f"  Allow-Headers: {cors_headers}")
        
        if cors_origin:
            print("✅ CORS is configured and working")
            return True
        else:
            print("❌ CORS headers not found in response")
            return False
            
    except Exception as e:
        print(f"❌ Error testing CORS: {str(e)}")
        return False

if __name__ == "__main__":
    test_cors_headers()