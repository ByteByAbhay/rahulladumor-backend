// Custom JavaScript for Swagger UI to auto-set JWT tokens after login

(function() {
    'use strict';

    // Wait for Swagger UI to be fully loaded
    function waitForSwaggerUI(callback) {
        if (window.ui && window.ui.authActions) {
            callback();
        } else {
            setTimeout(() => waitForSwaggerUI(callback), 100);
        }
    }

    // Function to extract JWT token from login response
    function extractTokenFromResponse(responseBody) {
        try {
            const response = JSON.parse(responseBody);
            if (response && response.data && response.data.token) {
                return response.data.token;
            }
        } catch (e) {
            console.error('Error parsing login response:', e);
        }
        return null;
    }

    // Function to automatically set the Bearer token in Swagger UI
    function setSwaggerAuth(token) {
        if (window.ui && window.ui.authActions) {
            try {
                // Set the authorization header
                window.ui.authActions.authorize({
                    bearerAuth: {
                        name: 'bearerAuth',
                        schema: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT'
                        },
                        value: token
                    }
                });

                // Show success message
                showNotification('🎉 JWT Token automatically set! You can now access protected endpoints.', 'success');
                
                // Store token in localStorage for persistence
                localStorage.setItem('swagger_jwt_token', token);
                
                console.log('JWT token automatically set in Swagger UI');
            } catch (error) {
                console.error('Error setting JWT token:', error);
                showNotification('❌ Error setting JWT token automatically', 'error');
            }
        }
    }

    // Function to show notifications in Swagger UI
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#28a745';
                break;
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            case 'warning':
                notification.style.backgroundColor = '#ffc107';
                notification.style.color = '#212529';
                break;
            default:
                notification.style.backgroundColor = '#17a2b8';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Function to intercept and monitor API responses
    function interceptSwaggerResponses() {
        // Override the original fetch function
        const originalFetch = window.fetch;
        
        window.fetch = function(...args) {
            const [url, options] = args;
            
            return originalFetch.apply(this, args).then(response => {
                // Check if this is a login request
                if (url.includes('/api/auth/login') && response.ok) {
                    // Clone the response to read it without consuming the original
                    const clonedResponse = response.clone();
                    
                    clonedResponse.text().then(responseText => {
                        const token = extractTokenFromResponse(responseText);
                        if (token) {
                            // Small delay to ensure Swagger UI has processed the response
                            setTimeout(() => {
                                setSwaggerAuth(token);
                            }, 500);
                        }
                    }).catch(error => {
                        console.error('Error processing login response:', error);
                    });
                }
                
                return response;
            });
        };
    }

    // Function to restore token from localStorage on page load
    function restoreTokenFromStorage() {
        const storedToken = localStorage.getItem('swagger_jwt_token');
        if (storedToken) {
            setTimeout(() => {
                setSwaggerAuth(storedToken);
                showNotification('🔄 JWT Token restored from previous session', 'info');
            }, 1000);
        }
    }

    // Function to add custom UI elements
    function addCustomUI() {
        // Wait for the Swagger UI container to be available
        const checkForContainer = setInterval(() => {
            const container = document.querySelector('.swagger-ui .information-container');
            if (container) {
                clearInterval(checkForContainer);
                
                // Add custom auth status indicator
                const authStatus = document.createElement('div');
                authStatus.id = 'custom-auth-status';
                authStatus.style.cssText = `
                    background: #f8f9fa;
                    border: 1px solid #dee2e6;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 10px 0;
                    font-size: 14px;
                `;
                authStatus.innerHTML = `
                    <strong>🔐 Authentication Status:</strong> 
                    <span id="auth-status-text">Not authenticated</span>
                    <br>
                    <small>💡 Tip: Use the login endpoint below to automatically set your JWT token!</small>
                `;
                
                container.appendChild(authStatus);
                
                // Update auth status periodically
                setInterval(updateAuthStatus, 2000);
            }
        }, 100);
    }

    // Function to update authentication status display
    function updateAuthStatus() {
        const statusText = document.getElementById('auth-status-text');
        if (statusText) {
            const token = localStorage.getItem('swagger_jwt_token');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const exp = payload.exp;
                    const now = Math.floor(Date.now() / 1000);
                    
                    if (exp && exp > now) {
                        const timeLeft = exp - now;
                        const hours = Math.floor(timeLeft / 3600);
                        const minutes = Math.floor((timeLeft % 3600) / 60);
                        statusText.innerHTML = `<span style="color: #28a745;">✅ Authenticated (expires in ${hours}h ${minutes}m)</span>`;
                    } else {
                        statusText.innerHTML = `<span style="color: #dc3545;">❌ Token expired</span>`;
                        localStorage.removeItem('swagger_jwt_token');
                    }
                } catch (e) {
                    statusText.innerHTML = `<span style="color: #ffc107;">⚠️ Invalid token</span>`;
                }
            } else {
                statusText.innerHTML = `<span style="color: #6c757d;">❌ Not authenticated</span>`;
            }
        }
    }

    // Function to add logout functionality
    function addLogoutButton() {
        const checkForAuthSection = setInterval(() => {
            const authSection = document.querySelector('.swagger-ui .auth-wrapper');
            if (authSection && !document.getElementById('custom-logout-btn')) {
                clearInterval(checkForAuthSection);
                
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'custom-logout-btn';
                logoutBtn.textContent = '🚪 Clear Token';
                logoutBtn.style.cssText = `
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-left: 10px;
                    font-size: 12px;
                `;
                
                logoutBtn.onclick = function() {
                    localStorage.removeItem('swagger_jwt_token');
                    if (window.ui && window.ui.authActions) {
                        window.ui.authActions.logout(['bearerAuth']);
                    }
                    showNotification('🚪 JWT Token cleared successfully', 'info');
                };
                
                authSection.appendChild(logoutBtn);
            }
        }, 500);
    }

    // Initialize everything when the page loads
    function initialize() {
        console.log('🔧 Initializing Swagger JWT Auto-Auth...');
        
        waitForSwaggerUI(() => {
            console.log('✅ Swagger UI loaded, setting up auto-auth...');
            
            // Set up response interception
            interceptSwaggerResponses();
            
            // Restore token from storage
            restoreTokenFromStorage();
            
            // Add custom UI elements
            addCustomUI();
            
            // Add logout button
            addLogoutButton();
            
            console.log('🎉 Swagger JWT Auto-Auth initialized successfully!');
        });
    }

    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
