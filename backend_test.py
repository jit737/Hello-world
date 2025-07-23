#!/usr/bin/env python3
"""
Backend API Testing Script for Jitmohan Raj Portfolio
Tests all API endpoints to ensure proper functionality
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

# Test configuration
BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("❌ Could not find REACT_APP_BACKEND_URL in frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"🔗 Testing backend at: {API_BASE}")

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(test_name, success, message="", response_data=None):
    """Log test results"""
    if success:
        print(f"✅ {test_name}: {message}")
        test_results["passed"] += 1
    else:
        print(f"❌ {test_name}: {message}")
        test_results["failed"] += 1
        test_results["errors"].append(f"{test_name}: {message}")
        if response_data:
            print(f"   Response: {response_data}")

def test_hello_world():
    """Test GET /api/ - Hello world endpoint"""
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "Hello World" in data["message"]:
                log_test("Hello World Endpoint", True, f"Status: {response.status_code}, Message: {data['message']}")
                return True
            else:
                log_test("Hello World Endpoint", False, f"Unexpected response format: {data}")
        else:
            log_test("Hello World Endpoint", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("Hello World Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_personal_info():
    """Test GET /api/personal-info - Get personal information"""
    try:
        response = requests.get(f"{API_BASE}/personal-info", timeout=10)
        if response.status_code == 200:
            data = response.json()
            required_fields = ["name", "title", "email", "bio"]
            if all(field in data for field in required_fields):
                log_test("Personal Info Endpoint", True, f"Status: {response.status_code}, Name: {data.get('name', 'N/A')}")
                return True
            else:
                log_test("Personal Info Endpoint", False, f"Missing required fields in response: {data}")
        else:
            log_test("Personal Info Endpoint", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("Personal Info Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_projects():
    """Test GET /api/projects - Get all projects"""
    try:
        response = requests.get(f"{API_BASE}/projects", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                log_test("Projects Endpoint", True, f"Status: {response.status_code}, Projects count: {len(data)}")
                return data
            else:
                log_test("Projects Endpoint", False, f"Expected list, got: {type(data)}")
        else:
            log_test("Projects Endpoint", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("Projects Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_featured_projects():
    """Test GET /api/projects?featured_only=true - Get featured projects only"""
    try:
        response = requests.get(f"{API_BASE}/projects?featured_only=true", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                featured_count = len([p for p in data if p.get('is_featured', False)])
                log_test("Featured Projects Endpoint", True, f"Status: {response.status_code}, Featured projects: {featured_count}")
                return True
            else:
                log_test("Featured Projects Endpoint", False, f"Expected list, got: {type(data)}")
        else:
            log_test("Featured Projects Endpoint", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("Featured Projects Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_experience():
    """Test GET /api/experience - Get work experience"""
    try:
        response = requests.get(f"{API_BASE}/experience", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                log_test("Experience Endpoint", True, f"Status: {response.status_code}, Experience entries: {len(data)}")
                return True
            else:
                log_test("Experience Endpoint", False, f"Expected list, got: {type(data)}")
        else:
            log_test("Experience Endpoint", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("Experience Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_skills():
    """Test GET /api/skills - Get all skills"""
    try:
        response = requests.get(f"{API_BASE}/skills", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                log_test("Skills Endpoint", True, f"Status: {response.status_code}, Skills count: {len(data)}")
                return True
            else:
                log_test("Skills Endpoint", False, f"Expected list, got: {type(data)}")
        else:
            log_test("Skills Endpoint", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("Skills Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_stats():
    """Test GET /api/stats - Get portfolio statistics"""
    try:
        response = requests.get(f"{API_BASE}/stats", timeout=10)
        if response.status_code == 200:
            data = response.json()
            expected_fields = ["total_projects", "featured_projects", "years_experience", "total_skills"]
            if all(field in data for field in expected_fields):
                log_test("Stats Endpoint", True, f"Status: {response.status_code}, Stats: {data}")
                return True
            else:
                log_test("Stats Endpoint", False, f"Missing expected fields in stats: {data}")
        else:
            log_test("Stats Endpoint", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("Stats Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_contact_form():
    """Test POST /api/contact - Submit contact form"""
    try:
        # Sample contact form data
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "Hi Jitmohan, I'm interested in discussing a potential project collaboration. Your backend development experience looks impressive!"
        }
        
        response = requests.post(
            f"{API_BASE}/contact", 
            json=contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "id" in data and data.get("name") == contact_data["name"]:
                log_test("Contact Form Endpoint", True, f"Status: {response.status_code}, Message ID: {data.get('id', 'N/A')}")
                return True
            else:
                log_test("Contact Form Endpoint", False, f"Unexpected response format: {data}")
        else:
            log_test("Contact Form Endpoint", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("Contact Form Endpoint", False, f"Connection error: {str(e)}")
    return False

def test_cors():
    """Test CORS configuration"""
    try:
        response = requests.options(f"{API_BASE}/", timeout=10)
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
        }
        
        if cors_headers['Access-Control-Allow-Origin']:
            log_test("CORS Configuration", True, f"CORS headers present: {cors_headers}")
            return True
        else:
            log_test("CORS Configuration", False, "CORS headers missing")
    except Exception as e:
        log_test("CORS Configuration", False, f"Connection error: {str(e)}")
    return False

def run_all_tests():
    """Run all backend API tests"""
    print("=" * 60)
    print("🚀 BACKEND API TESTING - JITMOHAN RAJ PORTFOLIO")
    print("=" * 60)
    print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🔗 Backend URL: {API_BASE}")
    print("-" * 60)
    
    # Run all tests
    test_hello_world()
    test_personal_info()
    test_projects()
    test_featured_projects()
    test_experience()
    test_skills()
    test_stats()
    test_contact_form()
    test_cors()
    
    # Print summary
    print("-" * 60)
    print("📊 TEST SUMMARY")
    print("-" * 60)
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    print(f"📈 Success Rate: {(test_results['passed'] / (test_results['passed'] + test_results['failed']) * 100):.1f}%")
    
    if test_results['errors']:
        print("\n🔍 FAILED TESTS:")
        for error in test_results['errors']:
            print(f"   • {error}")
    
    print("=" * 60)
    
    # Return overall success
    return test_results['failed'] == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)