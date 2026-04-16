#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Application
Tests all endpoints as specified in the review request
"""

import requests
import json
import sys
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "https://fullstack-showcase-103.preview.emergentagent.com/api"
ADMIN_USERNAME = "carlos"
ADMIN_PASSWORD = "CarlosAdmin2025!"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.jwt_token = None
        self.test_results = []
        self.created_project_id = None
        self.created_message_id = None
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "response": response_data
        })
    
    def test_get_projects(self):
        """Test GET /api/projects - Should return array of 6 projects"""
        try:
            response = self.session.get(f"{self.base_url}/projects")
            
            if response.status_code != 200:
                self.log_test("GET /api/projects", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            projects = response.json()
            
            # Check if it's an array
            if not isinstance(projects, list):
                self.log_test("GET /api/projects", False, 
                            "Response is not an array", projects)
                return False
            
            # Check if we have 6 projects
            if len(projects) != 6:
                self.log_test("GET /api/projects", False, 
                            f"Expected 6 projects, got {len(projects)}", projects)
                return False
            
            # Check required fields in first project
            required_fields = ['id', 'title', 'description', 'image', 'category', 'liveUrl', 'githubUrl', 'created_at']
            first_project = projects[0]
            missing_fields = [field for field in required_fields if field not in first_project]
            
            if missing_fields:
                self.log_test("GET /api/projects", False, 
                            f"Missing fields: {missing_fields}", first_project)
                return False
            
            self.log_test("GET /api/projects", True, 
                        f"Successfully returned {len(projects)} projects with all required fields")
            return True
            
        except Exception as e:
            self.log_test("GET /api/projects", False, f"Exception: {str(e)}")
            return False
    
    def test_post_contact(self):
        """Test POST /api/contact - Send contact message"""
        try:
            contact_data = {
                "name": "Test User",
                "email": "test@test.com", 
                "message": "Hola esto es una prueba"
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=contact_data)
            
            if response.status_code != 200:
                self.log_test("POST /api/contact", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            result = response.json()
            
            # Check response format
            if not isinstance(result, dict) or "success" not in result or "message" not in result:
                self.log_test("POST /api/contact", False, 
                            "Response missing 'success' or 'message' fields", result)
                return False
            
            if result["success"] != True:
                self.log_test("POST /api/contact", False, 
                            "Success field is not True", result)
                return False
            
            self.log_test("POST /api/contact", True, 
                        f"Contact message sent successfully: {result['message']}")
            return True
            
        except Exception as e:
            self.log_test("POST /api/contact", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_login(self):
        """Test POST /api/admin/login - Admin authentication"""
        try:
            login_data = {
                "username": ADMIN_USERNAME,
                "password": ADMIN_PASSWORD
            }
            
            response = self.session.post(f"{self.base_url}/admin/login", json=login_data)
            
            if response.status_code != 200:
                self.log_test("POST /api/admin/login", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            result = response.json()
            
            # Check response format
            if not isinstance(result, dict) or "token" not in result or "username" not in result:
                self.log_test("POST /api/admin/login", False, 
                            "Response missing 'token' or 'username' fields", result)
                return False
            
            if result["username"] != ADMIN_USERNAME:
                self.log_test("POST /api/admin/login", False, 
                            f"Expected username '{ADMIN_USERNAME}', got '{result['username']}'", result)
                return False
            
            # Store JWT token for subsequent tests
            self.jwt_token = result["token"]
            
            self.log_test("POST /api/admin/login", True, 
                        f"Admin login successful, token received")
            return True
            
        except Exception as e:
            self.log_test("POST /api/admin/login", False, f"Exception: {str(e)}")
            return False
    
    def test_admin_verify(self):
        """Test GET /api/admin/verify - Verify JWT token"""
        if not self.jwt_token:
            self.log_test("GET /api/admin/verify", False, "No JWT token available from login")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.jwt_token}"}
            response = self.session.get(f"{self.base_url}/admin/verify", headers=headers)
            
            if response.status_code != 200:
                self.log_test("GET /api/admin/verify", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            result = response.json()
            
            # Check response format
            if not isinstance(result, dict) or "valid" not in result or "username" not in result:
                self.log_test("GET /api/admin/verify", False, 
                            "Response missing 'valid' or 'username' fields", result)
                return False
            
            if result["valid"] != True:
                self.log_test("GET /api/admin/verify", False, 
                            "Token validation failed", result)
                return False
            
            if result["username"] != ADMIN_USERNAME:
                self.log_test("GET /api/admin/verify", False, 
                            f"Expected username '{ADMIN_USERNAME}', got '{result['username']}'", result)
                return False
            
            self.log_test("GET /api/admin/verify", True, 
                        "JWT token verification successful")
            return True
            
        except Exception as e:
            self.log_test("GET /api/admin/verify", False, f"Exception: {str(e)}")
            return False
    
    def test_get_admin_messages(self):
        """Test GET /api/admin/messages - Get contact messages"""
        if not self.jwt_token:
            self.log_test("GET /api/admin/messages", False, "No JWT token available")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.jwt_token}"}
            response = self.session.get(f"{self.base_url}/admin/messages", headers=headers)
            
            if response.status_code != 200:
                self.log_test("GET /api/admin/messages", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            messages = response.json()
            
            # Check if it's an array
            if not isinstance(messages, list):
                self.log_test("GET /api/admin/messages", False, 
                            "Response is not an array", messages)
                return False
            
            # Look for our test message
            test_message_found = False
            for message in messages:
                if (message.get("name") == "Test User" and 
                    message.get("email") == "test@test.com" and 
                    message.get("message") == "Hola esto es una prueba"):
                    test_message_found = True
                    self.created_message_id = message.get("id")
                    break
            
            if not test_message_found:
                self.log_test("GET /api/admin/messages", False, 
                            "Test contact message not found in admin messages", messages)
                return False
            
            self.log_test("GET /api/admin/messages", True, 
                        f"Successfully retrieved {len(messages)} messages, including our test message")
            return True
            
        except Exception as e:
            self.log_test("GET /api/admin/messages", False, f"Exception: {str(e)}")
            return False
    
    def test_create_admin_project(self):
        """Test POST /api/admin/projects - Create new project"""
        if not self.jwt_token:
            self.log_test("POST /api/admin/projects", False, "No JWT token available")
            return False
        
        try:
            project_data = {
                "title": "Test Project",
                "description": "Test desc",
                "image": "",
                "category": "Backend"
            }
            
            headers = {"Authorization": f"Bearer {self.jwt_token}"}
            response = self.session.post(f"{self.base_url}/admin/projects", 
                                       json=project_data, headers=headers)
            
            if response.status_code != 200:
                self.log_test("POST /api/admin/projects", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            result = response.json()
            
            # Check if project was created with correct data
            if not isinstance(result, dict) or "id" not in result:
                self.log_test("POST /api/admin/projects", False, 
                            "Response missing 'id' field", result)
                return False
            
            # Verify the created project data
            for key, value in project_data.items():
                if result.get(key) != value:
                    self.log_test("POST /api/admin/projects", False, 
                                f"Field '{key}' mismatch: expected '{value}', got '{result.get(key)}'", result)
                    return False
            
            # Store project ID for deletion test
            self.created_project_id = result["id"]
            
            self.log_test("POST /api/admin/projects", True, 
                        f"Project created successfully with ID: {self.created_project_id}")
            return True
            
        except Exception as e:
            self.log_test("POST /api/admin/projects", False, f"Exception: {str(e)}")
            return False
    
    def test_delete_admin_project(self):
        """Test DELETE /api/admin/projects/{id} - Delete project"""
        if not self.jwt_token:
            self.log_test("DELETE /api/admin/projects/{id}", False, "No JWT token available")
            return False
        
        if not self.created_project_id:
            self.log_test("DELETE /api/admin/projects/{id}", False, "No project ID available from creation test")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.jwt_token}"}
            response = self.session.delete(f"{self.base_url}/admin/projects/{self.created_project_id}", 
                                         headers=headers)
            
            if response.status_code != 200:
                self.log_test("DELETE /api/admin/projects/{id}", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            result = response.json()
            
            # Check response format
            if not isinstance(result, dict) or result.get("success") != True:
                self.log_test("DELETE /api/admin/projects/{id}", False, 
                            "Response missing 'success: true'", result)
                return False
            
            self.log_test("DELETE /api/admin/projects/{id}", True, 
                        f"Project {self.created_project_id} deleted successfully")
            return True
            
        except Exception as e:
            self.log_test("DELETE /api/admin/projects/{id}", False, f"Exception: {str(e)}")
            return False
    
    def test_delete_admin_message(self):
        """Test DELETE /api/admin/messages/{id} - Delete message"""
        if not self.jwt_token:
            self.log_test("DELETE /api/admin/messages/{id}", False, "No JWT token available")
            return False
        
        if not self.created_message_id:
            self.log_test("DELETE /api/admin/messages/{id}", False, "No message ID available from messages test")
            return False
        
        try:
            headers = {"Authorization": f"Bearer {self.jwt_token}"}
            response = self.session.delete(f"{self.base_url}/admin/messages/{self.created_message_id}", 
                                         headers=headers)
            
            if response.status_code != 200:
                self.log_test("DELETE /api/admin/messages/{id}", False, 
                            f"Expected status 200, got {response.status_code}", response.text)
                return False
            
            result = response.json()
            
            # Check response format
            if not isinstance(result, dict) or result.get("success") != True:
                self.log_test("DELETE /api/admin/messages/{id}", False, 
                            "Response missing 'success: true'", result)
                return False
            
            self.log_test("DELETE /api/admin/messages/{id}", True, 
                        f"Message {self.created_message_id} deleted successfully")
            return True
            
        except Exception as e:
            self.log_test("DELETE /api/admin/messages/{id}", False, f"Exception: {str(e)}")
            return False
    
    def test_unauthorized_access(self):
        """Test that endpoints without valid token return 401/403"""
        try:
            unauthorized_tests_passed = 0
            total_unauthorized_tests = 0
            
            # Test GET admin endpoints without token
            get_endpoints = [
                "/admin/verify",
                "/admin/messages"
            ]
            
            for endpoint in get_endpoints:
                response = self.session.get(f"{self.base_url}{endpoint}")
                total_unauthorized_tests += 1
                if response.status_code in [401, 403]:
                    unauthorized_tests_passed += 1
                    print(f"✅ GET {endpoint} correctly returned {response.status_code} without token")
                else:
                    print(f"❌ GET {endpoint} returned {response.status_code} instead of 401/403")
            
            # Test POST admin endpoints without token
            post_endpoints = [
                "/admin/projects"
            ]
            
            for endpoint in post_endpoints:
                response = self.session.post(f"{self.base_url}{endpoint}", json={})
                total_unauthorized_tests += 1
                if response.status_code in [401, 403]:
                    unauthorized_tests_passed += 1
                    print(f"✅ POST {endpoint} correctly returned {response.status_code} without token")
                else:
                    print(f"❌ POST {endpoint} returned {response.status_code} instead of 401/403")
            
            # Test with invalid token
            invalid_headers = {"Authorization": "Bearer invalid-token"}
            response = self.session.get(f"{self.base_url}/admin/verify", headers=invalid_headers)
            total_unauthorized_tests += 1
            if response.status_code in [401, 403]:
                unauthorized_tests_passed += 1
                print(f"✅ /admin/verify correctly returned {response.status_code} with invalid token")
            else:
                print(f"❌ /admin/verify returned {response.status_code} with invalid token instead of 401/403")
            
            success = unauthorized_tests_passed == total_unauthorized_tests
            self.log_test("Unauthorized Access Tests", success, 
                        f"{unauthorized_tests_passed}/{total_unauthorized_tests} unauthorized tests passed")
            return success
            
        except Exception as e:
            self.log_test("Unauthorized Access Tests", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Portfolio Backend API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test sequence as specified in review request
        tests = [
            self.test_get_projects,
            self.test_post_contact,
            self.test_admin_login,
            self.test_admin_verify,
            self.test_get_admin_messages,
            self.test_create_admin_project,
            self.test_delete_admin_project,
            self.test_delete_admin_message,
            self.test_unauthorized_access
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
        
        print("=" * 60)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

def main():
    """Main test execution"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()